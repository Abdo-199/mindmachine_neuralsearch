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

def get_model_answer(question, ans):
    # Dump model just for testing
    return ans

def test_language_model(dataset):
    results = {}

    for language in dataset:
        results[language] = {}
        for category in dataset[language]:
            correct_count = 0
            total_questions = 0

            for pdf in dataset[language][category]:
                for qa in dataset[language][category][pdf]:
                    model_answer = get_model_answer(qa['Question'], qa['Answer'])
                    if is_correct_answer(model_answer, qa['Answer']):
                        correct_count += 1
                    total_questions += 1

            if total_questions > 0:
                accuracy = correct_count / total_questions
                results[language][category] = {
                    'accuracy': accuracy,
                    'total_questions': total_questions,
                    'correct_answers': correct_count
                }
            else:
                results[language][category] = {
                    'accuracy': None,
                    'total_questions': 0,
                    'correct_answers': 0
                }

    return results

def display_acc_per_lang(test_results, language):
# Plotting accuracy per category for a given language
    categories = list(test_results[language].keys())
    accuracies = [test_results[language][category]['accuracy'] for category in categories]

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
