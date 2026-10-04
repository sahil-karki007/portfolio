from django.contrib import admin
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

class EducationItemInline(admin.TabularInline):
    model = EducationItem
    extra = 1

class AboutSectionAdmin(admin.ModelAdmin):
    inlines = [EducationItemInline]

class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1

class SkillCategoryAdmin(admin.ModelAdmin):
    inlines = [SkillInline]

admin.site.register(HomeSection)
admin.site.register(Project)
admin.site.register(SkillCategory, SkillCategoryAdmin)
admin.site.register(AboutSection, AboutSectionAdmin)
admin.site.register(ContactMessage)
admin.site.register(ContactInfo)