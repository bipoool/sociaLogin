from os import stat
from urllib import response
from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view
from django.http import HttpResponse
from .models import db
from rest_framework import serializers
from rest_framework import status
from .serializers import dbSerializer
from django.contrib.auth.hashers import check_password, make_password
  
@api_view(['POST'])
def create(request):
    name = request.data['name']
    password = make_password(request.data['password'])
    email = request.data['email']

    data = {'name':name, 'email':email, 'password':password}
    item = dbSerializer(data=data)
    
    if db.objects.filter(email=email).exists():
        return HttpResponse(status=400)
    
    if item.is_valid():
        item.save()
        return HttpResponse(status=200)
    else:
        print(item.error_messages)
        return HttpResponse(status=400)

@api_view(['POST'])
def check(request):

    password = request.data['password']
    email = request.data['email']

    item = db.objects.filter(email=email)
    if item:
        dbpass = item[0].password
        if check_password(password, dbpass):
            return HttpResponse(status=200)
        return HttpResponse(status=400)
    else:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def update(request):

    fn = request.data['fn']
    email = request.data['email']
    newPass = request.data['newPass']

    if fn == 'reset':
        password = request.data['password']
        item = db.objects.filter(email=email)
        if item:
            dbpass = item[0].password
            if check_password(password, dbpass):
                name = item[0].name
                newPass = make_password(newPass)
                data = {'name':name, 'email':email, 'password':newPass}
                instance = dbSerializer(instance=item[0], data=data)
                if instance.is_valid():
                    instance.save()
                    return HttpResponse(status=200)
                else:
                    return HttpResponse(status=400)
            return HttpResponse(status=400)
        else:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    
    elif fn == 'forgot':
        
        name = request.data['name']
        item = db.objects.filter(email=email, name=name)
        if item:
            newPass = make_password(newPass)
            data = {'name':name, 'email':email, 'password':newPass}
            instance = dbSerializer(instance=item[0], data=data)
            
            if instance.is_valid():
                instance.save()
                return HttpResponse(status=200)
            else:
                return HttpResponse(status=400)

        else:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    print("helo")
    return HttpResponse(status=400)
    
    