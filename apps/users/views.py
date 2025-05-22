from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.forms.models import model_to_dict

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