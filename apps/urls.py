from django.urls import path, include
from apps.users import urls as USER_URLS
from apps.news import urls as NEWS_URLS
from apps.lms import urls as LMS_URLS

urlpatterns = [
    path('users/', include(USER_URLS)),
    path('news/', include(NEWS_URLS)),
    path('lms/', include(LMS_URLS))
]