# urls.py
from django.urls import path
from apps.lms.views import (
    EnrollStudentInCourse,
    GetStudentEnrollments,
    GetCourseCatalog,
    EnrolledCourseDetailView,
    ListResources,
    GenerateQuiz
)

urlpatterns = [
    path('enroll', EnrollStudentInCourse.as_view()),
    path('enrollments', GetStudentEnrollments.as_view()),
    path('catalog', GetCourseCatalog.as_view()),
    path('content/<uuid:id>', EnrolledCourseDetailView.as_view()),
    path('resource/<str:type>', ListResources.as_view()),
    path('quiz/generate', GenerateQuiz.as_view())
]
