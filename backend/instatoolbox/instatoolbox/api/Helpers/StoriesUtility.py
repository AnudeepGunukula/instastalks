from instatoolbox.api.Helpers.SessionUtility import GetSession
from instatoolbox.api.Helpers.Strings import stories_url

def GetUserStories(userid):

    url=stories_url
    url+=userid
    session=GetSession()
    res=session.get(url)

    return res


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
