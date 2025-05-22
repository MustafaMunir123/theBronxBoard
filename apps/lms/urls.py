# urls.py
from django.urls import path
from apps.lms.views import (
    EnrollStudentInCourse,
    GetStudentEnrollments
)

urlpatterns = [
    path('enroll', EnrollStudentInCourse.as_view()),
    path('enrollments', GetStudentEnrollments.as_view())
]
