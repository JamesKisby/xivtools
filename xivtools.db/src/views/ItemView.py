from flask import request,json,Response,Blueprint
from ..models.ItemModel import ItemModel, ItemSchema
from ..models.RecipeModel import RecipeModel, RecipeSchema
from ..shared.Authentication import Auth


item_api = Blueprint('items',__name__)
item_schema = ItemSchema()
recipe_schema = RecipeSchema()
crafts = ["crp","bsm","arm","gsm","ltw","wvr","alc","cul"]

@item_api.route('/', methods=['POST'])
def create():
    req_data = request.get_json()
    data, error = item_schema.load(req_data)

    if error:
        return custom_response(error,400)

    item = ItemModel(data)
    item.save()

    ser_data = item_schema.dump(item)

    token = Auth.generate_token(ser_data.get('id'))

    return custom_response({'jwt_token': token}, 201)


@item_api.route('/', methods=['GET'])
def get_all():
    items = ItemModel.get_limit(20)
    print("ITEMS TYPE",type(items))
    ser_data = item_schema.dump(items, many=True)
    print("SER_DATA TYPE",type(ser_data))
    return custom_response(ser_data, 200)


@item_api.route('/<int:item_id>', methods=['GET'])
def get_item(item_id):
    recipe = []
    item = ItemModel.get_one(item_id)
    if not item:
        return custom_response({'error': 'Item not found'}, 404)
    ser_data = {"item":item_schema.dump(item)}
    print(ser_data)
    if item.iscraftable:
        for id in ser_data["item"]["craftid"]:
            if id != 0:
                ser_data["item"]["craft"] = recipe_schema.dump(RecipeModel.get_one(id))
                break
        getIngredients(ser_data["item"]["craft"],recipe)
    if recipe:
        ser_data["ingredients"] = recipe


    return custom_response(ser_data, 200)


def getIngredients(data,recipe, amountRequired=1):
    for i in range(7):
        alreadyEntered = False
        gotRec = False
        res = {}
        name = data["itemingredient"+str(i)]
        amount = data["amountingredient"+str(i)]
        if name:
            print("GETTING ITEM",name)
            ingredient = item_schema.dump(ItemModel.get_ingredient(name))
            rec = {}
            if ingredient["iscraftable"]:
                for id in ingredient["craftid"]:
                    if id != 0:
                        print("GETTING RECIPE",name)
                        rec = id
                        #rec = recipe_schema.dump(RecipeModel.get_one(id))
                        break

                for item in recipe:
                    if "id" in item and item["id"] == rec:
                        rec = item
                        gotRec = True
                        break
                if not gotRec:
                    rec = recipe_schema.dump(RecipeModel.get_one(rec))

            for item in recipe:
                if "id" in item and item["id"] == ingredient["id"]:
                    alreadyEntered = True
                    item["amount"] += (amount*amountRequired)
                    break
            if not alreadyEntered:
                res["id"] = ingredient["id"]
                res["name"] = ingredient["name"]
                res["amount"] = (amount*amountRequired)
                res["ilvl"] = ingredient["levelitem"]
                res["icon"] = ingredient["icon"]
                res["price"] = ingredient["pricemid"]
                if rec:
                    res["crafttype"] = rec["crafttype"]
                    res["amountresult"] = rec["amountresult"]
            if res:
                recipe.append(res)
            if rec:
                getIngredients(rec,recipe,amountRequired=amount)
        else:
            break


def custom_response(res, status_code):
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )



def updateCraft():
    print("UPDATING.....")
    ItemModel.updateCraft()
