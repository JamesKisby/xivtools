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
     SECRET_KEY = os.environ['DISCORD.CLIENT_SECRET']
     OAUTHLIB_INSECURE_TRANSPORT = True


class Production(object):
    """
    Prod env config
    """
    DEBUG = False
    TESTING = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URL')
    OAUTHLIB_INSECURE_TRANSPORT = False

app_config = {
'development': Development,
'production': Production
}
