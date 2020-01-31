from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt


db = SQLAlchemy()
bcrypt = Bcrypt()


from.NotoriousMonsterModel import NotoriousMonsterModel, NotoriousMonsterSchema
from .ActionModel import ActionModel, ActionSchema
from .ActionTransientModel import ActionTransientModel
from .ItemModel import ItemModel, ItemSchema
from .RecipeModel import RecipeModel, RecipeSchema
from .RecipeLookupModel import RecipeLookupModel
