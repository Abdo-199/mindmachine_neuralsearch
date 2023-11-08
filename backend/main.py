from qdrant import QDrant
from api import API

db = QDrant()

api = API(db)
app = api.app

def main():
    pass
    
    

if __name__ == '__main__':
    # start uvicorn server to host the FastAPI app
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
    main()