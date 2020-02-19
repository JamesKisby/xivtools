from marshmallow import fields, Schema
from . import db


class RecipeLookupModel(db.Model):
    __tablename__ = 'recipelookup'

    id = db.Column(db.Integer, db.ForeignKey('item.id'), primary_key=True)
    unk0 = db.Column(db.Integer)    #crp
    unk1 = db.Column(db.Integer)    #bsm
    unk2 = db.Column(db.Integer)    #arm
    unk3 = db.Column(db.Integer)    #gsm
    unk4 = db.Column(db.Integer)    #ltw
    unk5 = db.Column(db.Integer)    #wvr
    unk6 = db.Column(db.Integer)    #alc
    unk7 = db.Column(db.Integer)    #cul




    def __init__(self,data):
        self.id = date.get(id)
        self.unk0 = data.get(unk0)
        self.unk1 = data.get(unk1)
        self.unk2 = data.get(unk2)
        self.unk3 = data.get(unk3)
        self.unk4 = data.get(unk4)
        self.unk5 = data.get(unk5)
        self.unk6 = data.get(unk6)
        self.unk7 = data.get(unk7)


    def __repr__(self):
        return '<id {}>'.format(self.id)
