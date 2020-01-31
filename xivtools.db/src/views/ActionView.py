from flask import request,json,Response,Blueprint
from ..models.ActionModel import ActionModel, ActionSchema


action_api = Blueprint('actions',__name__)
action_schema = ActionSchema()

'''
@item_api.route('/', methods=['POST'])
def create():
    req_data = request.get_json()
    data, error = action_schema.load(req_data)

    if error:
        return custom_response(error,400)

    item = NotoriousMonsterModel(data)
    item.save()

    ser_data = action_schema.dump(item)

    token = Auth.generate_token(ser_data.get('id'))

    return custom_response({'jwt_token': token}, 201)
'''


@action_api.route('/', methods=['GET'])
def get_all():
    actions = ActionModel.get_limit(20)
    ser_data = action_schema.dump(actions, many=True)
    return custom_response(ser_data, 200)


@action_api.route('/<int:action_id>', methods=['GET'])
def get_item(action_id):
    action = ActionModel.get_one(action_id)
    print("ACTION",action)
    if not action:
        return custom_response({'error': 'Action not found'}, 404)
    ser_data = action_schema.dump(action, many=True)
    print("SER_DATA!",ser_data)
    return custom_response(ser_data, 200)


def custom_response(res, status_code):
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
