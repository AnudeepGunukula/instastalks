
from instatoolbox.api.Helpers.SessionUtility import GetSession
from instatoolbox.api.Models.Models import User,Post
from instatoolbox.api.Helpers.Strings import baseurl,profilepathurl,insta_headers
import requests

def ParseUserEdgePosts(edges):
         userposts=[]
         for edge in edges:
                node=edge['node']
                posttype=node['__typename']
                if posttype=='GraphVideo':
                      videosrc=node['video_url']
                else:
                      videosrc=''
                postparenturl=node['display_url']
                if len(node['edge_media_to_caption']['edges'])!=0:
                      posttext=node['edge_media_to_caption']['edges'][0]['node']['text']
                else:
                      posttext=''
                postcomments=node['edge_media_to_comment']['count']
                if 'edge_liked_by' in node.keys():
                     postlikes=node['edge_liked_by']['count']
                else:
                    postlikes=node['edge_media_preview_like']['count']
                ispinned=len(node['pinned_for_users'])>=1
                postchildurls=[]
                if posttype=='GraphSidecar':
                    postchildedges=node['edge_sidecar_to_children']['edges']
                    
                    for child in postchildedges:
                        childobj={'url':child['node']['display_url'],'isvideo':False}
                        if child['node']['is_video']:
                              childobj['isvideo']=True
                              childobj['url']=child['node']['video_url']
                        postchildurls.append(childobj)
                
                post=Post(videosrc=videosrc,posttype=posttype,postparenturl=postparenturl,posttext=posttext,postcomments=postcomments,postlikes=postlikes,ispinned=ispinned,postchildurls=postchildurls)
                userposts.append(post)
         return userposts


def ParseUserAndPosts(profilejson):
         userid=profilejson['data']['user']['id']
         username=profilejson['data']['user']['username']
         fullname=profilejson['data']['user']['full_name']
         biography=profilejson['data']['user']['biography']
         postscount=profilejson['data']['user']['edge_owner_to_timeline_media']['count']
         profile_picurl=profilejson['data']['user']['profile_pic_url_hd']
         followingcount=profilejson['data']['user']['edge_follow']['count']
         followedby=profilejson['data']['user']['edge_followed_by']['count']
         endcursor=profilejson['data']['user']['edge_owner_to_timeline_media']['page_info']['end_cursor']

         
         edges=profilejson['data']['user']['edge_owner_to_timeline_media']['edges']
         userposts=ParseUserEdgePosts(edges)
         
         user=User(userid=userid,username=username,fullname=fullname,biography=biography,followedby=followedby,postscount=postscount,profile_picurl=profile_picurl,followingcount=followingcount,endcursor=endcursor,posts=userposts)
         instauserdata=user.to_dict()
         return instauserdata

def GetUserProfile(username):
       url=baseurl+profilepathurl+username
       csrftoken,sessionid=GetSession()
       cookies={'csrftoken':csrftoken,'sessionid':sessionid}
       insta_headers['X-CSRFToken']=csrftoken
       re=requests.get(url,headers=insta_headers,cookies=cookies)
       return re