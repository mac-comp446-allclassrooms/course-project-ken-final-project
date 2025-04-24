import math
from django.db import models
from django.contrib.auth.models import User
from model_utils.managers import InheritanceManager
from django.core.exceptions import ValidationError

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
	character_class = models.CharField(max_length=200)
	level = models.PositiveIntegerField(default=1)
	hp_maximum = models.PositiveIntegerField(default=0)
	hp_current = models.PositiveIntegerField(default=0)

class DungeonsAndDragonsFifthEditionAbilityScore(models.Model):
	name = models.CharField(max_length=200)
	score = models.PositiveIntegerField(default=10)
	character = models.ForeignKey(DungeonsAndDragonsFifthEditionCharacter, on_delete=models.CASCADE)

class DungeonsAndDragonsFifthEditionSkill(models.Model):
	name = models.CharField(max_length=200)
	proficiency = models.PositiveIntegerField(default=0) # 0 for not proficient, 1 if proficient, 2 if expertise, 0.5 if jack of all trades
	ability_score = models.ForeignKey(DungeonsAndDragonsFifthEditionAbilityScore, on_delete=models.CASCADE)
	character = models.ForeignKey(DungeonsAndDragonsFifthEditionCharacter, on_delete=models.CASCADE)

class DungeonsAndDragonsFifthEditionItem(models.Model):
	name = models.CharField(max_length=200)
	description = models.CharField(max_length=10000)
	character = models.ForeignKey(DungeonsAndDragonsFifthEditionCharacter, on_delete=models.CASCADE)

class DungeonsAndDragonsFifthEditionAttack(models.Model):
	name = models.CharField(max_length=200)
	attack_bonus = models.IntegerField(default=0)
	damage_amount = models.CharField(max_length=200)
	damage_type = models.CharField(max_length=200)
	character = models.ForeignKey(DungeonsAndDragonsFifthEditionCharacter, on_delete=models.CASCADE)