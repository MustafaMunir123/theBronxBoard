from django.contrib import admin
from .models import Course, EnrolledCourse, Quiz, QuizContent, Result, Resourse


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('learning_path_title', 'content_title', 'serial_number')
    search_fields = ('learning_path_title', 'content_title')


@admin.register(EnrolledCourse)
class EnrolledCourseAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'completed')
    list_filter = ('completed',)
    search_fields = ('student__email', 'course__content_title')


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('student', 'learning_path_title', 'eligiblity', 'attempts')
    list_filter = ('eligiblity',)
    search_fields = ('student__email', 'learning_path_title')


@admin.register(QuizContent)
class QuizContentAdmin(admin.ModelAdmin):
    list_display = ('short_question', 'marks', 'submitted', 'attempt_number', 'quiz')
    list_filter = ('attempt_number',)

    def short_question(self, obj):
        return obj.question[:30]
    short_question.short_description = 'Question'
    
    
@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = ('quiz', 'attempt_number', 'obtained_score')
    search_fields = ('quiz__learning_path_title',)
    

@admin.register(Resourse)
class ResourseAdmin(admin.ModelAdmin):
    list_display = ("title", "type", "website")
    search_fields = ("title", "description", "type")
