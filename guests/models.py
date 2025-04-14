from django.db import models
from accounts.models import User

# Create your models here.
class BaseModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class Guest(BaseModel):
    id = models.AutoField(primary_key = True)
    title = models.CharField(max_length=30)
    writer = models.CharField(max_length=15)
    content = models.TextField()
    password = models.IntegerField()

    def __str__(self):
        return self.title