import time
import os
from flask import request,json,Response,jsonify,Blueprint,redirect,session,url_for
from requests_oauthlib import OAuth2Session
from ..models.UserDataModel import UserDataModel, UserDataSchema

auth_api = Blueprint('auth',__name__)

@auth_api.route('/auth-url/<string:provider>', methods=['GET'])
def authRoute(provider):
    if provider == 'discord':
        scope = request.args.get('scope')
        state = request.args.get('state')
        discord = make_session(scope=scope.split(' '), state=state)
        authUrl, state = discord.authorization_url(os.environ['DISCORD.AUTHORIZATION_BASE_URL'])
        session['oauth2_state'] = state
        return custom_response(authUrl, 200)


@auth_api.route('/callback/', methods=['GET'])
def authFromCode():
    if request.values.get('error'):
        return request.values['error']
    discord = make_session(state=session.get('oauth2_state'))
    token = discord.fetch_token(
        os.environ['DISCORD.TOKEN_URL'],
        client_secret = os.environ['DISCORD.CLIENT_SECRET'],
        authorization_response = request.url
    )
    session['oauth2_token'] = token
    session['code'] = request.values['code']
    discord = make_session(token=session.get('oauth2_token'))
    user = discord.get(os.environ['DISCORD.API_BASE'] + '/users/@me').json()
    exists = UserDataModel.get_raid_tracker(user['username'])
    user['userid'] = user['id']
    user['pwhash'] = session.get('code')
    user['refresh'] = session.get('oauth2_token')['refresh_token']
    user['expires'] = session.get('oauth2_token')['expires_at']
    if exists:
        exists.update(user)
    else:
        newUser = UserDataModel(user)
        newUser.save()
    return custom_response({'callback': 'success'}, 200)


@auth_api.route('/whoami/', methods=['GET'])
def whoami():
    if not request.args.get('code'):
        return custom_response({"error": 'Not logged in'}, 400)
    user = UserDataModel.get_by_token(request.args.get('code'))
    if not user:
        return ({'error': 'does not exist'}, 400)
    ser_data = {"user":
    user.username, "raidname": user.raidname,"raidid": user.raidid}
    return custom_response(ser_data, 201)


def custom_response(res, status_code):
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )


def token_updater(token):
    session['oauth2_token'] = token

def make_session(token=None, state=None, scope=None):
    return OAuth2Session(
        client_id = os.environ['DISCORD.CLIENT_ID'],
        token=token,
        state=state,
        scope=scope,
        redirect_uri=os.environ['DISCORD.REDIRECT_URI'],
        auto_refresh_kwargs = {
            'client_id': os.environ['DISCORD.CLIENT_ID'],
            'client_secret': os.environ['DISCORD.CLIENT_SECRET'],
        },
        auto_refresh_url = os.environ['DISCORD.TOKEN_URL'],
        token_updater = token_updater
    )




{'access_token': 'rT8fn88GLe3FOsGH2OmlgAHjrpBz3o', 'refresh_token': 'MtoHNypHPdUvvxN1sXFTYGsGJkc8mz', 'expires_at': 1582296772.2955606}
{'access_token': 'rT8fn88GLe3FOsGH2OmlgAHjrpBz3o', 'expires_in': 604800, 'refresh_token': 'MtoHNypHPdUvvxN1sXFTYGsGJkc8mz', 'scope': ['identify', 'email'], 'token_type': 'Bearer', 'expires_at': 1582297526.533171}
{'access_token': 'rT8fn88GLe3FOsGH2OmlgAHjrpBz3o', 'expires_in': 604800, 'refresh_token': 'MtoHNypHPdUvvxN1sXFTYGsGJkc8mz', 'scope': ['identify', 'email'], 'token_type': 'Bearer', 'expires_at': 1582297526.533171}
