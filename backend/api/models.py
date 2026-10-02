from django.db import models

class HomeSection(models.Model):
    title = models.CharField(max_length=255, default="Welcome to My Personal Portfolio")
    greeting = models.CharField(max_length=255, default="Hello! there")
    name = models.CharField(max_length=255, default="Sahil Karki")
    bio = models.TextField(default="I'm a passionate web developer and designer who loves creating amazing digital experiences.")
    resume_file = models.FileField(upload_to='resumes/', blank=True, null=True)
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)

    def __str__(self):
        return f"Home Content - {self.name}"

class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    github_url = models.URLField(blank=True, null=True)
    live_demo_url = models.URLField(blank=True, null=True)
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class SkillCategory(models.Model):
    name = models.CharField(max_length=100) # e.g., "Programming Languages"
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, related_name='skills', on_delete=models.CASCADE)
    name = models.CharField(max_length=100) # e.g., "Python"

    def __str__(self):
        return f"{self.category.name} -> {self.name}"

class AboutSection(models.Model):
    bio_paragraph_1 = models.TextField()
    bio_paragraph_2 = models.TextField()
    bio_paragraph_3 = models.TextField()
    bio_paragraph_4 = models.TextField()
    education_title = models.CharField(max_length=255, default="Masters Of Computer Application (MCA)")
    education_institution = models.CharField(max_length=255, default="Indira Gandhi National Open University (IGNOU)")
    education_years = models.CharField(max_length=100, default="2026 - Current")

    def __str__(self):
        return "About Me Section Content"

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"

class ContactInfo(models.Model):
    phone = models.CharField(max_length=50, default="+91 9220460134")
    email = models.EmailField(default="karkisahil2003@gmail.com")

    def __str__(self):
        return "Contact Details Footer"