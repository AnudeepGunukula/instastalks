from urllib.parse import quote
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from instatoolbox.api.Helpers.Strings import baseurl,graphqlpath,insta_headers
from instatoolbox.api.Helpers.SessionUtility import login,GetSession
from instatoolbox.api.Helpers.UserUtility import GetUserProfile
from instatoolbox.api.Helpers.UserUtility import ParseUserAndPosts, ParseUserEdgePosts
import json

class User(APIView):

    def get(self,request,pk):
        try:
            res=GetUserProfile(pk)
            profilejson=json.loads(res.text)
            instauserdata=ParseUserAndPosts(profilejson)
            return Response(instauserdata,status=status.HTTP_200_OK)
        except Exception as e:
               if (type(e).__name__=='TooManyRedirects'):
                    login()
               error_details = {
                     "error_type": type(e).__name__,
                     "error_message": str(e)
                     }
               return Response({"error": error_details},status=status.HTTP_400_BAD_REQUEST)
        
        

    def post(self,request,pk):
            try:
                userid=request.data['userid']
                after=request.data['after']
                first=12
                variables='{'+f'"id":"{userid}","after":"{after}","first":{first}'+'}'
                variables=quote(variables)
                
                url=baseurl+graphqlpath+variables
                session=GetSession()
                re=session.get(url,headers=insta_headers)
                profilejson=json.loads(re.text)
                edges=profilejson['data']['user']['edge_owner_to_timeline_media']['edges']
                endcursor=profilejson['data']['user']['edge_owner_to_timeline_media']['page_info']['end_cursor']
                userposts=ParseUserEdgePosts(edges)
                userpostjson=[post.to_dict() for post in userposts]
                user_posts_json={'after':endcursor,'posts':userpostjson}
                return Response(user_posts_json,status=status.HTTP_200_OK)
            except Exception as e:
               if (type(e).__name__=='TooManyRedirects'):
                    login()
               error_details = {
                     "error_type": type(e).__name__,
                     "error_message": str(e)
                     }
               return Response({"error": error_details},status=status.HTTP_400_BAD_REQUEST)
        
