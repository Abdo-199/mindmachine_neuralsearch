from pydantic import BaseModel

class LoginModel(BaseModel):
    username: str
    password: str

class RenameFileModel(BaseModel):
    old_name: str
    new_name: str