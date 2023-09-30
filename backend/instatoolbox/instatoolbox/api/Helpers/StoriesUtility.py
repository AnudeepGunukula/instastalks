from instatoolbox.api.Helpers.SessionUtility import GetSession
from instatoolbox.api.Helpers.Strings import stories_url,insta_headers
import requests

def GetUserStories(userid):

    url=stories_url
    url+=userid
    csrftoken,sessionid=GetSession()
    cookies={'csrftoken':csrftoken,'sessionid':sessionid}
    insta_headers['X-CSRFToken']=csrftoken
    re=requests.get(url,headers=insta_headers,cookies=cookies)

    return re


def GetStoriesFromRes(res):
       stories_src=[]
       if len(res['reels_media'])>0:
            stories=res['reels_media'][0]['items']  
            for story in stories:
                    if 'video_versions' in story.keys():
                            stories_src.append({'type':'video','src':story['video_versions'][0]['url']})
                    else:
                        stories_src.append({'type':'image','src':story['image_versions2']['candidates'][0]['url']})
       return stories_src
