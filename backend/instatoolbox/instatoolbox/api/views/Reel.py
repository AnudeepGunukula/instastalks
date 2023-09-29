from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from instatoolbox.api.Helpers.ReelsUtility import GetReelsForProfile
from instatoolbox.api.Helpers.SessionUtility import login

class Reel(APIView):
    def post(self,request,pk):
        try:
            jsonresbody=GetReelsForProfile(username=pk,reqbody=request.data)
            return Response(jsonresbody,status=status.HTTP_200_OK)
        except Exception as e:
               if (type(e).__name__=='TooManyRedirects'):
                    login()
               error_details = {
                     "error_type": type(e).__name__,
                     "error_message": str(e)
                     }
               return Response({"error": error_details},status=status.HTTP_400_BAD_REQUEST)