from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt


db = SQLAlchemy()
bcrypt = Bcrypt()


from.NotoriousMonsterModel import NotoriousMonsterModel, NotoriousMonsterSchema
