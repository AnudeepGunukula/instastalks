from rest_framework.views import APIView
from instatoolbox.api.Helpers.SessionUtility import login
from instatoolbox.api.Helpers.StoriesUtility import GetStoriesFromRes, GetUserStories
import json
from rest_framework.response import Response
from rest_framework import status

class Story(APIView):
    def post(self,request,pk):
        try:
            userid=request.data['userid']
            res=GetUserStories(userid)
            res=json.loads(res.text)
            res={'username':pk,'userid':userid,'stories':GetStoriesFromRes(res)}
            return Response(res,status=status.HTTP_200_OK)
        except Exception as e:
               if (type(e).__name__=='TooManyRedirects'):
                    login()
               error_details = {
                     "error_type": type(e).__name__,
                     "error_message": str(e)
                     }
               return Response({"error": error_details},status=status.HTTP_400_BAD_REQUEST)
        


