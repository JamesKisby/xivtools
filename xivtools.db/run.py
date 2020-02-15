import os
from src.app import create_app


env_name = os.getenv('FLASK_ENV')
app = create_app(env_name)
os.environ['DEBUG'] = '1'
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
if __name__ == '__main__':
    app.run(host='0.0.0.0')
