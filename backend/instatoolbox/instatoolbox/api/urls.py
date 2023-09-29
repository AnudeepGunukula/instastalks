
from django.urls import path
from instatoolbox.api.views.User import User
from instatoolbox.api.views.Reel import Reel
from instatoolbox.api.views.Story import Story
from instatoolbox.api.views.Proxy import Proxy
from instatoolbox.api.views.Search import Search
from instatoolbox.api.views.Login import Login
urlpatterns = [
    path('<str:pk>',User.as_view(),name='user-list'),
    path('<str:pk>',User.as_view(),name='post-list'),
    path('reels/<str:pk>',Reel.as_view(),name='reels-list'),
    path('story/<str:pk>',Story.as_view(),name='story-list'),
    path('proxy/<path:pk>',Proxy.as_view(),name='proxy-detail'),
    path('search/<str:pk>',Search.as_view(),name='search-list'),
    path('login/',Login.as_view(),name='login-detail')
]
