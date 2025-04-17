from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserTemplate(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='usertemplates', null=True)
	name = models.CharField(max_length=200)

	def __str__(self):
		return self.name

class Character(models.Model):
	name = models.CharField(max_length=200)
	system = models.CharField(max_length=200)
	user = models.ForeignKey(User, on_delete=models.CASCADE)

class DungeonsAndDragonsFifthEditionCharacter(Character):
	species = models.CharField(max_length=200)
	characterClass = models.CharField(max_length=200)