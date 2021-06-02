from flask import request,json,Response,Blueprint,jsonify,request
from ..shared.Authentication import Auth
from ..models.RaidDropsModel import RaidDropsModel, RaidDropsSchema
from ..models.UserDataModel import UserDataModel, UserDataSchema
from ..models.RaidDropsModel import RaidTrackerModel, RaidTrackerSchema
from ..models.RaidCalendarModel import RaidCalendarModel, RaidCalendarSchema
from ..models.DiscordGuildModel import DiscordGuildModel, DiscordGuildSchema
import datetime
import time
from hashids import Hashids
from random import random
import calendar

weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
calendar.setfirstweekday(calendar.SUNDAY)

raid_api = Blueprint('raid',__name__)
raid_schema = RaidDropsSchema()
user_schema = UserDataSchema()
calendar_schema = RaidCalendarSchema()
guild_schema = DiscordGuildSchema()

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
    pw = int(random()* 100000000)
    data['raidname'] = [request.values.get('name')]
    data['raidid'] = [hashid.encode(l)]
    user.update(data)
    data['raidtype'] = request.values.get('type')
    data['trackerpw'] = [hashid.encode(pw)]
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
    data['userid'] = user.userid
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


@raid_api.route('/', methods=['GET'])
def get_raid():
    print(request.values.get('code'))
    exists = RaidTrackerModel.get_tracker(request.values.get('id'))
    if not exists:
        return custom_response({'raidfound': 0}, 200)
    raid = RaidDropsModel.get_by_player(exists.trackerpw)
    ser_data = raid_schema.dump(raid, many=True)
    user = UserDataModel.get_by_token(request.values.get('code'))
    a = {'raidfound': 1}
    a['raidname'] = exists.raidname.lstrip("{").rstrip("}").strip('""')
    if user and user.userid == exists.userid:
        a['trackerpw'] = exists.trackerpw
    else:
        a['trackerpw'] = None
    if exists.raidtype:
        a['raidtype'] = exists.raidtype
    else:
        a['raidtype'] = "0"
    if not ser_data:
        a['players'] = None
        return custom_response(a, 200)

    names = [x['playername'] for x in ser_data]
    times = [x['time'] for x in ser_data]
    times = [*map(eval,times)]
    print("times", times[0][0].strftime('%Y/%m/%d %I:%M %p'))
    keys = ser_data[0].keys()
    a['players'] = []
    for i,data in enumerate(ser_data):
        b = [dict(zip(keys, vals)) for vals in zip(*(data[k] for k in keys))]
        for j,c in enumerate(b):
            icons = c['icons'].split("/")
            c['playername'] = names[i]
            c['time'] = times[i][j].strftime('%Y/%m/%d %I:%M %p')
            c['icons'] = '/assets/icons/' + icons[-2] + "/" + icons[-1].replace("tex","png")

        a['players'].append(b)

    return custom_response(a, 200)


@raid_api.route('/tracker', methods=['POST'])
def set_test():
    req_data = request.get_json(force=True)
    print("JSON",req_data)
    if 'data' in req_data:
        data = {}
        data['name'] = req_data['data']['playername']
        data['itemid'] = req_data['data']['id']
        data['itemquantity'] = req_data['data']['amount']
        data['playerid'] = req_data['data']['trackerpw']
        data['view'] = True
        data['classjob'] = req_data['data']['classjob']
        data['time'] = datetime.datetime.strptime(
                    req_data['data']['date'].split(".")[0], "%Y-%m-%dT%H:%M:%S")
    else:
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
        data['view'] = True

    raiddrop = RaidDropsModel(data)
    raid = RaidDropsModel.get_one(data)
    if raid and raid.view:
        raid.update(data)
    else:
        raiddrop.save()
    return ({'Raid_updated': True}, 200)

@raid_api.route('/removeRows', methods=['POST'])
def remove_rows():
    data = request.get_json(force=True)['rows']
    rows = data['rows']
    userid = data['data']['user'].split("=")[1].split("&")[0]
    user = UserDataModel.get_by_token(userid)
    if not user:
        return ('no user', 404)

    reqdata = {}
    reqdata['name'] = data['data']['name']
    reqdata['playerid'] = data['data']['pw']
    for row in rows:
        reqdata['itemid'] = row['id']
        raiddrop = RaidDropsModel.get_one(reqdata)
        print("got raiddrop", raiddrop)
        raiddrop.updateView(reqdata, False)
    return ('', 204)


@raid_api.route('/addToSchedule', methods=['POST'])
def add_schedule():
    req_data = request.get_json(force=True)['data']
    print(req_data)
    data = {}
    userid = req_data['user'].split("=")[1].split("&")[0]
    user = UserDataModel.get_by_token(userid)
    data['userid'] = user.userid
    data['raidid'] = req_data['raidid']
    data['guildid'] = req_data['guildid']
    #data['owner'] = req_data['owner']
    data['owner'] = ""
    data['day'] = (time.strptime(req_data['day'], "%A").tm_wday)
    data['starttime'] = req_data['start']
    print(req_data['start'])
    data['endtime'] = req_data['end']
    #data['isstandard'] = req_data['isstandard']
    data['isstandard'] = True

    raidCalendar = RaidCalendarModel(data)
    raidCalendar.save()
    return custom_response({'Added': True}, 200)

@raid_api.route('/removeCalendarRows', methods=['POST'])
def remove_calendar_rows():
    req_data = request.get_json(force=True)
    print("GOT DATA", req_data)
    rows = req_data['rows']['rows']
    print("GOT DATA", rows)

    userid = req_data['rows']['data']['user'].split("=")[1].split("&")[0]
    user = UserDataModel.get_by_token(userid)
    if not user:
        return ('no user', 404)

    data = {}
    data['raidid'] = req_data['rows']['data']['raidid']

    for row in rows:
        data['day'] = row['day']
        data['starttime'] = row['start']
        data['endtime'] = row['end']
        scheduledrop = RaidCalendarModel.get_one(data)
    #   ADD CHECK FOR OWNER BEFORE DELETING
    #    if not data['owner'] in scheduledrop['owner']:
    #        return ('No permission to delete', 400)
        scheduledrop.delete()
    #return ('deleted', 200)
    return custom_response({'deleted': True}, 200)


@raid_api.route('/updateSchedule', methods=['POST'])
def update_schedule():
    data = request.get_json(force=True)

    raidid = data['raidid']
    if not raidid:
        return ('no RaidId', 404)

    guild = DiscordGuildModel.get_voice_channel(data['guildid'])
    print("Guild ID",data['guildid'])
    if guild is not None:
        print("Got guild", guild.guildid)
        print("setting voice", data['voicechannel'])
        guild.update({'voicechannel': data['voicechannel']})
    else:
        guild = DiscordGuildModel(data)
        guild.save()

    schedule = RaidCalendarModel.get_schedule(raidid)

    if not schedule:
        return ('No raid Found', 404)

    for s in schedule:
        s.update_schedule(data)

    return ('Calendar created Successfully.', 200)


@raid_api.route('/getSchedule', methods=['GET'])
def retreive_schedule():
    if not request.values.get('guildid'):
        if not request.values.get('raidid'):
            return custom_response({'No guild or raid ID': True}, 400)

        raid = RaidTrackerModel.get_tracker(request.values.get('raidid'))
        res = []
        raidname = raid.raidname.lstrip("{").rstrip("}").strip('""')
        data = RaidCalendarModel.get_schedule(request.values.get('raidid'))
        if len(data) > 0:
            guildid = data[0].guildid
        else:
            guildid = ""
        for d in data:
            print("GET THIS MANY", d.day)
            t = {}
            t['day'] = calendar.day_name[d.day]
            t['start'] = d.starttime.__str__()
            t['end'] = d.endtime.__str__()
            t['id'] = d.id
            res.append(t)
        res.sort(key=lambda item: weekdays.index(item['day']))

        return custom_response({'guildid': guildid, 'raidname': raidname, 'schedule': res}, 200)

    res = []
    data = RaidCalendarModel.get_schedule_by_guildid(request.values.get('guildid'))
    if(len(data) > 0):
        raidid = data[0].raidid
    else:
        raidid = ""
    for d in data:
        t = {}
        t['day'] = calendar.day_name[d.day]
        t['start'] = d.starttime.__str__()
        t['end'] = d.endtime.__str__()
        t['id'] = d.id
        res.append(t)
    res.sort(key=lambda item: weekdays.index(item['day']))

    return custom_response({'raidid': raidid, 'schedule': res}, 200)



@raid_api.route('/schedule', methods=['GET'])
def get_schedule():
    if not request.values.get('guildid'):
        return custom_response({'No guild ID': True}, 400)

    voicechannel = DiscordGuildModel.get_voice_channel(request.values.get('guildid'))
    #print("Voice channel", voicechannel.voicechannel)
    if not voicechannel:
        return custom_response({'No Voice': True}, 204)

    print("GOT HERE")
    today = datetime.datetime.today().isoweekday()
    now = datetime.datetime.now().time()
    first = None
    last = None
    data = RaidCalendarModel.get_schedule_by_guildid(request.values.get('guildid'))
    response = {}

    if not data:
        return custom_response({'No Raids Added': True}, 204)

    for d in data:
        print("looking at", d.day)
        if today - d.day > 0:
            days = 7 - (today - d.day)
        else:
            days = -(today - d.day)

        date = datetime.date.today() + datetime.timedelta(days=days)

        d.dtime = datetime.datetime.combine(date, d.starttime)

        if first == None or d.dtime < first.dtime:
            if date == datetime.datetime.today().date() and d.starttime < datetime.datetime.today().time():
                if d.endtime <= datetime.datetime.today().time():
                    continue
            first = d


    response['starttime'] = first.starttime.__str__()
    response['endtime'] = first.endtime.__str__()
    response['day'] = first.day
    response['voicechannel'] = voicechannel.voicechannel

    return custom_response(response, 200)


def custom_response(res, status_code):
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
