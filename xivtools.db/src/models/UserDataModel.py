from marshmallow import fields, Schema
from . import db
from sqlalchemy import func

class UserDataModel(db.Model):
    __tablename__ = 'userdata'

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Text)
    username = db.Column(db.Text)
    email = db.Column(db.Text)
    raidid = db.Column(db.ARRAY(db.Text))
    raidname = db.Column(db.ARRAY(db.Text))
    pwhash = db.Column(db.Text)
    refresh = db.Column(db.Text)
    expires = db.Column(db.Text)

    def __init__(self,data):
        self.userid = data.get('userid')
        self.username = data.get('username')
        self.email = data.get('email')
        self.raidid = data.get('raidid')
        self.raidname = data.get('raidname')
        self.pwhash = data.get('pwhash')
        self.refresh = data.get('refresh')
        self.expires = data.get('expires')

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, data):
        for key, item in data.items():
            if key == 'id':
                continue
            elif key == 'raidname' and self.raidname is not None:
                setattr(self, key, self.raidname + item)
            elif key == 'raidid' and self.raidid is not None:
                setattr(self, key, self.raidid + item)
            else:
                setattr(self, key, item)
        db.session.commit()


    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def get_limit(n):
        return UserDataModel.query.limit(n).all()

    def get_one(id):
        return UserDataModel.query.get(id)

    def get_raid_tracker(user):
        return db.session.query(UserDataModel).filter(UserDataModel.username == user).first()

    def get_by_token(token):
        return db.session.query(UserDataModel).filter(UserDataModel.pwhash == token).first()

    def __repr__(self):
        return 'id: {}\nraidname: {}\nraidid: {}'.format(self.id, self.raidname, self.raidid)


class UserDataSchema(Schema):
    id = fields.Int(dump_only=True)
    userid = fields.Str(required=True)
    username = fields.Str(required=True)
    email = fields.Str(required=True)
    raidid = fields.List(fields.Str(), required=True)
    raidname = fields.List(fields.Str(), required=True)
    pwhash = fields.Str(required=True)
    refresh = fields.Str(required=True)
    expires = fields.Str(required=True)
