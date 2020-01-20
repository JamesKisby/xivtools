from flask import request,json,Response,Blueprint
from ..models.ItemModel import ItemModel, ItemSchema
from ..shared.Authentication import Auth


item_api = Blueprint('items',__name__)
item_schema = ItemSchema()

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
    item = ItemModel.get_one(item_id)
    if not item:
        return custom_response({'error': 'Item not found'}, 404)
    print("ITEM>>>",item)
    ser_data = item_schema.dump(item)
    print("SER_DATA>>>",ser_data)
    return custom_response(ser_data, 200)


def custom_response(res, status_code):
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
