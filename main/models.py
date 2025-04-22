from django.db import models
from django.contrib.auth.models import User
from model_utils.managers import InheritanceManager

# Create your models here.
class UserTemplate(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='usertemplates', null=True)
	name = models.CharField(max_length=200)

	def __str__(self):
		return self.name

class Character(models.Model):
	objects = InheritanceManager()
	name = models.CharField(max_length=200)
	user = models.ForeignKey(User, on_delete=models.CASCADE)

class DungeonsAndDragonsFifthEditionCharacter(Character):
	system = "D&D 5e"
	species = models.CharField(max_length=200)
	characterClass = models.CharField(max_length=200)
	level = models.PositiveIntegerField()

class DungeonsAndDragonsFifthEditionItem(models.Model):
	name = models.CharField(max_length=200)
	description = models.CharField(max_length=10000)
	character = models.ForeignKey(DungeonsAndDragonsFifthEditionCharacter, on_delete=models.CASCADE)