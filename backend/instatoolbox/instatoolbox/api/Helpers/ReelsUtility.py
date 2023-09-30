from instatoolbox.api.Models.Models import User,Post,Reel
from instatoolbox.api.Helpers.Strings import baseurl,reelsurl,insta_headers
from instatoolbox.api.Helpers.SessionUtility import GetSession
import json,requests


def GetReelsForProfile(username,reqbody):
       url= baseurl+reelsurl
       targetId=reqbody['userid']
       jbody={
            'include_feed_video':'true',
            'page_size':'12',
            'target_user_id':targetId
            }
       if  'max_id' in reqbody.keys():
            jbody['max_id']=reqbody['max_id']
       csrftoken,sessionid=GetSession()
       cookies={'csrftoken':csrftoken,'sessionid':sessionid}
       insta_headers['X-CSRFToken']=csrftoken
       response=requests.post(url,data=jbody,headers=insta_headers,cookies=cookies).text
       reelbody=json.loads(response)
       if 'max_id' in reelbody['paging_info']:
           endcursor=reelbody['paging_info']['max_id']
       else:
            endcursor=''
       reels=reelbody['items']
       reelsObjs=[]
       for reel in reels:
             media=reel['media']
             if 'caption' in media.keys() and media['caption']!=None:
                      reel_caption=media['caption']['text']
             else:
                   reel_caption=''
             reel_thumbnail=media['image_versions2']['candidates'][0]['url']
             reel_src=media['video_versions'][0]['url']
             reel_code=media['code']
             reel_likes=media['like_count']
             if 'play_count' in media.keys():
                reel_plays=media['play_count']
             else:
                reel_plays='0'
             reel=Reel(reel_caption=reel_caption,reel_thumbnail=reel_thumbnail,reel_src=reel_src,reel_code=reel_code,reel_likes=reel_likes,reel_plays=reel_plays)
             reelsObjs.append(reel.to_dict())
      
       jsonresbody={
             'endcursor':endcursor,
             'reels':reelsObjs
       }
       return jsonresbody