from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

TYPE_CHOICES = (
    ('student', 'Student'),
    ('teacher', 'Teacher'),
)

class BaseUserModel(AbstractUser):
    email = models.EmailField(unique=True)
    type = models.CharField(
        max_length=10,
        choices=TYPE_CHOICES,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"{self.username} --- {self.type}"

