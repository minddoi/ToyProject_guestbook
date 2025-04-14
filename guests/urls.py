from django.urls import path
from guests.views import *

urlpatterns = [
    path('', guest_list, name = "guest_list"),
    path('detail/<int:id>/', guest_detail, name="guest_detail")
]