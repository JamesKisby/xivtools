from flask import request,json,Response,Blueprint
from ..models.NotoriousMonsterModel import NotoriousMonsterModel, NotoriousMonsterSchema
from ..shared.Authentication import Auth


item_api = Blueprint('items',__name__)
item_schema = NotoriousMonsterSchema()

@item_api.route('/', methods=['POST'])
def create():
    req_data = request.get_json()
    data, error = item_schema.load(req_data)

    if error:
        return custom_response(error,400)

    item = NotoriousMonsterModel(data)
    item.save()

    ser_data = item_schema.dump(item)

    token = Auth.generate_token(ser_data.get('id'))

    return custom_response({'jwt_token': token}, 201)


@item_api.route('/', methods=['GET'])
def get_all():
    items = NotoriousMonsterModel.get_limit(20)
    print("GETALLITEM>>>",items)
    ser_data = item_schema.dump(items, many=True)
    return custom_response(ser_data, 200)


@item_api.route('/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = NotoriousMonsterModel.get_one(item_id)
    if not item:
        return custom_response({'error': 'Item not foind'}, 404)
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
