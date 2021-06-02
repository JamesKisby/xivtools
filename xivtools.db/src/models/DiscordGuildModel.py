from marshmallow import fields, Schema
from . import db
from sqlalchemy import func

class DiscordGuildModel(db.Model):
    __tablename__ = 'discordguilds'

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Text)
    guildid = db.Column(db.BigInteger)
    raidid = db.Column(db.Text)
    voicechannel = db.Column(db.Text)

    def __init__(self,data):
        self.userid = data.get('userid')
        self.guildid = data.get('guildid')
        self.raidid = data.get('raidid')
        self.voicechannel = data.get('voicechannel')


    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, data):
        for key, item in data.items():
            if key == 'id':
                continue
            elif key == 'userid' and self.userid is not None:
                setattr(self, key, self.userid + item)
            elif key == 'raidid' and self.raidid is not None:
                setattr(self, key, self.raidid + item)
            elif key == 'guildid' and self.guildid is not None:
                setattr(self, key, self.guildid + item)
            else:
                setattr(self, key, item)
        db.session.commit()


    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def get_limit(n):
        return DiscordGuildModel.query.limit(n).all()

    def get_one(id):
        return DiscordGuildModel.query.get(id)

    def get_by_raidid(raidid):
        return db.session.query(DiscordGuildModel).filter(DiscordGuildModel.raidid == raidid).first()

    def get_voice_channel(guildid):
        return db.session.query(DiscordGuildModel).filter(DiscordGuildModel.guildid == guildid).first()

    def __repr__(self):
        return 'GuildId: {}\nUserId: {}\nRaidId: {}'.format(self.guildid, self.userid, self.raidid)


class DiscordGuildSchema(Schema):
    id = fields.Int(dump_only=True)
    userid = fields.Str(required=True)
    guildid = fields.Int(required=True)
    raidid = fields.Str(required=True)
    voicechannel = fields.Str(required=True)
