from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework.status import HTTP_200_OK,HTTP_400_BAD_REQUEST
from rest_framework.response import Response
from instatoolbox.api.Helpers.SessionUtility import login,GetSession
import requests
from instatoolbox.api.Helpers.Strings import insta_headers

class Proxy(APIView):
    def get(self,request,pk):
        fullpath=request.get_full_path()
        url=fullpath.split('proxy/')[1]
        try:
            csrftoken,sessionid=GetSession()
            cookies={'csrftoken':csrftoken,'sessionid':sessionid}
            insta_headers['X-CSRFToken']=csrftoken
            res=requests.get(url,headers=insta_headers,cookies=cookies)
            if res.status_code == 200:
                    content_type = res.headers.get('content-type')
                    response_headers = {
                        'Content-Type': content_type,
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers':'*'
                    }
                    #return HttpResponse(res.iter_content(chunk_size=1024), headers=response_headers, status=HTTP_200_OK)
                    return HttpResponse(res.content, headers=response_headers, status=HTTP_200_OK)
            return Response({'error':"Failed to retrieve the media from Instagram"},status=HTTP_400_BAD_REQUEST)
        except Exception as e:
               if (type(e).__name__=='TooManyRedirects'):
                   login()
               error_details = {
                     "error_type": type(e).__name__,
                     "error_message": str(e)
                     }
               return Response({"error": error_details},status=HTTP_400_BAD_REQUEST)
        