from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from apps.users.serializers import RegisterSerializer
from apps.users.models import BaseUserModel
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.forms.models import model_to_dict
from django.contrib.auth.hashers import make_password


from apps.utility import generate_random_password

class SignUpView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'success': True,
                'message': 'User registered successfully.',
                'token': token.key
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            'success': False,
            'message': 'Registration failed.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class SignInView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user:
            user_data = model_to_dict(user)
            user_data.pop("password")
            user_data.pop("groups")
            user_data.pop("user_permissions")
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'success': True,
                'message': 'Login successful.',
                'token': token.key,
                **user_data
            }, status=status.HTTP_200_OK)

        return Response({
            'success': False,
            'message': 'Invalid credentials.'
        }, status=status.HTTP_401_UNAUTHORIZED)



class GetUserDetails(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_data = model_to_dict(user)
        user_data.pop("password")
        user_data.pop("groups")
        user_data.pop("user_permissions")

        return Response({
            "success": True,
            "message": "User details retrieved successfully.",
            **user_data
        }, status=status.HTTP_200_OK)
        
class InviteStudent(APIView):
    def post(self, request):
        teacher = request.user
        emails = request.data.get("emails", "")

        if getattr(teacher, "type", None) != "teacher":
            return Response({
                "success": False,
                "message": "User is not a Teacher."
            }, status=status.HTTP_403_FORBIDDEN)

        if not emails:
            return Response({
                "success": False,
                "message": "Provide at least one student email."
            }, status=status.HTTP_400_BAD_REQUEST)

        emails_list = [email.strip() for email in emails.split(",")]
        
        invited_students = []
        skipped_emails = []
        
        for email in emails_list:
            if BaseUserModel.objects.filter(email=email).exists():
                skipped_emails.append(email)
                continue
            
            password = generate_random_password()
            student = BaseUserModel(
                email=email,
                type="student",
                invited_by=teacher.email,
                password=make_password(password),
                username=email.split("@")[0]
            )
            student.save()  # Save to DB

            invited_students.append({
                "email": student.email,
                "username": student.username,
                "password": password
            })
            
            # TODO: Send email invite
            # send_invite_email(invited_students)

        return Response({
            'success': True,
            'message': 'Invitations sent successfully.',
            'invited': invited_students,
            'skipped': skipped_emails
        }, status=status.HTTP_200_OK)
        
        
class GetAllStudents(APIView):
    def get(self, request):
        teacher = request.user
        
        if getattr(teacher, "type", None) != "teacher":
            return Response({
                "success": False,
                "message": "User is not a Teacher."
            }, status=status.HTTP_403_FORBIDDEN)

        students = BaseUserModel.objects.filter(type="student", invited_by=teacher.email)
        students_data = [model_to_dict(student) for student in students]
        
        return Response({
            "success": True,
            "message": "Students fetched successfully.",
            "students": students_data
        }, status=status.HTTP_200_OK)