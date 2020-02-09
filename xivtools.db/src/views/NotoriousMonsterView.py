from flask import request,json,Response,Blueprint,jsonify,request
from ..models.NotoriousMonsterModel import NotoriousMonsterModel, NotoriousMonsterSchema
from ..shared.Authentication import Auth


monster_api = Blueprint('monster',__name__)
monster_schema = NotoriousMonsterSchema()

@monster_api.route('/', methods=['POST'])
def create():
    req_data = request.get_json()
    data, error = monster_schema.load(req_data)

    if error:
        return custom_response(error,400)

    monster = NotoriousMonsterModel(data)
    monster.save()

    ser_data = monster_schema.dump(monster)

    token = Auth.generate_token(ser_data.get('id'))

    return custom_response({'jwt_token': token}, 201)


@monster_api.route('/', methods=['GET'])
def get_all():
    monsters = NotoriousMonsterModel.get_limit(20)
    ser_data = monster_schema.dump(monsters, many=True)
    return custom_response(ser_data, 200)


@monster_api.route('/<int:monster_id>', methods=['GET'])
def get_monster(monster_id):
    monster = NotoriousMonsterModel.get_one(monster_id)
    if not monster:
        return custom_response({'error': 'monster not found'}, 404)
    ser_data = monster_schema.dump(monster)
    return custom_response(ser_data, 200)


def custom_response(res, status_code):
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
