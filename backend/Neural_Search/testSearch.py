'''
A script with methods to read the dataset, and compare the search results with the true results
TODO:
- Do we need to put matplotlib and seaborn in requierments.txt
- Add a method to configure experiment parameters
- 
'''

import os
import re
import matplotlib.pyplot as plt
import seaborn as sns
from Qdrant import Qdrant
from PdfReader import pdf_to_docVec

# class test_model:

#     def __init__(self, test_name, dataset, encoder):
#         self.qdClient = Qdrant(encoder)
#         self.test_name = test_name
#         self.dataset = dataset
#         pass

def find_pdf_files(directory):
    pdf_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".pdf"):
                pdf_files.append(os.path.join(root, file))
    return pdf_files

def find_pdf_files(directory):
    pdf_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".pdf"):
                pdf_files.append(os.path.join(root, file))
    return pdf_files

def encode_dataset(name , encoder, path):
    qdClient = Qdrant(encoder)
    pdf_paths = find_pdf_files(path)
    for pdf in pdf_paths:
        qdClient.add_docVec(name, pdf_to_docVec(pdf, encoder))
        print(pdf)

def parse_text_file(file_path):
    with open(file_path, 'r') as file:
        content = file.read()
    
    # Splitting the content into sections for each PDF
    sections = content.split("###")[1:]  # Skip the first split as it will be empty
    parsed_data = {}

    for section in sections:
        # Extracting PDF title
        title_match = re.search(r'PDF \d+: (.+)', section)
        if title_match:
            title = title_match.group(1)
            parsed_data[title] = []

            # Finding all Q&A pairs
            qa_pairs = re.findall(r'\*\*Question:\*\* (.*?)\n   \*\*Answer:\*\* "(.*?)"', section)
            for question, answer in qa_pairs:
                parsed_data[title].append({'Question': question, 'Answer': answer})
    
    return parsed_data


def read_dataset(dataset_path):
    dataset = {}

    for language in os.listdir(dataset_path):
        language_path = os.path.join(dataset_path, language)
        if os.path.isdir(language_path):
            dataset[language] = {}

            for category in os.listdir(language_path):
                category_path = os.path.join(language_path, category)
                if os.path.isdir(category_path):
                    dataset[language][category] = {}

                    for file in os.listdir(category_path):
                        if file.endswith('.txt'):
                            file_path = os.path.join(category_path, file)
                            dataset[language][category] = parse_text_file(file_path)
    
    return dataset

def is_correct_answer(model_answer, actual_answer):
    # TODO: adjust the logic of comparrision to a reasonable one
    return model_answer.strip().lower() == actual_answer.strip().lower()

def get_model_answer(question, name, client):
    return client.search(name, question)


def test_language_model(test_name, dataset_path):
    qdClient = Qdrant()
    dataset = read_dataset(dataset_path)
    results = {}

    for language in dataset:
        results[language] = {}
        for category in dataset[language]:
            correct_count_para = 0
            correct_count_doc = 0
            total_questions = 0

            for pdf in dataset[language][category]:
                for qa in dataset[language][category][pdf]:
                    model_answer = get_model_answer(qa['Question'], test_name, qdClient)
                    # model_answer = get_model_answer(qa['Question'], qa['Answer'])
                    if is_correct_answer(model_answer['relevant_paragraphs'][0], qa['Answer']):
                        correct_count_para += 1
                    if is_correct_answer(model_answer['relevant_docs'][0].split('.')[0], pdf):
                        correct_count_doc += 1
                    total_questions += 1

            if total_questions > 0:
                accuracy_para = correct_count_para / total_questions
                accuracy_doc = correct_count_doc / total_questions
                results[language][category] = {
                    'accuracy_para': accuracy_para,
                    'accuracy_doc': accuracy_doc,
                    'total_questions': total_questions,
                    'correct_answers_para': correct_count_para
                }
            else:
                results[language][category] = {
                    'accuracy_para': None,
                    'accuracy_doc': None,
                    'total_questions': 0,
                    'correct_answers_para': 0
                }

    return results

def display_acc_per_lang(test_results, language, accuracy):
# Plotting accuracy per category for a given language
    categories = list(test_results[language].keys())
    accuracies = [test_results[language][category][accuracy] for category in categories]

    plt.figure(figsize=(10, 6))
    sns.barplot(x=categories, y=accuracies)
    plt.title(f'Accuracy per Category in {language}')
    plt.ylabel('Accuracy')
    plt.xlabel('Category')
    plt.xticks(rotation=45)
    plt.show()

# Example usage
# dataset_path = '..\\Dataset\\PDFS'  
# dataset = read_dataset(dataset_path)
# test_results = test_language_model(dataset)
# display_acc_per_lang(test_results, "German")
