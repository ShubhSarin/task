from .serializer import UserSerializer
from rest_framework import response, status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
# Create your views here.

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=serializer.validated_data['username'])
            user.set_password(request.data['password'])
            user.save()
            token = Token.objects.create(user=user)
            return response.Response({"token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        user = get_object_or_404(User, username=request.data['username'])
        if not user.check_password(request.data['password']):
            return response.Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        token, created = Token.objects.get_or_create(user=user)
        return response.Response({"token": token.key, "user": {"username": user.username, "email": user.email}}, status=status.HTTP_200_OK)
        
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    if request.method == 'DELETE':
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return response.Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return response.Response({"error": "Token does not exist"}, status=status.HTTP_404_NOT_FOUND)
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def isAuthenticated(request):
    if request.method == 'GET':
        return response.Response(status=status.HTTP_200_OK)
