from django.db import models

class HomeSection(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    resume_file = models.FileField(upload_to='resumes/', blank=True, null=True)

    def __str__(self):
        return self.title or "Home Section"

class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    github_url = models.URLField(blank=True, null=True)
    live_demo_url = models.URLField(blank=True, null=True)
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class SkillCategory(models.Model):
    name = models.CharField(max_length=255)
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, related_name='skills', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class AboutSection(models.Model):
    bio_p1 = models.TextField(blank=True, null=True)
    bio_p2 = models.TextField(blank=True, null=True)

    def __str__(self):
        return "About Section"

class EducationItem(models.Model):
    about_section = models.ForeignKey(AboutSection, related_name='educations', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)         # e.g., Master of Computer Applications
    institution = models.CharField(max_length=255)   # e.g., IGNOU
    years = models.CharField(max_length=100) 
    
    cgpa = models.CharField(max_length=50, blank=True, null=True)
    percentage = models.CharField(max_length=50, blank=True, null=True)
    pursuing = models.BooleanField(default=False)        # e.g., 2025 - 2027

    def __str__(self):
        return f"{self.title} at {self.institution}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"

class ContactInfo(models.Model):
    email = models.EmailField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)

    def __str__(self):
        return "Contact Info"