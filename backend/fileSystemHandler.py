import os
import config

class FileSystemHandler:
    
    def __init__(self):
        self.root_directory = config.root_directory
        self.file_extension = config.file_extension
        self.user_directory

    def get_fs(self):
        pass

    def get_fs_for_user(self, user_id):

        file_name_size = []

        self.file_system_exist(user_id=user_id)

        # Only search for files with a certain extension, see file_extension in config.py
        files = [file for file in os.listdir(self.user_directory) if file.endswith(self.file_extension)]

        for file_name in files:

            file_path = os.path.join(self.user_directory, file_name)
            file_size = os.path.getsize(file_path)

            # Convert Bytes to Megabytes
            file_size = file_size / 1024.0 / 1024.0

            # Frontend Format
            file_name_size.append({'file_name':file_name,'file_size':file_size})
        
        return file_name_size
                
        
    def save_document(self, user_id):
        pass

    def delete_document(self, document_id):
        pass

    def get_document(self, document_id):
        pass

    def file_system_exist(self, user_id):

        self.user_directory = self.root_directory + user_id

        if os.path.exists(self.user_directory):
            pass
        else:
            os.makedirs(self.user_directory)  

              