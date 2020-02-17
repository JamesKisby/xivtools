from flask import request,json,Response,Blueprint,jsonify,request
from ..shared.Authentication import Auth
from ..models.RaidDropsModel import RaidDropsModel, RaidDropsSchema
from ..models.UserDataModel import UserDataModel, UserDataSchema
from ..models.RaidDropsModel import RaidTrackerModel, RaidTrackerSchema
import datetime
from hashids import Hashids
from random import random

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

@raid_api.route('/add/', methods=['GET'])
def add_raid():
    if not request.values.get('code'):
        return ('', 400)
    user = UserDataModel.get_by_token(request.values.get('code'))
    if not user:
        return ('No user', 400)
    data = {}
    salt = user.username + request.values.get('name')
    hashid = Hashids(salt=salt, min_length=10)
    l = int(random()* 1000000)
    data['raidname'] = [request.values.get('name')]
    data['raidid'] = [hashid.encode(l)]
    user.update(data)
    data['isactive'] = True
    data['userid'] = user.userid
    data['owner'] = [user.userid]
    raid = RaidTrackerModel(data)
    raid.save()
    return ({'Raid_added': True}, 200)

@raid_api.route('/addexisting/', methods=['GET'])
def add_existing_raid():
    if not request.values.get('code'):
        return ('', 400)
    user = UserDataModel.get_by_token(request.values.get('code'))
    if not user:
        return ('No user', 400)
    data = {}
    raid = RaidTrackerModel.get_tracker(request.values.get('raidid'))
    data['raidid'] = [request.values.get('raidid')]
    data['raidname'] = [raid.raidname.lstrip('{').rstrip('}')]
    user.update(data)
    return ({'Raid_added': True}, 200)

@raid_api.route('/remove/', methods=['GET'])
def remove_raid():
    if not request.values.get('code'):
        return ('', 400)
    user = UserDataModel.get_by_token(request.values.get('code'))
    if not user:
        return ('No user', 400)
    data,index = {},[]
    if user.raidid and request.values.get('raidid') in user.raidid:
        index = user.raidid.index(request.values.get('raidid'))
        user.raidid.remove(request.values.get('raidid'))
        del user.raidname[index]
    data['raidname'] = user.raidname
    data['raidid'] = user.raidid
    data['pwhash'] = request.values.get('code')
    data['username'] = user.username
    data['email'] = user.email
    data['refresh'] = user.refresh
    data['expires'] = user.expires
    newuser = UserDataModel(data)
    user.delete()
    newuser.save()
    return ({'Raid_removed': True}, 200)


@raid_api.route('/<playerid>', methods=['GET'])
def get_raid(playerid):
    exists = RaidTrackerModel.get_tracker(playerid)
    if not exists:
        return custom_response({'error': 'raid not found'}, 400)
    raid = RaidDropsModel.get_by_player(playerid)
    ser_data = raid_schema.dump(raid, many=True)
    if not ser_data:
        return custom_response({'error': 'raid empty'}, 200)

    a = []
    names = [x['playername'] for x in ser_data]
    times = [x['time'] for x in ser_data]
    times = [*map(eval,times)]
    print(times)
    keys = ser_data[0].keys()
    for i,data in enumerate(ser_data):
        b = [dict(zip(keys, vals)) for vals in zip(*(data[k] for k in keys))]
        for j,c in enumerate(b):
            icons = c['icons'].split("/")
            c['playername'] = names[i]
            c['time'] = str(times[i][j].date()) + "\n" + str(times[i][j].time())
            c['icons'] = '/assets/icons/' + icons[-2] + "/" + icons[-1].replace("tex","png")

        a.append(b)
    return custom_response(a, 200)


@raid_api.route('/tracker', methods=['POST'])
def set_test():
    req_data = request.get_json()
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
    raid = RaidDropsModel.get_one(data)
    if raid:
        raid.update(data)
    else:
        raiddrop.save()
    return ('', 204)

def custom_response(res, status_code):
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
