from marshmallow import fields, Schema
from . import db


class ActionTransientModel(db.Model):
    __tablename__ = 'actiontransient'

    id = db.Column(db.Integer, db.ForeignKey('action.id'), primary_key=True)
    description = db.Column(db.Text)

    def __init__(self,data):
        self.id = data.get(id)
        self.description = data.get(description)

    def __repr(self):
        return '<id {}>'.format(self.id)
