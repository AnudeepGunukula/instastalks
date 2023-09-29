import requests
from instatoolbox.api.Helpers.Strings import insta_headers,login_url
import pickle
import time
from decouple import config
import json

def login(need='normal'):
    status=''
    try:
        session=requests.session()
        res=session.get('https://www.instagram.com/api/v1/public/landing_info/',headers=insta_headers)
        csrftoken=res.cookies.get('csrftoken')
        headers=insta_headers
        headers['X-CSRFToken']=csrftoken
        data = {
            'enc_password': config('PASSWORD'),
            'optIntoOneTap': 'false',
            'queryParams': '{}',
            'trustedDeviceRecords': '{}',
            'username': config('USERNAME'),
        }
        response = session.post(login_url, headers=insta_headers, data=data)
        headers['X-CSRFToken']=response.cookies.get('csrftoken')
        resbody=json.loads(response.text)
        if 'userId' in resbody.keys():
              session.headers.update(headers)
              with open("session.pkl", "wb") as f:
                pickle.dump(session, f)
        status='pass'
    except Exception as e:
        print(type(e).__name__)
        print(str(e))
        status='fail'
        return {'status':status}
    if need=='normal':
        return {'status':'pass','resbody':resbody.keys()}
    return session

def GetSession():
    try:
        with open('session.pkl', 'rb') as f:
           session = pickle.load(f)
        return session
    except FileNotFoundError:
        return login(need='session')

