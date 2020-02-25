from marshmallow import fields, Schema
from . import db
from sqlalchemy.dialects import postgresql
from .ItemModel import ItemModel
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.dialects.postgresql import aggregate_order_by


class RaidTrackerModel(db.Model):
    __tablename__ = 'raidtracker'

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Text)
    raidname = db.Column(db.Text)
    trackerid = db.Column(db.Text)
    trackerpw = db.Column(db.Text)
    owner = db.Column(db.ARRAY(db.Text))
    isactive = db.Column(db.Boolean)

    def __init__(self, data):
        self.userid = data['userid']
        self.raidname = data['raidname']
        self.trackerid = data['raidid'][0]
        self.trackerpw = data['trackerpw'][0]
        self.owner = data['owner']
        self.isactive = data['isactive']

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, data):
        self.itemquantity = self.itemquantity + data['itemquantity']
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def get_limit(n):
        return RaidTrackerModel.query.limit(n).all()

    def get_tracker(trackerid):
        return db.session.query(RaidTrackerModel).filter(
            RaidTrackerModel.trackerid == trackerid
        ).first()

    def __repr__(self):
        return '<id {}>'.format(self.id)



class RaidTrackerSchema(Schema):
    id = fields.Int(dump_only=True)
    userid = fields.Str(required=True)
    raidname = fields.Str(required=True)
    trackerid = fields.Str(required=True)
    trackerpw = fields.Str(required=True)
    owner = fields.List(fields.Str(), required=True)
    isactive = fields.Boolean(required=True)



class RaidDropsModel(db.Model):
    __tablename__ = 'raiddrops'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    classjob = db.Column(db.Text)
    world = db.Column(db.Text)
    isreporter = db.Column(db.Boolean)
    time = db.Column(db.DateTime)
    logmessage = db.Column(db.Text)
    itemid = db.Column(db.Integer, db.ForeignKey('item.id'))
    itemquantity = db.Column(db.SMALLINT)
    playerid = db.Column(db.Text)
    view = db.Column(db.Boolean)


    def __init__(self, data):
        self.name = data.get('name')
        self.classjob = data.get('classjob')
        self.world = data.get('world')
        self.isreporter = data.get('isreporter')
        self.time = data.get('time')
        self.logmessage = data.get('logmessage')
        self.itemid = data.get('itemid')
        self.itemquantity = data.get('itemquantity')
        self.playerid = data.get('playerid')
        self.view = data.get('view')

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, data):
        self.itemquantity = self.itemquantity + data['itemquantity']
        db.session.commit()

    def updateView(self, data, view=True):
        self.view = view
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def get_limit(n):
        return RaidDropsModel.query.limit(n).all()

    def get_one(data):
        return db.session.query(RaidDropsModel).filter(
            RaidDropsModel.playerid == data['playerid'],
            RaidDropsModel.itemid == data['itemid'],
            RaidDropsModel.name == data['name']
        ).first()

    def get_by_player(playerid):
        q = db.session.query(
            #RaidDropsModel.id,
            RaidDropsModel.name.label('playername'),
            #RaidDropsModel.world.label('playerworld'),
            db.func.array_agg(aggregate_order_by(RaidDropsModel.time, ItemModel.name)).label('time'),
            #db.func.array_agg(RaidDropsModel.itemid).label('idd'),
            #RaidDropsModel.itemquantity,
            #RaidDropsModel.playerid,
            db.func.array_agg(aggregate_order_by(ItemModel.name, ItemModel.name)).label('itemnames'),
            db.func.array_agg(aggregate_order_by(ItemModel.id, ItemModel.name)).label('ids'),
            db.func.array_agg(aggregate_order_by(RaidDropsModel.itemquantity, ItemModel.name)).label('itemquantities'),
            db.func.array_agg(aggregate_order_by(ItemModel.itemuicategory, ItemModel.name)).label('itemcategories'),
            db.func.array_agg(aggregate_order_by(ItemModel.equipslotcategory, ItemModel.name)).label('equipcategories'),
            db.func.array_agg(aggregate_order_by(ItemModel.icon, ItemModel.name)).label('icons'),
            #ItemModel.name.label('itemname'),
            #ItemModel.icon.label('itemicon'),
            #ItemModel.description.label('itemdescription'),
            #ItemModel.equipslotcategory.label('itemequipslot'),
            #ItemModel.itemuicategory.label('itemcategory'),
        ).join(ItemModel).group_by(
            RaidDropsModel.name
            ).filter(RaidDropsModel.playerid == str(playerid),
                     RaidDropsModel.view == True)
        return q


    def __repr__(self):
        return '<id {}>'.format(self.id)


class RaidDropsSchema(Schema):
    id = fields.Int(dump_only=True)
    playername = fields.Str(required=True)
    classjob = fields.Str(required=True)
    playerworld = fields.Str(required=True)
    isreporter = fields.Boolean(required=True)
    time = fields.Str(required=True)
    logmessage = fields.Str(required=True)
    itemid = fields.Int(required=True)
    itemquantity = fields.Int(required=True)
    playerid = fields.Str(required=True)
    itemname = fields.Str(required=True)
    itemicon = fields.Str(required=True)
    itemdescription = fields.Str(required=True)
    itemequipslot = fields.Str(required=True)
    itemcategory = fields.Str(required=True)
    itemquantities = fields.List(fields.Int(), required=True)
    itemnames = fields.List(fields.Str(), required=True)
    itemcategories = fields.List(fields.Str(), required=True)
    equipcategories = fields.List(fields.Str(), required=True)
    icons = fields.List(fields.Str(), required=True)
    ids = fields.List(fields.Int(), required=True)
    view = fields.Boolean(required=True)
