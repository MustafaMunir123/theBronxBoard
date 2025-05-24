from django.urls import path
from apps.users.views import (
    SignInView,
    SignUpView,
    GetUserDetails,
    InviteStudent
)

urlpatterns = [
    path("login", SignInView.as_view()),
    path("signup", SignUpView.as_view()),
    path("details", GetUserDetails.as_view()),
    path("invite", InviteStudent.as_view())
]