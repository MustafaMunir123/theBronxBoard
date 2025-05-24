from django.db import models
from apps.users.models import BaseUserModel
from uuid import uuid4

TYPE_CHOICES = (
    ('welfare', 'Welfare'),
    ('skills', 'Skills'),
)

LEARNING_PATHS_CHOICES = (
    ('Adolescent Pregnancy Prevention', 'Adolescent Pregnancy Prevention'),
    ('Youth Crime & Gang Prevention', 'Youth Crime & Gang Prevention'),
    ('Legal Literacy & Civic Education', 'Legal Literacy & Civic Education')
)

class Course(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    learning_path_title = models.CharField(null=False, blank=False, max_length=300, choices=LEARNING_PATHS_CHOICES)
    content_title = models.CharField(unique=True, null=False, blank=False, max_length=300)
    content = models.TextField(null=False, blank=False)
    reference = models.TextField(null=False, blank=False)
    serial_number = models.IntegerField(null=False, blank=False)

    def __str__(self):
        return f"{self.learning_path_title} - {self.content_title}"


class EnrolledCourse(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    student = models.ForeignKey(BaseUserModel, on_delete=models.CASCADE, related_name='enrolled_courses')
    completed = models.BooleanField(default=False)
    enabled = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.student} enrolled in {self.course}"


class Quiz(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    student = models.ForeignKey(BaseUserModel, on_delete=models.CASCADE, related_name='quizzes')
    learning_path_title = models.CharField(null=False, blank=False, max_length=300)
    eligiblity = models.BooleanField(default=False)
    attempts = models.IntegerField(default=0)

    def __str__(self):
        return f"Quiz for {self.student} on {self.learning_path_title}"


class QuizContent(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    question = models.TextField(null=False, blank=False)
    actual_answer = models.TextField(null=False, blank=False)
    student_answer = models.TextField(null=False, blank=False)
    marks = models.IntegerField(default=0)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="contents")
    attempt_number = models.IntegerField(null=False, blank=False)

    def __str__(self):
        return f"Question: {self.question[:30]} - Marks: {self.marks}"


class Result(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="results")
    attempt_number = models.IntegerField(null=False, blank=False)
    obtained_score = models.IntegerField(null=False, blank=False)
    suggestion_to_teacher = models.TextField(null=False, blank=False)

    def __str__(self):
        return f"Result for {self.quiz} - Attempt #{self.attempt_number} - Score: {self.obtained_score}"
    
class Resourse(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    title = models.CharField(null=False, blank=False, max_length=300)
    description = models.TextField()
    website = models.URLField()
    type = models.CharField(choices=TYPE_CHOICES, max_length=50, null=False, blank=False)

    def __str__(self):
        return f"{self.title} ({self.get_type_display()})"