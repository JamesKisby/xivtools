import datetime
from marshmallow import fields, Schema
from . import db
from sqlalchemy.dialects import postgresql
from .ItemModel import ItemModel
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.dialects.postgresql import aggregate_order_by


class RaidCalendarModel(db.Model):
    __tablename__ = 'raidcalendar'

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Text)
    raidid = db.Column(db.Text)
    guildid = db.Column(db.Text)
    owner = db.Column(db.ARRAY(db.Text))
    day = db.Column(db.SMALLINT)
    starttime = db.Column(db.Time)
    endtime = db.Column(db.Time)
    isstandard = db.Column(db.Boolean)

    def __init__(self, data):
        self.userid = data['userid']
        self.raidid = data['raidid']
        self.guildid = data['guildid']
        self.owner = data['owner']
        self.day = data['day']
        self.starttime = data['starttime']
        self.endtime = data['endtime']
        self.isstandard = data['isstandard']

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update_schedule(self, data):
        self.guildid = data['guildid']
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def get_schedule(raidid):
        return db.session.query(RaidCalendarModel).filter(
            RaidCalendarModel.raidid == raidid
        ).all()

    def get_schedule_by_guildid(guildid):
        return db.session.query(RaidCalendarModel).filter(
            RaidCalendarModel.guildid == guildid
        ).all()

    def get_one(data):
        return db.session.query(RaidCalendarModel).filter(
            RaidCalendarModel.raidid == data['raidid'],
            RaidCalendarModel.starttime == data['starttime'],
            RaidCalendarModel.endtime == data['endtime']
        ).first()


class RaidCalendarSchema(Schema):
    id = fields.Int(dump_only=True)
    userid = fields.Str(required=True)
    raidid = fields.Str(required=True)
    guildid = fields.Str(required=True)
    owner = fields.List(fields.Str(), required=True)
    day = fields.Int(required=True)
    starttime = fields.Str(required=True)
    endtime = fields.Str(required=True)
    isstandard = fields.Boolean(required=True)
