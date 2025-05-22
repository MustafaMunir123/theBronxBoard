from django.urls import path
from .views import NewsAPIView, news_page

urlpatterns = [
    path('api/', NewsAPIView.as_view(), name='news-api'), 
    path('page/', news_page, name='news-page'),
]
