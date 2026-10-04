from rest_framework import serializers
from .models import (
    HomeSection, 
    Project, 
    SkillCategory, 
    Skill, 
    AboutSection, 
    EducationItem, 
    ContactMessage, 
    ContactInfo
)

class HomeSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeSection
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']

class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = ['id', 'name', 'skills']

class EducationItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationItem
        fields = ['id', 'title', 'institution', 'years']

class AboutSectionSerializer(serializers.ModelSerializer):
    educations = EducationItemSerializer(many=True, read_only=True)

    class Meta:
        model = AboutSection
        fields = ['id', 'bio_p1', 'bio_p2', 'educations']

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = '__all__'