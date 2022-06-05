from statistics import mode
from django.db import models

# Create your models here.

class db(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=20, name="name")
    email = models.EmailField(name="email")
    password = models.CharField(max_length=512, name="password")
    def __str__(self) -> str:
        return self.name
