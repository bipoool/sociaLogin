from django.db.models import fields
from rest_framework import serializers
from .models import db
  
class dbSerializer(serializers.ModelSerializer):
    class Meta:
        model = db
        fields = ('id', "name", 'email', 'password')