from marshmallow import fields, Schema
from . import db

class NotoriousMonsterModel(db.Model):
    __tablename__ = 'notoriousmonster'

    id = db.Column(db.Integer, primary_key=True)
    bnpcbase = db.Column(db.Text)
    rank = db.Column(db.SMALLINT)
    bnpcname = db.Column(db.Text)
    unk3 = db.Column(db.SMALLINT)

    def __init__(self,data):
        self.bnpcbase = data.get(bnpcbase)
        self.rank = data.get(rank)
        self.bnpcname = data.get(bnpcname)
        self.unk3 = data.get(unk3)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, data):
        for key, item in data.items():
            setattr(self, key, item)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def get_limit(n):
        return NotoriousMonsterModel.query.limit(n).all()

    def get_one(id):
        return NotoriousMonsterModel.query.get(id)

    def __repr(self):
        return '<id {}>'.format(self.id)


class NotoriousMonsterSchema(Schema):
    id = fields.Int(dump_only=True)
    bnpcbase = fields.Str(required=True)
    rank = fields.Int(required=True)
    bnpcname = fields.Str(required=True)
    unk3 = fields.Int(required=True)
