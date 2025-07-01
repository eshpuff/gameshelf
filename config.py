import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///gameshelf.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False