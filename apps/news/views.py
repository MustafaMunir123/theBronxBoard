from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.news.news_service import generate_lessons_from_news
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from apps.utility import send_html_email
from apps.users.models import BaseUserModel
from django.conf import settings
class NewsAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            news_content,fetched_news = generate_lessons_from_news()
            context = {
                "title": fetched_news['title'],
                "subject": fetched_news['title'],
                "description": fetched_news['description'],
                "lesson": news_content['lesson'],
                "url": fetched_news['url'],
                "image_url": fetched_news['image_url'],
            }
            print(fetched_news,news_content)
            #TODO: email service
            print(BaseUserModel.objects.filter(type='student').values_list('email', flat=True))
            to_email = ['hamzabinrashid32@gmail.com']#list(BaseUserModel.objects.filter(type='student').values_list('email', flat=True))
            send_html_email(to_email,'news/news_lesson.html',context)
            return Response({"success": True, "message": "Email sent"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
