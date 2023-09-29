from instatoolbox.api.Helpers.SessionUtility import GetSession,login
from instatoolbox.api.Helpers.Strings import search_url
from instatoolbox.api.Helpers.Strings import insta_headers
import json
import requests

def GetSearchRes(searchuser):
   session=GetSession()
   # csrftoken=session.cookies.get('csrftoken')
   # sessionid=session.cookies.get('sessionid')
   # cookies={'csrftoken':csrftoken,'sessionid':sessionid}
   url=search_url+f'?context=blended&query={searchuser}&rank_token=0.9508793744633366&include_reel=true'
   response=session.get(url)
   resbody=json.loads(response.text)
   return resbody
def search(searchuser):
   resbody=GetSearchRes(searchuser)
   if 'require_login' in resbody.keys():
      if resbody['require_login']:
         login()
         resbody=GetSearchRes(searchuser)
   searchlist=[]
   for user in resbody['users']:
        userdata={}
        userdata['fullname']=user['user']['full_name']
        userdata['isprivate']=user['user']['is_private']
        userdata['username']=user['user']['username']
        userdata['isverified']=user['user']['is_verified']
        userdata['profilepicurl']=user['user']['profile_pic_url']
        searchlist.append(userdata)
   return searchlist

   