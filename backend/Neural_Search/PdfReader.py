"""
PDF Helper Functions

Author: Abdelrahman Elsharkawi
Creation Date: 11.11.2023
"""
import PyPDF2
import sys
import re
import os
sys.path.append('../')
from DocVec import DocVec
from nltk.corpus import stopwords

def remove_stopwords_full(text):
    words = text.split(' ')

    english_stopwords = set(stopwords.words('english'))
    german_stopwords = set(stopwords.words('german'))

    filtered_words = [word.lower() for word in words if word.lower() not in (english_stopwords | german_stopwords)]

    filtered_text = ' '.join(filtered_words)

    return filtered_text

def exclude_special_characters(input_string):
    """
    Exclude all chars except numbers and letters from the input string.

    Parameters:
    - input_string (str): Input string.

    Returns:
    str: String with special characters removed.
    """
    result = re.sub(r'[^\w\s]', ' ', input_string.replace('\n', ' '))
    result = remove_stopwords_full(result)
    return result
 
def split_string_to_chunks(input_string, chunk_length, overlap):
    words = input_string.split()
    chunks = []

    while words:
        chunk = ' '.join(words[:chunk_length])
        chunks.append(chunk)
        words = words[chunk_length - overlap:]

    return chunks

def pdf_to_text(path, chunk_length, remove_stop_words, overlap):
  """
  Convert PDF file to plain text.

  Parameters:
  - path (str): Path to the PDF file.

  Returns:
  dict: {'text':extracted_text, 'paragraphs':paragraphs}.
  """
  pdffileobj=open(path,'rb')
  pdfreader=PyPDF2.PdfReader(pdffileobj)
  extracted_text = ""
  paragraphs = []

  for page in pdfreader.pages:
    extracted_text += page.extract_text()

  if remove_stop_words:
     extracted_text = exclude_special_characters(extracted_text)

  paragraphs = split_string_to_chunks(extracted_text, chunk_length, overlap)
  return {'text':extracted_text, 'paragraphs':paragraphs}

def pdf_to_docVec(path, encoder, chunk_length = 0, remove_stop_words=True, overlap = 20):
  """
  Convert PDF file to DocVec object.

  Parameters:
  - path (str): Path to the PDF file.
  - encoder: Sentence embeddings encoder.

  Returns:
  DocVec: DocVec object containing document vectors and paragraph vectors.
  """
  if chunk_length == 0:
    chunk_length = encoder.max_seq_length
  doc = pdf_to_text(path, chunk_length, remove_stop_words, overlap)
  paras_vecs = []
  for idp, para in enumerate(doc['paragraphs']):
    paras_vecs.append({"paragraph":para,"vec":encoder.encode(para).tolist()})

  return DocVec(os.path.basename(path), doc['text'], paras_vecs)