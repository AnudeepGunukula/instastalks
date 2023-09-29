from rest_framework.views import APIView
from instatoolbox.api.Helpers.SessionUtility import login
from rest_framework.response import Response
from rest_framework import status
class Login(APIView):
    def get(self,request):
        response=login()
        return Response(response,status=status.HTTP_200_OK)