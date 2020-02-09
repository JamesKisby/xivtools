from marshmallow import fields, Schema
from . import db
from sqlalchemy.dialects import postgresql
from .ItemModel import ItemModel
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.dialects.postgresql import aggregate_order_by


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
    #item = db.relationship("ItemModel", back_populates = "raiddrops")


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

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, data):
        print("IN UPDATE")
        print(data[0]['XIVEvent']['Actor']['Name'])
        self.name = data[0]['XIVEvent']['Actor']['Name']
        self.world = data[0]['XIVEvent']['Actor']['HomeWorld']['Name']
        self.isreporter = data[0]['XIVEvent']['Actor']['IsReporter']
        self.classjob = data[0]['XIVEvent']['Actor']['ClassJob']['Abbreviation']
        self.time = data[0]['ACTLogLineEvent']['DetectedTime']
        self.logmessage = data[0]['LogMessage']
        self.itemid = data[0]['XIVEvent']['Item']['Id']
        self.itemquantity = data[0]['XIVEvent']['Item']['Quantity']
        self.playerid = data[1]
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def get_limit(n):
        return RaidDropsModel.query.limit(n).all()

    def get_by_player(playerid):
        q = db.session.query(
            #RaidDropsModel.id,
            RaidDropsModel.name.label('playername'),
            #RaidDropsModel.world.label('playerworld'),
            #RaidDropsModel.isreporter,
            #RaidDropsModel.itemquantity,
            #RaidDropsModel.playerid,
            db.func.array_agg(aggregate_order_by(ItemModel.name, ItemModel.equipslotcategory)).label('itemnames'),
            db.func.array_agg(aggregate_order_by(RaidDropsModel.itemquantity, ItemModel.equipslotcategory)).label('itemquantities'),
            db.func.array_agg(aggregate_order_by(ItemModel.itemuicategory, ItemModel.equipslotcategory)).label('itemcategories'),
            db.func.array_agg(aggregate_order_by(ItemModel.equipslotcategory, ItemModel.equipslotcategory)).label('equipcategories'),
            db.func.array_agg(aggregate_order_by(ItemModel.icon, ItemModel.equipslotcategory)).label('icons'),
            #ItemModel.name.label('itemname'),
            #ItemModel.icon.label('itemicon'),
            #ItemModel.description.label('itemdescription'),
            #ItemModel.equipslotcategory.label('itemequipslot'),
            #ItemModel.itemuicategory.label('itemcategory'),
        ).join(ItemModel).group_by(
            RaidDropsModel.name
            ).filter(RaidDropsModel.playerid == str(playerid))
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
