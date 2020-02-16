from marshmallow import fields, Schema
from . import db
from .RecipeLookupModel import RecipeLookupModel


class ItemModel(db.Model):
    __tablename__ = 'item'

    id = db.Column(db.Integer, primary_key=True)
    singular = db.Column(db.Text)
    adjective = db.Column(db.Integer)
    plural = db.Column(db.Text)
    possessivepronoun = db.Column(db.SMALLINT)
    startswithvowel = db.Column(db.SMALLINT)
    unk5 = db.Column(db.SMALLINT)
    pronoun = db.Column(db.SMALLINT)
    article = db.Column(db.SMALLINT)
    description = db.Column(db.Text)
    name = db.Column(db.Text)
    icon = db.Column(db.Text)
    levelitem = db.Column(db.SMALLINT)
    rarity = db.Column(db.SMALLINT)
    filtergroup = db.Column(db.SMALLINT)
    additionaldata = db.Column(db.Text)
    itemuicategory = db.Column(db.Text)
    itemsearchcategory = db.Column(db.Text)
    equipslotcategory = db.Column(db.SMALLINT)
    unk18 = db.Column(db.Integer)
    stacksize = db.Column(db.Integer)
    isunique = db.Column(db.Boolean)
    isuntradable = db.Column(db.Boolean)
    isindisposable = db.Column(db.Boolean)
    isequippable = db.Column(db.Boolean)
    pricemid = db.Column(db.Integer)
    pricelow = db.Column(db.Integer)
    canbehq = db.Column(db.Boolean)
    isdyeable = db.Column(db.Boolean)
    iscrestworthy = db.Column(db.Boolean)
    itemaction = db.Column(db.SMALLINT)
    unk30 = db.Column(db.SMALLINT)
    cooldowns = db.Column(db.SMALLINT)
    classjobrepair = db.Column(db.Text)
    itemrepair = db.Column(db.Text)
    itemglamour = db.Column(db.Text)
    salvage = db.Column(db.SMALLINT)
    iscollectable = db.Column(db.Boolean)
    alwayscollectable = db.Column(db.Boolean)
    aetherialreduce = db.Column(db.SMALLINT)
    levelequip = db.Column(db.SMALLINT)
    unk40 = db.Column(db.SMALLINT)
    equiprestriction = db.Column(db.SMALLINT)
    classjobcategory = db.Column(db.Text)
    grandcompany = db.Column(db.Text)
    itemseries = db.Column(db.Text)
    baseparammodifier = db.Column(db.SMALLINT)
    modelmain = db.Column(db.ARRAY(db.Integer))
    modelsub = db.Column(db.ARRAY(db.Integer))
    classjobuse = db.Column(db.Text)
    unk49 = db.Column(db.SMALLINT)
    damagephys = db.Column(db.SMALLINT)
    damagemag = db.Column(db.SMALLINT)
    delayms = db.Column(db.SMALLINT)
    unk53 = db.Column(db.SMALLINT)
    blockrate = db.Column(db.SMALLINT)
    block = db.Column(db.SMALLINT)
    defensephys = db.Column(db.SMALLINT)
    defensemag = db.Column(db.SMALLINT)
    baseparam0 = db.Column(db.Text)
    baseparamvalue0 = db.Column(db.SMALLINT)
    baseparam1 = db.Column(db.Text)
    baseparamvalue1 = db.Column(db.SMALLINT)
    baseparam2 = db.Column(db.Text)
    baseparamvalue2 = db.Column(db.SMALLINT)
    baseparam3 = db.Column(db.Text)
    baseparamvalue3 = db.Column(db.SMALLINT)
    baseparam4 = db.Column(db.Text)
    baseparamvalue4 = db.Column(db.SMALLINT)
    baseparam5 = db.Column(db.Text)
    baseparamvalue5 = db.Column(db.SMALLINT)
    itemspecialbonus = db.Column(db.Text)
    itemspecialbonusparam = db.Column(db.SMALLINT)
    baseparamspecial0 = db.Column(db.Text)
    baseparamvaluespecial0 = db.Column(db.SMALLINT)
    baseparamspecial1 = db.Column(db.Text)
    baseparamvaluespecial1 = db.Column(db.SMALLINT)
    baseparamspecial2 = db.Column(db.Text)
    baseparamvaluespecial2 = db.Column(db.SMALLINT)
    baseparamspecial3 = db.Column(db.Text)
    baseparamvaluespecial3 = db.Column(db.SMALLINT)
    baseparamspecial4 = db.Column(db.Text)
    baseparamvaluespecial4 = db.Column(db.SMALLINT)
    baseparamspecial5 = db.Column(db.Text)
    baseparamvaluespecial5 = db.Column(db.SMALLINT)
    materializetype = db.Column(db.SMALLINT)
    materiaslotcount = db.Column(db.SMALLINT)
    isadvancedmeldingpermitted = db.Column(db.Boolean)
    ispvp = db.Column(db.Boolean)
    unk88 = db.Column(db.SMALLINT)
    isglamourous = db.Column(db.Boolean)
    iscraftable = db.Column(db.Boolean)
    craftid = db.Column(db.ARRAY(db.Integer))


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
        return ItemModel.query.limit(n).all()

    def get_one(id):
        return db.session.query(
            ItemModel.id,
            ItemModel.name,
            ItemModel.iscraftable,
            ItemModel.craftid,
            ItemModel.pricemid,
            ItemModel.itemuicategory,
            ItemModel.itemsearchcategory,
            ItemModel.equipslotcategory,
            ItemModel.equiprestriction,
            ItemModel.classjobcategory
        ).filter(ItemModel.id == id).first()


    def updateCraft():
        rows = db.session.query(ItemModel).count()
        for i in range(rows):
            x = db.session.query(ItemModel).get(i)
            recipe = db.session.query(
            RecipeLookupModel.unk0.label('crp'),
            RecipeLookupModel.unk1.label('bsm'),
            RecipeLookupModel.unk2.label('arm'),
            RecipeLookupModel.unk3.label('gsm'),
            RecipeLookupModel.unk4.label('ltw'),
            RecipeLookupModel.unk5.label('wvr'),
            RecipeLookupModel.unk6.label('alc'),
            RecipeLookupModel.unk7.label('cul')).filter(RecipeLookupModel.id == i).first()
            if recipe:
                x.iscraftable = True
                x.craftid = list(recipe)
            else:
                x.iscraftable = False
            db.session.commit()


    def get_ingredient(name):
        return db.session.query(
            ItemModel.id,
            ItemModel.name,
            ItemModel.icon,
            ItemModel.iscraftable,
            ItemModel.craftid,
            ItemModel.levelitem,
            ItemModel.pricemid
        ).filter(ItemModel.name == name).first()


    def __repr(self):
        return '<id {}, isCraftable {}>'.format(self.id,self.isCraftable)


class ItemSchema(Schema):
    id = fields.Int(dump_only=True)
    singular = fields.Str(required=True)
    adjective = fields.Int(required=True)
    plural = fields.Str(required=True)
    possessivepronoun = fields.Int(required=True)
    startswithvowel = fields.Int(required=True)
    unk5 = fields.Int(required=True)
    pronoun = fields.Int(required=True)
    article = fields.Int(required=True)
    description = fields.Str(required=True)
    name = fields.Str(required=True)
    icon = fields.Str(required=True)
    levelitem = fields.Int(required=True)
    rarity = fields.Int(required=True)
    filtergroup = fields.Int(required=True)
    additionaldata = fields.Str(required=True)
    itemuicategory = fields.Str(required=True)
    itemsearchcategory = fields.Str(required=True)
    equipslotcategory = fields.Int(required=True)
    unk18 = fields.Int(required=True)
    stacksize = fields.Int(required=True)
    isunique = fields.Boolean(required=True)
    isuntradable = fields.Boolean(required=True)
    isindisposable = fields.Boolean(required=True)
    isequippable = fields.Boolean(required=True)
    pricemid = fields.Int(required=True)
    pricelow = fields.Int(required=True)
    canbehq = fields.Int(required=True)
    isdyeable = fields.Boolean(required=True)
    iscrestworthy = fields.Boolean(required=True)
    itemaction = fields.Int(required=True)
    unk30 = fields.Int(required=True)
    cooldowns = fields.Int(required=True)
    classjobrepair = fields.Str(required=True)
    itemrepair = fields.Str(required=True)
    itemglamour = fields.Str(required=True)
    salvage = fields.Int(required=True)
    iscollectable = fields.Boolean(required=True)
    alwayscollectable = fields.Boolean(required=True)
    aetherialreduce = fields.Int(required=True)
    levelequip = fields.Int(required=True)
    unk40 = fields.Int(required=True)
    equiprestriction = fields.Int(required=True)
    classjobcategory = fields.Str(required=True)
    grandcompany = fields.Str(required=True)
    itemseries = fields.Str(required=True)
    baseparammodifier = fields.Int(required=True)
    modelmain = fields.List(fields.Int(), required=True)
    modelsub = fields.List(fields.Int(), required=True)
    classjobuse = fields.Str(required=True)
    unk49 = fields.Int(required=True)
    damagephys = fields.Int(required=True)
    damagemag = fields.Int(required=True)
    delayms = fields.Int(required=True)
    unk53 = fields.Int(required=True)
    blockrate = fields.Int(required=True)
    block = fields.Int(required=True)
    defensephys = fields.Int(required=True)
    defensemag = fields.Int(required=True)
    baseparam0 = fields.Str(required=True)
    baseparamvalue0 = fields.Int(required=True)
    baseparam1 = fields.Str(required=True)
    baseparamvalue1 = fields.Int(required=True)
    baseparam2 = fields.Str(required=True)
    baseparamvalue2 = fields.Int(required=True)
    baseparam3 = fields.Str(required=True)
    baseparamvalue3 = fields.Int(required=True)
    baseparam4 = fields.Str(required=True)
    baseparamvalue4 = fields.Int(required=True)
    baseparam5 = fields.Str(required=True)
    baseparamvalue5 = fields.Int(required=True)
    itemspecialbonus = fields.Str(required=True)
    itemspecialbonusparam = fields.Int(required=True)
    baseparamspecial0 = fields.Str(required=True)
    baseparamvaluespecial0 = fields.Int(required=True)
    baseparamspecial1 = fields.Str(required=True)
    baseparamvaluespecial1 = fields.Int(required=True)
    baseparamspecial2 = fields.Str(required=True)
    baseparamvaluespecial2 = fields.Int(required=True)
    baseparamspecial3 = fields.Str(required=True)
    baseparamvaluespecial3 = fields.Int(required=True)
    baseparamspecial4 = fields.Str(required=True)
    baseparamvaluespecial4 = fields.Int(required=True)
    baseparamspecial5 = fields.Str(required=True)
    baseparamvaluespecial5 = fields.Int(required=True)
    materializetype = fields.Int(required=True)
    materiaslotcount = fields.Int(required=True)
    isadvancedmeldingpermitted = fields.Boolean(required=True)
    ispvp = fields.Boolean(required=True)
    unk88 = fields.Int(required=True)
    isglamourous = fields.Boolean(required=True)
    iscraftable = fields.Boolean(required=True)
    craftid = fields.List(fields.Int(), required=True)
