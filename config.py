import os

class Config:
    DB_USER = 'eshpuff'
    DB_PASSWORD = 'senhasegura123'
    DB_HOST = 'localhost'
    DB_PORT = '5432'
    DB_NAME = 'gameshelf2'

    SQLALCHEMY_DATABASE_URI = f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    RAWG_API_KEY = '8814f270d05644a0940ed48aac8f3679' 
