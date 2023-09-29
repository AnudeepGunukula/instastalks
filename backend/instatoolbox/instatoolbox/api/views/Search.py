from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from instatoolbox.api.Helpers.SearchUtility import search
from instatoolbox.api.Helpers.SessionUtility import login
import time
class Search(APIView):
    def get(self,request,pk):
        try:
            userslist=search(pk)
            return Response(userslist,status=status.HTTP_200_OK)
        except Exception as e:
               error_details = {
                     "error_type": type(e).__name__,
                     "error_message": str(e)
                     }
               return Response({"error": error_details},status=status.HTTP_400_BAD_REQUEST)