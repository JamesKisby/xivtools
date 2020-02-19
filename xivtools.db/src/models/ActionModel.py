from marshmallow import fields, Schema
from . import db
from .ActionTransientModel import ActionTransientModel

class ActionModel(db.Model):
    __tablename__ = 'action'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    unk1 = db.Column(db.Text)
    icon = db.Column(db.Text)
    actioncategory = db.Column(db.Text)
    unk4 = db.Column(db.SMALLINT)
    animationstart = db.Column(db.Text)
    vfx = db.Column(db.Text)
    animationend = db.Column(db.Text)
    actiontimelinehit = db.Column(db.Text)
    unk9 = db.Column(db.SMALLINT)
    classjob = db.Column(db.Text)
    behaviourtype = db.Column(db.SMALLINT)
    classjoblevel = db.Column(db.SMALLINT)
    isroleaction = db.Column(db.Boolean)
    range = db.Column(db.SMALLINT)
    cantargetself = db.Column(db.Boolean)
    cantargetparty = db.Column(db.Boolean)
    cantargetfriendly = db.Column(db.Boolean)
    cantargethostile = db.Column(db.Boolean)
    unk19 = db.Column(db.Boolean)
    unk20 = db.Column(db.Text)

    targetarea = db.Column(db.Boolean)
    unk22 = db.Column(db.Boolean)
    unk23 = db.Column(db.Boolean)
    unk24 = db.Column(db.SMALLINT)

    cantargetdead = db.Column(db.Boolean)
    unk26 = db.Column(db.Boolean)

    casttype = db.Column(db.SMALLINT)
    effectrange = db.Column(db.SMALLINT)
    xaxismodifier = db.Column(db.SMALLINT)
    unk30 = db.Column(db.Boolean)

    primarycosttype = db.Column(db.SMALLINT)
    primarycostvalue = db.Column(db.SMALLINT)
    secondarycosttype = db.Column(db.SMALLINT)
    secondarycostvalue = db.Column(db.Text)
    actioncombo = db.Column(db.Text)
    preservescombo = db.Column(db.Boolean)
    cast100ms = db.Column(db.SMALLINT)
    recast100ms = db.Column(db.SMALLINT)
    cooldowngroup = db.Column(db.SMALLINT)
    unk40 = db.Column(db.SMALLINT)

    maxcharges = db.Column(db.SMALLINT)
    attacktype = db.Column(db.Text)
    aspect = db.Column(db.SMALLINT)
    actionprocstatus = db.Column(db.Text)
    unk45 = db.Column(db.SMALLINT)

    statusgainself = db.Column(db.Text)
    unlocklink = db.Column(db.Text)
    classjobcategory = db.Column(db.Text)
    unk49 = db.Column(db.SMALLINT)
    unk50 = db.Column(db.Boolean)

    affectsposition = db.Column(db.Boolean)
    omen = db.Column(db.Text)
    ispvp = db.Column(db.Boolean)
    unk54 = db.Column(db.Boolean)
    unk55 = db.Column(db.Boolean)
    unk56 = db.Column(db.Boolean)
    unk57 = db.Column(db.Boolean)
    unk58 = db.Column(db.Boolean)
    unk59 = db.Column(db.Boolean)
    unk60 = db.Column(db.Boolean)
    unk61 = db.Column(db.Boolean)
    unk62 = db.Column(db.SMALLINT)
    unk63 = db.Column(db.Boolean)
    unk64 = db.Column(db.Boolean)

    isplayeraction = db.Column(db.Boolean)
    #description = db.relationship('ActionTransientModel',uselist=False,backref="action")


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
            ActionModel.id,
            ActionModel.name,
            ActionModel.icon,
            ActionModel.actioncategory,
            ActionModel.classjob,
            ActionModel.classjoblevel,
            ActionModel.range,
            ActionModel.cast100ms,
            ActionModel.recast100ms,
            ActionModel.maxcharges,
            ActionModel.attacktype,
            ActionModel.classjobcategory,
            ActionModel.statusgainself,
            ActionTransientModel.description
        ).join(ActionTransientModel).limit(n)

    def get_one(id):
        return db.session.query(
            ActionModel.id,
            ActionModel.name,
            ActionModel.icon,
            ActionModel.actioncategory,
            ActionModel.classjob,
            ActionModel.classjoblevel,
            ActionModel.range,
            ActionModel.cast100ms,
            ActionModel.recast100ms,
            ActionModel.maxcharges,
            ActionModel.attacktype,
            ActionModel.classjobcategory,
            ActionModel.statusgainself,
            ActionTransientModel.description
        ).join(ActionTransientModel).filter(ActionModel.id == id)



    def __repr__(self):
        return '<id {}>'.format(self.id)


class ActionSchema(Schema):
    id = fields.Int(dump_only = True)
    name = fields.Str(required=True)
    icon = fields.Str(required=True)
    actioncategory = fields.Str(required=True)
    unk4 = fields.Int(required=True)
    animationstart = fields.Str(required=True)
    vfx = fields.Str(required=True)
    animationend = fields.Str(required=True)
    actiontimelinehit = fields.Str(required=True)
    unk9 = fields.Int(required=True)
    classjob = fields.Str(required=True)
    behaviourtype = fields.Int(required=True)
    classjoblevel = fields.Int(required=True)
    isroleaction = fields.Boolean(required=True)
    range = fields.Int(required=True)
    cantargetself = fields.Boolean(required=True)
    cantargetparty = fields.Boolean(required=True)
    cantargetfriendly = fields.Boolean(required=True)
    cantargethostile = fields.Boolean(required=True)
    unk19 = fields.Boolean(required=True)
    unk20 = fields.Str(required=True)
    targetarea = fields.Boolean(required=True)
    unk22 = fields.Boolean(required=True)
    unk23 = fields.Boolean(required=True)
    unk24 = fields.Int(required=True)
    cantargetdead = fields.Boolean(required=True)
    unk26 = fields.Boolean(required=True)
    casttype = fields.Int(required=True)
    effectrange = fields.Int(required=True)
    xaxismodifier = fields.Int(required=True)
    unk30 = fields.Boolean(required=True)
    primarycosttype = fields.Int(required=True)
    primarycostvalue = fields.Int(required=True)
    secondarycosttype = fields.Int(required=True)
    secondarycostvalue = fields.Str(required=True)
    actioncombo = fields.Str(required=True)
    preservescombo = fields.Boolean(required=True)
    cast100ms = fields.Int(required=True)
    recast100ms = fields.Int(required=True)
    cooldowngroup = fields.Int(required=True)
    unk40 = fields.Int(required=True)
    maxcharges = fields.Int(required=True)
    attacktype = fields.Str(required=True)
    aspect = fields.Int(required=True)
    actionprocstatus = fields.Str(required=True)
    unk45 = fields.Int(required=True)
    statusgainself = fields.Str(required=True)
    unlocklink = fields.Str(required=True)
    classjobcategory = fields.Str(required=True)
    unk49 = fields.Int(required=True)
    unk50 = fields.Boolean(required=True)
    affectsposition = fields.Boolean(required=True)
    omen = fields.Str(required=True)
    ispvp = fields.Boolean(required=True)
    unk54 = fields.Boolean(required=True)
    unk55 = fields.Boolean(required=True)
    unk56 = fields.Boolean(required=True)
    unk57 = fields.Boolean(required=True)
    unk58 = fields.Boolean(required=True)
    unk59 = fields.Boolean(required=True)
    unk60 = fields.Boolean(required=True)
    unk61 = fields.Boolean(required=True)
    unk62 = fields.Int(required=True)
    unk63 = fields.Boolean(required=True)
    unk64 = fields.Boolean(required=True)
    isplayeraction = fields.Boolean(required=True)
    description = fields.Str(required=True)
