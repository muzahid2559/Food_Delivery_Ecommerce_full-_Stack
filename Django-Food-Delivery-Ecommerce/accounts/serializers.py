from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User


# first registration user make
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("full_name", "email", "password", "type")

    def create(self, validated_data):
        full_name = validated_data.pop('full_name')
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        type = validated_data.pop('type')

        user = User.objects.create_user(
            full_name=full_name, email=email, password=password, type=type)

        return user


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("full_name", "email", "img", "address", "phone")


class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user_type'] = user.type
        return token


class DeliverUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "full_name")


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "img", "phone", "is_active")


class UserFullDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("full_name", "email", "img", "address", "phone", "type")


#  admin site account create manually from react
class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "password", "type")
    
    def create(self, validated_data):
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        type = validated_data.pop('type')

        user = User.objects.create_user(email=email, password=password, type=type)

        return user
