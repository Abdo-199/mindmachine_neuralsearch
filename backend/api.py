from fastapi import FastAPI, APIRouter
from fileSystemHandler import FileSystemHandler
from statisticsHandler import StatisticsHandler

from typing import Union

class API:

    def __init__(self, dataBase) -> None:
        self.app = FastAPI()
        self.db = dataBase
        self.router = APIRouter()
        self.stats = StatisticsHandler(self.db)
        self.fs = FileSystemHandler("/")

        self.setup_routes()

    def setup_routes(self):
        # @self.router.get("/")
        # async def read_root():
        #     return {"Hello": "World"}

        # @self.router.get("/items/{item_id}")
        # async def read_item(item_id: int, q: Union[str, None] = None):
        #     return {"item_id": item_id, "q": q}

        self.app.include_router(self.router)

        #validate HTW Credentials
        @self.router.get("login/{username}/{password}")
        async def validate_credentials(username, password):
            return True
        
        #search
        @self.router.get("/search/{query}")
        async def search(query):
            return True
        
        #upload document for user id
        @self.router.post("/upload/{user_id}")
        async def upload_document(user_id):
            return True

        #get document
        @self.router.get("/document/{document_id}")
        async def get_document(document_id):
            return True

        #delete document
        @self.router.delete("/document/{document_id}")
        async def delete_document(document_id):
            return True
        
        #send file structure
        @self.router.get("/filestructure/{user_id}")
        async def get_file_structure(user_id):
            return True
        
        #edit document name
        @self.router.put("/document/{document_id}")
        async def edit_document_name(document_id):
            return True
        

        #get used disk space
        @self.router.get("/diskusage")
        async def get_disk_usage():
            return True
        
        #change disk space limit
        @self.router.put("/diskusage")
        async def change_disk_usage():
            return True
        
        # get statistics
        @self.router.get("/statistics")
        async def get_statistics():
            return True
        
        # get and set auto-logout time
        @self.router.get("/autologout")
        async def get_auto_logout():
            return True
        
        @self.router.put("/autologout")
        async def set_auto_logout():
            return True
        
        #get search history of user
        @self.router.get("/searchhistory/{user_id}")
        async def get_search_history(user_id):
            return True

        

