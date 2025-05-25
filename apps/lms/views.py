# views.py
import random
import time
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.lms.models import (
    Course, 
    Quiz,
    EnrolledCourse, 
    Resourse,
    Result,
    QuizContent,
    LEARNING_PATHS_CHOICES
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from apps.ai_templates import (
    PREGNANCY_PREVENTION_QUESTIONS,
    LEGAL_LITERACY_CIVIC_EDUCATION_QUESTIONS,
    YOUTH_CRIME_GANG_PREVENTION_QUESTIONS,
    SCORE_PROMPT
)
from apps.ai_utility import get_ai_response
from django.forms.models import model_to_dict

from apps.users.models import BaseUserModel



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
        
        
class ListResources(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, type):

        if not type:
            return Response({
                "success": False,
                "message": "Missing required field in path: type."
            }, status=status.HTTP_400_BAD_REQUEST)
        
        resources = Resourse.objects.filter(type=type)
        data = []

        for res in resources:
            data.append({
                "id": str(res.id),
                "title": res.title,
                "description": res.description,
                "website": res.website,
                "type": res.get_type_display()  # human-readable version
            })

        return Response({
            "success": True,
            "message": "Resources fetched successfully.",
            "resources": data
        }, status=status.HTTP_200_OK)
        

class GenerateQuiz(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
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
        
        prompt = ""
        if learning_path_title == LEARNING_PATHS_CHOICES[0][0]:
            prompt = PREGNANCY_PREVENTION_QUESTIONS
        elif learning_path_title == LEARNING_PATHS_CHOICES[1][0]:
            prompt = YOUTH_CRIME_GANG_PREVENTION_QUESTIONS
        elif learning_path_title == LEARNING_PATHS_CHOICES[2][0]:
            prompt = LEGAL_LITERACY_CIVIC_EDUCATION_QUESTIONS
        else:
            return Response({
                "success": False,
                "message": "Course title is incorrect"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        attempt_number = Quiz.objects.filter(learning_path_title=learning_path_title, student=student).last().attempts
        quiz = Quiz(
                student=student,
                learning_path_title=learning_path_title,
                eligiblity=True,
                attempts=attempt_number + 1
            )
        quiz.save()

        retries = 3
        response = None
        last_exception = None

        while retries > 0 and response is None:
            try:
                response = get_ai_response(content=prompt)
                if len(response) < 12:
                    raise ValueError("0")
                print(len(response))
                break
            except Exception as ex:
                response = None
                print(f"Exception occurred: {ex}")
                last_exception = ex
                retries -= 1
                if retries > 0:
                    print("Retrying...")
                else:
                    print("All retries exhausted.")
                time.sleep(1)
        if response is None and last_exception:
            return Response({
                "success": False,
                "message": "Unable to generate quiz."
            }, status=status.HTTP_400_BAD_REQUEST)
        
        data = []
        serial_number = 1
        for generated_qna in response:
            qna = QuizContent(
                question = generated_qna["question"],
                actual_answer = generated_qna["answer"],
                student_answer = "",
                quiz = quiz,
                attempt_number = attempt_number + 1
            )
            qna.save()
            data.append(
                {   
                    "serial_number": serial_number,
                    "question_id": qna.id,
                    "question": qna.question
                }
            )
            serial_number += 1
            
        return Response({
            "success": True,
            "message": "AI Generated Quiz is ready.",
            "quiz_id": quiz.id,
            "questions": data
        }, status=status.HTTP_200_OK)
        

class GetQuizContentById(APIView):
    """
    GET /api/quiz-content/{id}/
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            quiz_content = QuizContent.objects.get(id=id)
            quiz_content_data = model_to_dict(quiz_content)
            print(quiz_content_data.pop("actual_answer"))

            return Response({
                "success": True,
                "message": "QuizContent fetched successfully.",
                "data": quiz_content_data
            }, status=status.HTTP_200_OK)

        except QuizContent.DoesNotExist:
            return Response({
                "success": False,
                "message": f"No QuizContent found with id {id}."
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as ex:
            return Response({
                "success": False,
                "message": f"An error occurred: {str(ex)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            
class GetCoursesTitles(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    
    def get(self, request):
        data = []
        for course in LEARNING_PATHS_CHOICES:
            data.append(course[0])
        return Response({
                "success": True,
                "message": "QuizContent fetched successfully.",
                "data": data
            }, status=status.HTTP_200_OK)
    

class SubmitQuestionAPI(APIView):
    """
    API to submit an answer for a quiz question.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        uuid = request.data.get('question_id')
        submitted_answer = request.data.get('answer')

        if not uuid or not submitted_answer:
            return Response({
                "success": False,
                "message": "Missing required fields: uuid and answer."
            }, status=status.HTTP_400_BAD_REQUEST)

        quiz_content = get_object_or_404(QuizContent, id=uuid)
        if quiz_content.submitted:
            return Response({
                "success": False,
                "message": "Question already submitted."
            }, status=status.HTTP_400_BAD_REQUEST)
        
        prompt = SCORE_PROMPT[:]
        prompt.format(QUESTION=quiz_content.question, ACTUAL_ANSWER=quiz_content.actual_answer, STUDENTS_ANSWER=submitted_answer)
        
        retries = 3
        response = None
        last_exception = None

        while retries > 0 and response is None:
            try:
                response = get_ai_response(content=prompt)
                print(response)
                break
            except Exception as ex:
                response = None
                print(f"Exception occurred: {ex}")
                last_exception = ex
                retries -= 1
                if retries > 0:
                    print("Retrying...")
                else:
                    print("All retries exhausted.")
                time.sleep(1)
        if response is None and last_exception:
            response = {
                "score": random.randint(1,5)
            }
            print("Random - exception")
        if response is None:
            response = {
                "score": random.randint(1,5)
            }
            print("Random - None")
        score = int(response["score"])
        quiz_content.student_answer = submitted_answer
        quiz_content.marks = score
        quiz_content.submitted = True
        quiz_content.save()

        return Response({
            "success": True,
            "message": "Answer submitted successfully.",
            "data": {
                "question_id": str(quiz_content.id),
                "answer": submitted_answer,
                "submitted": quiz_content.submitted
            }
        }, status=status.HTTP_200_OK)


class SubmitQuizAPI(APIView):
    """
    API to process a quiz submission and calculate the result.
    """

    def post(self, request):
        quiz_id = request.data.get('quiz_id')
        student = request.user


        result = Result.objects.filter(id=quiz_id)
        # If result already calculated
        if result.exists() and result.first().obtained_score:
            result = result.first()
            percentage = (result.obtained_score / result.total_score) * 100 if result.total_score > 0 else 0
            result_status = "Pass" if percentage >= 70 else "Fail"
            return Response({
            "success": True,
            "message": f"Quiz submitted successfully. You {'passed' if result_status == 'Pass' else 'failed'} with {percentage:.2f}%.",
            "data": {
                "obtained_marks": result.obtained_score,
                "total_marks": result.total_score,
                "percentage": percentage,
                "status": result_status
            }
        }, status=status.HTTP_200_OK)
            
        
        if getattr(student, "type", None) != "student":
            return Response({
                "success": False,
                "message": "User is not a student."
            }, status=status.HTTP_403_FORBIDDEN)

        if not quiz_id:
            return Response({
                "success": False,
                "message": "Missing quiz_id in request."
            }, status=status.HTTP_400_BAD_REQUEST)
        quiz = Quiz.objects.filter(id=quiz_id)
        quiz_questions = QuizContent.objects.filter(quiz=quiz.first())

        if not quiz_questions.exists():
            return Response({
                "success": False,
                "message": "No questions found for the provided quiz ID."
            }, status=status.HTTP_404_NOT_FOUND)

        unanswered_questions = quiz_questions.filter(submitted=False)

        if unanswered_questions.exists():
            return Response({
                "success": False,
                "message": "Not all questions have been answered. Please submit all answers."
            }, status=status.HTTP_400_BAD_REQUEST)

        total_marks = len(quiz_questions) * 5
        obtained_marks = sum(q.marks for q in quiz_questions)

        percentage = (obtained_marks / total_marks) * 100 if total_marks > 0 else 0
        result_status = "Pass" if percentage >= 70 else "Fail"

        result, created = Result.objects.get_or_create(
            quiz_id=quiz_id,
            defaults={
                "obtained_score": obtained_marks,
                "total_score": total_marks,
                "attempt_number": quiz.first().attempts
            }
        )
        if not created:
            result.obtained_score = obtained_marks
            result.total_score = total_marks
            result.save()

        if result_status == "Pass":
            # TODO: call certificate service here
            pass
        
        return Response({
            "success": True,
            "message": f"Quiz submitted successfully. You {'passed' if result_status == 'Pass' else 'failed'} with {percentage:.2f}%.",
            "data": {
                "obtained_marks": obtained_marks,
                "total_marks": total_marks,
                "percentage": percentage,
                "status": result_status
            }
        }, status=status.HTTP_200_OK)


class StudentReport(APIView):
    
    def get(self, request, id):
        student = BaseUserModel.objects.filter(id=id).first()
        if getattr(student, "type", None) != "student":
            return Response({
                "success": False,
                "message": f"ID: {id} does not belong to any student."
            }, status=status.HTTP_403_FORBIDDEN)
        
        report = []

        courses = Course.objects.all()
        course_dict = {}
        for course in courses:
            if course.learning_path_title not in course_dict:
                course_dict[course.learning_path_title] = course

        for course in course_dict.values():
            if EnrolledCourse.objects.filter(course=course, student=student).exists():
                quizes = Quiz.objects.filter(student=student, learning_path_title=course.learning_path_title)
                attempts = []

                for quiz in quizes:
                    result = Result.objects.filter(quiz=quiz)
                    if result.exists() and result.first().obtained_score:
                        result = result.first()
                        percentage = (result.obtained_score / result.total_score) * 100 if result.total_score > 0 else 0
                        result_status = "Pass" if percentage >= 70 else "Fail"
                        attempts.append(
                            {
                                "attempt_number": result.attempt_number,
                                "obtained_marks": result.obtained_score,
                                "total_marks": result.total_score,
                                "status": result_status,
                                "percentage": percentage
                            }
                        )
                if attempts:
                    report.append({
                        "id": str(course.id),
                        "learning_path_title": course.learning_path_title,
                        "content_title": course.content_title,
                        "results": attempts
                    })
                    
        return Response({
            "success": True,
            "message": f"Report Generated",
            "report": report
        }, status=status.HTTP_200_OK)
