from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HomeView, ProjectViewSet, SkillCategoryViewSet, AboutView, ContactMessageCreateView, ContactInfoView

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'skills-categories', SkillCategoryViewSet)

urlpatterns = [
    path('home/', HomeView.as_view(), name='home-content'),
    path('about/', AboutView.as_view(), name='about-content'),
    path('contact-messages/', ContactMessageCreateView.as_view(), name='contact-create'),
    path('contact-info/', ContactInfoView.as_view(), name='contact-info'),
    path('', include(router.urls)),
]