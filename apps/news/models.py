from django.db import models

class BronxNews(models.Model):
    external_uuid = models.UUIDField(unique=True, db_index=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    keywords = models.CharField(max_length=255)
    snippet = models.TextField()
    url = models.URLField()
    image_url = models.URLField()
    published_at = models.DateTimeField()
    source = models.CharField(max_length=100)
    categories = models.JSONField()
    def __str__(self):
        return self.title