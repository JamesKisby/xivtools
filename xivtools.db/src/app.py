from flask import Flask
from flask_cors import CORS
from .config import app_config
from .models import db, bcrypt
from .views.ItemView import updateCraft, item_api as item_blueprint
from .views.ActionView import action_api as action_blueprint
from .views.NotoriousMonsterView import monster_api as monster_blueprint
from .views.RaidDropsView import raid_api as raid_blueprint


def create_app(env_name):
    app = Flask(__name__)

    cors = CORS(app)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config.from_object(app_config[env_name])
    bcrypt.init_app(app)
    db.init_app(app)

    app.register_blueprint(monster_blueprint, url_prefix='/api/v1/monsters')
    app.register_blueprint(action_blueprint, url_prefix='/api/v1/actions')
    app.register_blueprint(item_blueprint, url_prefix='/api/v1/items')
    app.register_blueprint(raid_blueprint, url_prefix='/api/v1/raid')

    @app.route('/',methods=['GET'])
    def index():
        updateCraft()
        return 'Endpoint is working'

    return app
