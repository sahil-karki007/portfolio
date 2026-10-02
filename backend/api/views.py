from rest_framework import viewsets, generics
from .models import HomeSection, Project, SkillCategory, AboutSection, ContactMessage, ContactInfo
from .serializers import (
    HomeSectionSerializer, ProjectSerializer, SkillCategorySerializer,
    AboutSectionSerializer, ContactMessageSerializer, ContactInfoSerializer
)

class HomeView(generics.RetrieveAPIView):
    queryset = HomeSection.objects.all()
    serializer_class = HomeSectionSerializer
    def get_object(self):
        obj, created = HomeSection.objects.get_or_create(pk=1)
        return obj

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('order')
    serializer_class = ProjectSerializer

class SkillCategoryViewSet(viewsets.ModelViewSet):
    queryset = SkillCategory.objects.all().order_by('order')
    serializer_class = SkillCategorySerializer

class AboutView(generics.RetrieveAPIView):
    queryset = AboutSection.objects.all()
    serializer_class = AboutSectionSerializer
    def get_object(self):
        obj, created = AboutSection.objects.get_or_create(pk=1)
        return obj

class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

class ContactInfoView(generics.RetrieveAPIView):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer
    def get_object(self):
        obj, created = ContactInfo.objects.get_or_create(pk=1)
        return obj