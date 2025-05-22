from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .fetch_news_service import fetch_news
from django.shortcuts import render

class NewsAPIView(APIView):
    def get(self, request):
        try:
            news_data = fetch_news()
            return Response(news_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
def news_page(request):
    try:
        news_data = fetch_news()
    except Exception as e:
        news_data = []
    return render(request, 'news/news_template.html', {'news': news_data})
