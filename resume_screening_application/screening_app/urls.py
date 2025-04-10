from django.urls import path
from .views import ResumeScreeningAPI

urlpatterns = [
    path('screen/', ResumeScreeningAPI.as_view(), name='screen-resumes'),
]