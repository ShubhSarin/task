from .models import Task
from rest_framework import serializers

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id','userId' ,'title', 'description', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
    