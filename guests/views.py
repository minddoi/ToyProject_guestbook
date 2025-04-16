from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
from django.utils.timezone import localtime
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
                "created_time": localtime(guest.created).strftime("%Y-%m-%d %H:%M:%S"),
            }
            guest_json_all.append(guest_json)

        return JsonResponse({
            'status': 200,
            'message' : '방명록 리스트 조회 성공',
            'data': guest_json_all
        })

@require_http_methods(["GET", "DELETE"]) 
def guest_detail(request, id):

    if request.method == "GET":
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
    
    if request.method == "DELETE":
        try:
            body = json.loads(request.body.decode('utf-8'))
            input_password = body.get("password")

            guest = get_object_or_404(Guest, pk=id)

            if guest.password == int(input_password):
                guest.delete()
                return JsonResponse({
                    'status': 200,
                    'message': '방명록 삭제 성공',
                    'data': None
                })
            else:
                return JsonResponse({
                    'status': 403,
                    'message': '올바른 비밀번호가 아닙니다.',
                })
        
        except json.JSONDecodeError:
            return JsonResponse({
                'status': 400,
                'message': '요청 형식이 올바르지 않습니다.',
            })
