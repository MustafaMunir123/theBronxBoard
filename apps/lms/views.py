# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Course, EnrolledCourse
from apps.users.models import BaseUserModel
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


class EnrollStudentInCourse(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        learning_path_title = request.data.get('learning_path_title')

        if not learning_path_title:
            return Response({
                "success": False,
                "message": "Missing required field: learning_path_title."
            }, status=status.HTTP_400_BAD_REQUEST)

        student = request.user

        if not student:
            return Response({
                "success": False,
                "message": "Student does not exist."
            }, status=status.HTTP_400_BAD_REQUEST)

        if getattr(student, "type", None) != "student":
            return Response({
                "success": False,
                "message": "User is not a student."
            }, status=status.HTTP_403_FORBIDDEN)

        courses = Course.objects.filter(learning_path_title=learning_path_title)

        if not courses.exists():
            return Response({
                "success": False,
                "message": "No courses found for the given title."
            }, status=status.HTTP_404_NOT_FOUND)

        already_enrolled = EnrolledCourse.objects.filter(
            course__in=courses,
            student=student
        ).exists()

        if already_enrolled:
            return Response({
                "success": False,
                "message": "Student already enrolled in one or more courses for this title."
            }, status=status.HTTP_409_CONFLICT)

        for course in courses:
            EnrolledCourse.objects.create(
                course=course,
                student=student,
                completed=False
            )

        return Response({
            "success": True,
            "message": "Enrolled successfully in all matched courses.",
            "student_id": str(student.id),
            "learning_path_title": learning_path_title
        }, status=status.HTTP_201_CREATED)
        
        
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.forms.models import model_to_dict

from apps.lms.models import Course, EnrolledCourse


class GetStudentEnrollments(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        student = request.user

        if getattr(student, "type", None) != "student":
            return Response({
                "success": False,
                "message": "User is not a student."
            }, status=status.HTTP_403_FORBIDDEN)

        enrollments = []

        courses = Course.objects.all()
        course_dict = {}
        for course in courses:
            if course.learning_path_title not in course_dict:
                course_dict[course.learning_path_title] = course

        for course in course_dict.values():
            if EnrolledCourse.objects.filter(course=course, student=student).exists():
                enrollments.append({
                    "id": str(course.id),
                    "learning_path_title": course.learning_path_title,
                    "content_title": course.content_title,
                    "content": course.content,
                    "reference": course.reference,
                    "serial_number": course.serial_number
                })

        return Response({
            "success": True,
            "message": "Student enrolled courses fetched successfully.",
            "enrollments": enrollments
        }, status=status.HTTP_200_OK)
     
        
class GetCourseCatalog(APIView):
    def post(self, request):
        student = request.user
        
        if getattr(student, "type", None) != "student":
            return Response({
                "success": False,
                "message": "User is not a student."
            }, status=status.HTTP_403_FORBIDDEN)
            
        learning_path_title = request.data.get('learning_path_title')

        if not learning_path_title:
            return Response({
                "success": False,
                "message": "Missing required field: learning_path_title."
            }, status=status.HTTP_400_BAD_REQUEST)

        course = Course.objects.filter(learning_path_title=learning_path_title)
        complete_catalog = []
        for content in course:
            course_content = EnrolledCourse.objects.filter(student=student, course=content).first()
            
            if content.serial_number == 1 and not course_content.enabled:
                course_content.enabled=True
                course_content.save()
                
            complete_catalog.append(
                {
                    "serial_number": content.serial_number,
                    "id": course_content.id,
                    "title": content.content_title,
                    "enabled": course_content.enabled
                }
            )
        return Response({
            "success": True,
            "message": f"Course: {learning_path_title}",
            "enrollments": complete_catalog
        }, status=status.HTTP_200_OK)
            
            
            
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404
from .models import EnrolledCourse


class EnrolledCourseDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        student = request.user

        try:
            content = EnrolledCourse.objects.get(id=id, student=student)
        except EnrolledCourse.DoesNotExist:
            return Response({
                "success": False,
                "message": "content not found or not accessible."
            }, status=status.HTTP_404_NOT_FOUND)

        data = {
            "id": str(content.id),
            "course_id": str(content.course.id),
            "student_id": str(content.student.id),
            "completed": content.completed,
            "enabled": getattr(content, "enabled", None),
            "title": content.course.content_title,
            "content": content.course.content,
            "reference": content.course.reference
        }

        return Response({
            "success": True,
            "message": "Enrollment retrieved successfully.",
            "data": data
        }, status=status.HTTP_200_OK)

    def patch(self, request, id):
        student = request.user

        try:
            content = EnrolledCourse.objects.get(id=id, student=student)
        except EnrolledCourse.DoesNotExist:
            return Response({
                "success": False,
                "message": "Content not found or not accessible."
            }, status=status.HTTP_404_NOT_FOUND)

        completed = request.data.get("completed")

        if completed is not None:
            content.completed = bool(completed)
        content.save()
        
        next_material = Course.objects.filter(learning_path_title=content.course.learning_path_title, serial_number=content.course.serial_number + 1)
        if next_material:
            next_content = EnrolledCourse.objects.get(course=next_material.first())
            next_content.enabled = True
            next_content.save()

        return Response({
            "success": True,
            "message": "Marked as read",
        }, status=status.HTTP_200_OK)