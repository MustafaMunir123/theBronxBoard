from django.urls import path
from apps.news.views import NewsAPIView

urlpatterns = [
    path('email', NewsAPIView.as_view(), name='news-api'), 
]
