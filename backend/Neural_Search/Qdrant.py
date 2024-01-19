"""
Qdrant Class

Author: Abdelrahman Elsharkawi
Creation Date: 11.11.2023
"""
from qdrant_client import QdrantClient, models
from qdrant_client.http.models import Filter, FieldCondition, MatchValue
from sentence_transformers import SentenceTransformer
import sys
sys.path.append("../")
from fileSystemHandler import FileSystemHandler
import os
import config

class Qdrant:

  """
  Qdrant class for interacting with Qdrant search engine.

  Attributes:
  - encoder (SentenceTransformer): Sentence embeddings encoder.
  - qdrant_client (QdrantClient): Client for qdrant interactions.
  """
  def __init__(self, encoder = SentenceTransformer("all-MiniLM-L6-v2"),
               qdrant_client = QdrantClient(host=config.qdrant_host, port=config.qdrant_port),
               distance=models.Distance.DOT):
    """
    Initialize the Qdrant class.

    Parameters:
    - encoder (SentenceTransformer): Sentence embeddings encoder (default is "all-MiniLM-L6-v2").
    - qdrant_client (QdrantClient): Client for qdrant interactions (default is the configuration in the config.py).

    Returns:
    None
    """
    self.encoder = encoder
    self.qdrant_client = qdrant_client
    self.distance = distance

  def check_user(self, userName):
    """
    Check if a collection exists with the given user name, and create one if doesn't exist.

    Parameters:
    - userName (str): Name of the user.

    Returns:
    int: Number of vectors for the user.
    """
    try:
      vectors_count = self.qdrant_client.get_collection(userName).vectors_count
      print(f"user: {userName} exists, and has {vectors_count} vectors")
    except:
      print(f"user doesn't exist, creating a new collection with the user name: {userName}")
      self.qdrant_client.create_collection(
        collection_name=userName,
        vectors_config=models.VectorParams(
            size=self.encoder.get_sentence_embedding_dimension(),
            distance=self.distance,
        ),
      )
      vectors_count = 0
    return vectors_count

  def add_docVec(self, userName, docVec):
    """
    Add docVec to the Qdrant collection.

    Parameters:
    - userName (str): Name of the user.
    - docVec: Document vectors object containing vectors for the document and paragraphs.

    Returns:
    None
    """
    vectors_count = self.check_user(userName)

    for para in docVec.paras_vecs:
      self.qdrant_client.upload_records(
      collection_name=userName,
      records=[
          models.Record(id=vectors_count, vector=para['vec'], payload={"doc_name":docVec.name, "passage":para['paragraph']})
      ])
      vectors_count = vectors_count + 1


  def get_hits(self, collection_name, search_text):
    """
    Get search hits from the Qdrant collection.

    Parameters:
    - collection_name (str): Name of the Qdrant collection.
    - search_text (str): Text to search for.
    - filter: Search filter (filter the payloads of the vectors).

    Returns:
    list: List of search hits.
    """
    return self.qdrant_client.search(
      collection_name= collection_name,
      query_vector= self.encoder.encode(search_text).tolist(),
      limit=8,
    )

  def get_scores(self, hits):
    """
    Get scores from search hits.

    Parameters:
    - hits (list): List of search hits.

    Returns:
    str: Name of the vector with the highest score.
    """
    max_score_value = -1
    max_score_value_indoc = None
    score_values_indoc = []
    for hit in hits:
        # print(hit.payload, "score:", hit.score)
        score_values_indoc.append(hit.payload)
        if hit.score > max_score_value:
            max_score_value = hit.score
            max_score_value_indoc = hit.payload
    # print(max_score_value)
    if max_score_value_indoc is not None:
        # print("The Vector with the highst score:", max_score_value_indoc["name"])
        return score_values_indoc
    else:
        # print("No vector")
        return "none"

  def search(self, collection_name, search_text):
    """
    Perform a search in the Qdrant collection.

    Parameters:
    - collection_name (str): Name of the Qdrant collection.
    - search_text (str): Text to search for.

    Returns:
    a list of the most relevant 4 docs. And the most 4 relevant paragraphs by the most relevant doc.
    dict: {"relevant_docs": relevant_doc, "relevant_paragraph": relevant_para}.
    """

    docs_hits = self.get_hits(collection_name, search_text)
    relevant_pasages = self.get_scores(docs_hits)


    # paras_filter = Filter(must=[FieldCondition(key="source_doc", match=MatchValue(value=relevant_docs[0]))])
    # paras_hits = self.get_hits(collection_name, search_text, paras_filter)
    # relevant_para = self.get_scores(paras_hits)
    return relevant_pasages[:4]
  
  def delete_doc(self, collection_name, doc_name):
    self.qdrant_client.delete(
    collection_name=collection_name,
    points_selector=models.Filter(
      should=[
          models.FieldCondition(
              key="name",
              match=models.MatchValue(value=doc_name),
          ),
          models.FieldCondition(
              key="source_doc",
              match=models.MatchValue(value=doc_name),
          ),
      ],
    ),
    )

  def revectorize_all(self):
    fileHandler = FileSystemHandler(self)
    all_users = [d for d in os.listdir(config.document_directory) if os.path.isdir(os.path.join(config.document_directory, d))]
    for user in all_users:
        print(f"deleting {user}")
        self.qdrant_client.delete_collection(user)
        files = fileHandler.get_fs_for_user(user)
        for file in files:
            print(os.path.join(config.document_directory, user, file['file_name']))
            file_path = os.path.join(config.document_directory, user, file['file_name'])
            try:
              fileHandler.encode_and_upload(file_path, user)
            except:
               print(f"no text recognized in {file_path}")