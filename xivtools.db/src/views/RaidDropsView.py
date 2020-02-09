from flask import request,json,Response,Blueprint,jsonify,request
from ..shared.Authentication import Auth
from ..models.RaidDropsModel import RaidDropsModel, RaidDropsSchema
import datetime

raid_api = Blueprint('raid',__name__)
raid_schema = RaidDropsSchema()

@raid_api.route('/', methods=['POST'])
def create():
    req_data = request.get_json()
    data, error = raid_schema.load(req_data)

    if error:
        return custom_response(error,400)

    raid = RaidDropsModel(data)
    raid.save()

    ser_data = raid_schema.dump(raid)

    token = Auth.generate_token(ser_data.get('id'))

    return custom_response({'jwt_token': token}, 201)


@raid_api.route('/', methods=['GET'])
def get_all():
    raids = RaidDropsModel.get_limit(20)
    ser_data = raid_schema.dump(raids, many=True)
    return custom_response(ser_data, 200)


@raid_api.route('/<int:playerid>', methods=['GET'])
def get_raid(playerid):
    raid = RaidDropsModel.get_by_player(playerid)
    if not raid:
        return custom_response({'error': 'raid not found'}, 404)
    ser_data = raid_schema.dump(raid, many=True)

    #for data in ser_data:
    a = []
    names = [x['playername'] for x in ser_data]
    keys = ser_data[0].keys()
    for i,data in enumerate(ser_data):
        b = [dict(zip(keys, vals)) for vals in zip(*(data[k] for k in keys))]
        for c in b:
            c['playername'] = names[i]
            c['icons'] = 'http://garlandtools.org/files/icons/item/' + c['icons'].split("/")[-1].replace("tex","png").lstrip("0")
        a.append(b)
    print(a)
    print(json.dumps(a))
    return custom_response(a, 200)


@raid_api.route('/test', methods=['POST'])
def set_test():
    req_data = request.get_json()
    print(req_data)
    if not 'Actor' in req_data[0]['XIVEvent']:
        return custom_response({'error':'no drops'}, 400)
    data = {}
    data['name'] = req_data[0]['XIVEvent']['Actor']['Name']
    if 'HomeWorld' in req_data[0]['XIVEvent']['Actor']:
        data['world'] = req_data[0]['XIVEvent']['Actor']['HomeWorld']['Name']
    if not 'IsReporter' in req_data[0]['XIVEvent']['Actor']:
        data['isreporter'] = False
    else:
        data['isreporter'] = req_data[0]['XIVEvent']['Actor']['IsReporter']
    if 'ClassJob' in req_data[0]['XIVEvent']['Actor']:
        data['classjob'] = req_data[0]['XIVEvent']['Actor']['ClassJob']['Abbreviation']
    data['time'] = datetime.datetime.strptime(
                    req_data[0]['ACTLogLineEvent']['DetectedTime'],
                    "%Y-%m-%dT%H:%M:%S")
    data['logmessage'] = req_data[0]['LogMessage']
    data['itemid'] = req_data[0]['XIVEvent']['Item']['Id']
    data['itemquantity'] = req_data[0]['XIVEvent']['Item']['Quantity']
    data['playerid'] = req_data[1]
    raiddrop = RaidDropsModel(data)
    raiddrop.save()
    return ('', 204)

def custom_response(res, status_code):
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
