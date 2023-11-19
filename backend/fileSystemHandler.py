import os
import config

class FileSystemHandler:
    
    def __init__(self):
        self.root_directory = config.root_directory
        self.file_extension = config.file_extension

    def upload(self, user_id, files):
        print("ABC")
        self.file_system_exist(user_id=user_id)

        for file in files:
            file_path = os.path.join(self.root_directory + user_id, file.filename)
            with open(file_path, "wb") as f:
                f.write(file.file.read())

    def get_fs_for_user(self, user_id):

        file_name_size = []
        self.file_system_exist(user_id=user_id)

        # Only search for files with a certain extension, see file_extension in config.py
        files = [file for file in os.listdir(self.root_directory + user_id) if file.endswith(self.file_extension)]

        for file_name in files:

            file_path = os.path.join(self.root_directory + user_id, file_name)
            file_size = os.path.getsize(file_path)

            # Convert Bytes to Megabytes
            file_size = file_size / 1024.0 / 1024.0

            # Frontend Format
            file_name_size.append({'file_name':file_name,'file_size':file_size, 'file_date': 0})
        
        return file_name_size
                
        
    def save_document(self, user_id):
        pass

    def delete_document(self, user_id, document_id):
         # Check if the current file exists
        if os.path.exists(self.root_directory + user_id + "/" + document_id):
             # Remove the file
            os.remove(self.root_directory + user_id + "/" + document_id)
            

    def edit_document_name(self, user_id, old_name, new_name):
    
        old_file_full_path = self.root_directory + user_id + "/" + old_name
        new_file_full_path = self.root_directory + user_id + "/" + new_name

        # Check if the current file exists
        if os.path.exists(old_file_full_path):
            # Rename the file
            os.rename(old_file_full_path, new_file_full_path)

    def get_document(self, document_id):
        pass

    def file_system_exist(self, user_id):
        if os.path.exists(self.root_directory + user_id):
            pass
        else:
            os.makedirs(self.root_directory + user_id)  

              