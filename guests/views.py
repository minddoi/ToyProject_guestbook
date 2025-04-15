from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
from .models import *
import json

@require_http_methods(["POST", "GET"])
def guest_list(request):

    if request.method == "POST":
        body = json.loads(request.body.decode('utf-8'))

        new_guest = Guest.objects.create(
            title=body['title'],
            writer = body['writer'],
            content = body['content'],
            password = body['password'],
        )
        new_guest_json = {
            "id" : new_guest.id,
            "title" : new_guest.title,
            "writer" : new_guest.writer,
            "content" : new_guest.content,
            "password" : new_guest.password,
        }
        return JsonResponse({
            'status' : 200,
            'message' : '방명록 생성 성공',
            'data' : new_guest_json
        })
    
    if request.method == "GET":
        guest_all = Guest.objects.all().order_by('-created')
        guest_json_all = []

        for guest in guest_all:
            guest_json = {
                "id" : guest.id,
                "title" : guest.title,
                "writer" : guest.writer,
                "content" : guest.content,
                "password" : guest.password,
                "created_time": guest.created,
            }
            guest_json_all.append(guest_json)

        return JsonResponse({
            'status': 200,
            'message' : '방명록 리스트 조회 성공',
            'data': guest_json_all
        })

#테스트용 세부 리스트 메소드
@require_http_methods(["GET", "DELETE"]) 
def guest_detail(request, id):

    if request.method == "GET" :
        guest = get_object_or_404(Guest, pk=id)
        guest_detail_json = {
            "id" : guest.id,
            "title" : guest.title,
            "writer" : guest.writer,
            "content" : guest.content,
            "password" : guest.password,
        }
        return JsonResponse({
            "status" : 200,
            "data" : guest_detail_json
        })
    
    if request.method == "DELETE" :
        delete_guest = get_object_or_404(Guest, pk=id)
        delete_guest.delete()

        return JsonResponse({
            'status': 200,
            'message' : '방명록 삭제 성공',
            'data' : None
        })