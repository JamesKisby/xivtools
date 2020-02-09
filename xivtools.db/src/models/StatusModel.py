from marshmallow import fields, Schem
from . import db


class StatusModel(db.Model):
    __tablename__ = 'status'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    description = db.Column(db.Text)
    icon = db.Column(db.Text)
    maxstacks = db.Column(db.SMALLINT)
    unk4 = db.Column(db.SMALLINT)
    category = db.Column(db.SMALLINT)
    hiteffect = db.Column(db.Text)
    vfx = db.Column(db.Text)
    lockmovement = db.Column(db.Boolean)
    unk9 = db.Column(db.Boolean)
    lockactions = db.Column(db.Boolean)
    lockcontrol = db.Column(db.Boolean)
    transfiguration = db.Column(db.Boolean)
    unk13 = db.Column(db.Boolean)
    candispel = db.Column(db.Boolean)
    inflictedbyactor = db.Column(db.Boolean)
    ispermanent = db.Column(db.Boolean)
    partylistpriority = db.Column(db.SMALLINT)
    unk18 = db.Column(db.Boolean)
    unk19 = db.Column(db.Boolean)
    unk20 = db.Column(db.SMALLINT)
    unk21 = db.Column(db.SMALLINT)
    unk22 = db.Column(db.Boolean)
    log = db.Column(db.SMALLINT)
    isfcbuff = db.Column(db.Boolean)
    invisibility = db.Column(db.Boolean)
    unk26 = db.Column(db.SMALLINT)
    unk27 = db.Column(db.SMALLINT)
    unk28 = db.Column(db.Boolean)


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
        return db.session.query(
            StatusModel.name,
            StatusModel.icon,
            StatusModel.id,
            StatusModel.description
        ).limit(n)

    def get_one(id):
        return db.session.query(StatusModel.id,
            StatusModel.name,
            StatusModel.icon,
            StatusModel.id,
            StatusModel.description
        ).filter(StatusModel.id == id)



    def __repr__(self):
        return '<id {}>'.format(self.id)


class StatusSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    description = fields.Str(required=True)
    icon = fields.Str(required=True)
    maxstacks = fields.Int(required=True)
    unk4 = fields.Int(required=True)
    category = fields.Int(required=True)
    hiteffect = fields.Str(required=True)
    vfx = fields.Str(required=True)
    lockmovement = fields.Boolean(required=True)
    unk9 = fields.Boolean(required=True)
    lockactions = fields.Boolean(required=True)
    lockcontrol = fields.Boolean(required=True)
    transfiguration = fields.Boolean(required=True)
    unk13 = fields.Boolean(required=True)
    candispel = fields.Boolean(required=True)
    inflictedbyactor = fields.Boolean(required=True)
    ispermanent = fields.Boolean(required=True)
    partylistpriority = fields.Int(required=True)
    unk18 = fields.Boolean(required=True)
    unk19 = fields.Boolean(required=True)
    unk20 = fields.Int(required=True)
    unk21 = fields.Int(required=True)
    unk22 = fields.Boolean(required=True)
    log = fields.Int(required=True)
    isfcbuff = fields.Boolean(required=True)
    invisibility = fields.Boolean(required=True)
    unk26 = fields.Int(required=True)
    unk27 = fields.Int(required=True)
    unk28 = fields.Boolean(required=True)
