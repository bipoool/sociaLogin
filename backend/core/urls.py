from django.urls import path
from . import views
urlpatterns = [
    path('create/', views.create),
    path('check/', views.check),
    path('update/', views.update)
]