from marshmallow import fields, Schema
from . import db
from .ActionTransientModel import ActionTransientModel

class ActionModel(db.Model):
    __tablename__ = 'action'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    icon = db.Column(db.Text)
    actioncategory = db.Column(db.Text)
    classjob = db.Column(db.Text)
    behaviourtype = db.Column(db.SMALLINT)
    classjoblevel = db.Column(db.SMALLINT)
    isroleaction = db.Column(db.Boolean)
    range = db.Column(db.SMALLINT)
    cantargetself = db.Column(db.Boolean)
    cantargetparty = db.Column(db.Boolean)
    cantargetfriendly = db.Column(db.Boolean)
    cantargethostile = db.Column(db.Boolean)
    targetarea = db.Column(db.Boolean)
    cantargetdead = db.Column(db.Boolean)
    casttype = db.Column(db.SMALLINT)
    effectrange = db.Column(db.SMALLINT)
    xaxismodifier = db.Column(db.SMALLINT)
    primarycosttype = db.Column(db.SMALLINT)
    primarycostvalue = db.Column(db.SMALLINT)
    secondarycosttype = db.Column(db.SMALLINT)
    secondarycostvalue = db.Column(db.Text)
    actioncombo = db.Column(db.Text)
    preservescombo = db.Column(db.Boolean)
    cast100ms = db.Column(db.SMALLINT)
    recast100ms = db.Column(db.SMALLINT)
    cooldowngroup = db.Column(db.SMALLINT)
    maxcharges = db.Column(db.SMALLINT)
    attacktype = db.Column(db.Text)
    aspect = db.Column(db.SMALLINT)
    actionprocstatus = db.Column(db.Text)
    statusgainself = db.Column(db.Text)
    unlocklink = db.Column(db.Text)
    classjobcategory = db.Column(db.Text)
    affectsposition = db.Column(db.Boolean)
    omen = db.Column(db.Text)
    ispvp = db.Column(db.Boolean)
    isplayeraction = db.Column(db.Boolean)
    description = db.relationship('ActionTransientModel',uselist=False,backref="action")


    def __init__(self,data):
        self.id = data.get(id)
        self.name = data.get(name)
        self.icon = data.get(icon)
        self.actioncategory = data.get(actioncategory)
        self.classjob = data.get(classjob)
        self.behaviourtype = data.get(behaviourtype)
        self.classjoblevel = data.get(classjoblevel)
        self.isroleaction = data.get(isroleaction)
        self.range = data.get(range)
        self.cantargetself = data.get(cantargetself)
        self.cantargetparty = data.get(cantargetparty)
        self.cantargetfriendly = data.get(cantargetfriendly)
        self.cantargethostile = data.get(cantargethostile)
        self.targetarea = data.get(targetarea)
        self.cantargetdead = data.get(cantargetdead)
        self.casttype = data.get(casttype)
        self.effectrange = data.get(effectrange)
        self.xaxismodifier = data.get(xaxismodifier)
        self.primarycosttype = data.get(primarycosttype)
        self.primarycostvalue = data.get(primarycostvalue)
        self.secondarycosttype = data.get(secondarycosttype)
        self.secondarycostvalue = data.get(secondarycostvalue)
        self.actioncombo = data.get(actioncombo)
        self.preservescombo = data.get(preservescombo)
        self.cast100ms = data.get(cast100ms)
        self.recast100ms = data.get(recast100ms)
        self.cooldowngroup = data.get(cooldowngroup)
        self.maxcharges = data.get(maxcharges)
        self.attacktype = data.get(attacktype)
        self.aspect = data.get(aspect)
        self.actionprocstatus = data.get(actionprocstatus)
        self.statusgainself = data.get(statusgainself)
        self.unlocklink = data.get(unlocklink)
        self.classjobcategory = data.get(classjobcategory)
        self.affectsposition = data.get(affectsposition)
        self.omen = data.get(omen)
        self.ispvp = data.get(ispvp)
        self.isplayeraction = data.get(isplayeraction)
        self.description = data.get(description)

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
        return ActionModel.query.join(ActionTransientModel).with_entities(
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
            ActionTransientModel.description).limit(n)

    def get_one(id):
        return ActionModel.query.join(ActionTransientModel).with_entities(
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
            ActionTransientModel.description).filter(ActionModel.id == id)

    def __repr__(self):
        return '<id {}>'.format(self.id)


class ActionSchema(Schema):
    id = fields.Int(dump_only = True)
    name = fields.Str(required=True)
    icon = fields.Str(required=True)
    actioncategory = fields.Str(required=True)
    classjob = fields.Str(required=True)
    behaviourtype = fields.Int(required=True)
    classjoblevel = fields.Int(required=True)
    isroleaction = fields.Boolean(required=True)
    range = fields.Int(required=True)
    cantargetself = fields.Boolean(required=True)
    cantargetparty = fields.Boolean(required=True)
    cantargetfriendly = fields.Boolean(required=True)
    cantargethostile = fields.Boolean(required=True)
    targetarea = fields.Boolean(required=True)
    cantargetdead = fields.Boolean(required=True)
    casttype = fields.Int(required=True)
    effectrange = fields.Int(required=True)
    xaxismodifier = fields.Int(required=True)
    primarycosttype = fields.Int(required=True)
    primarycostvalue = fields.Int(required=True)
    secondarycosttype = fields.Int(required=True)
    secondarycostvalue = fields.Str(required=True)
    actioncombo = fields.Str(required=True)
    preservescombo = fields.Boolean(required=True)
    cast100ms = fields.Int(required=True)
    recast100ms = fields.Int(required=True)
    cooldowngroup = fields.Int(required=True)
    maxcharges = fields.Int(required=True)
    attacktype = fields.Str(required=True)
    aspect = fields.Int(required=True)
    actionprocstatus = fields.Str(required=True)
    statusgainself = fields.Str(required=True)
    unlocklink = fields.Str(required=True)
    classjobcategory = fields.Str(required=True)
    affectsposition = fields.Boolean(required=True)
    omen = fields.Str(required=True)
    ispvp = fields.Boolean(required=True)
    isplayeraction = fields.Boolean(required=True)
    description = fields.Str(required=True)
