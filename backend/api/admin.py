from django.contrib import admin
from .models import HomeSection, Project, SkillCategory, Skill, AboutSection, ContactMessage, ContactInfo

class SkillInline(admin.TabularInline):
    model = Skill
    extra = 3

class SkillCategoryAdmin(admin.ModelAdmin):
    inlines = [SkillInline]

admin.site.register(HomeSection)
admin.site.register(Project)
admin.site.register(SkillCategory, SkillCategoryAdmin)
admin.site.register(AboutSection)
admin.site.register(ContactMessage)
admin.site.register(ContactInfo)