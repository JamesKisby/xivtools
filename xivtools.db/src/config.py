# /src/config.py

import os


class Development(object):
     """
     Dev env config
     """
     DEBUG = True
     TESTING = False
     JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
     SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')


class Production(object):
    """
    Prod env config
    """
    DEBUG = False
    TESTING = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URL')


app_config = {
'development': Development,
'production': Production
}
