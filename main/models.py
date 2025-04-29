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

class DungeonsAndDragonsFifthEditionCharacterManager(models.Manager):
	# Create a blank D&D 5e character model.
	def create_blank_dnd5e_character(self, current_user):
		character = self.create(user = current_user)
		ability_scores = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"]
		for ability_score in ability_scores:
			DungeonsAndDragonsFifthEditionAbilityScore.objects.create(name=ability_score, character=character)

		skills = {
			"Athletics": "Strength",
			"Acrobatics": "Dexterity",
			"Sleight of Hand": "Dexterity",
			"Stealth": "Dexterity",
			"Arcana": "Intelligence",
			"History": "Intelligence",
			"Investigation": "Intelligence",
			"Nature": "Intelligence",
			"Religion": "Intelligence",
			"Animal Handling": "Wisdom",
			"Insight": "Wisdom",
			"Perception": "Wisdom",
			"Survival": "Wisdom",
			"Deception": "Charisma",
			"Intimidation": "Charisma",
			"Performance": "Charisma",
			"Persuasion": "Charisma",
		}
		for skill in skills:
			ability_score = DungeonsAndDragonsFifthEditionAbilityScore.objects.get(character=character, name=skills[skill])
			DungeonsAndDragonsFifthEditionSkill.objects.create(name=skill, ability_score=ability_score, character=character)

		return character
	
	# Create
	def save_dnd5e_character(self, current_user, form_data):
		# Create a new D&D 5e character sheet using information from an HTML form POST request.
		character = self.create(user = current_user)
		character.name = form_data.get('character-name')
		character.species = form_data.get('species')
		character.character_class = form_data.get('character_class')
		character.hp_current = form_data.get('hp-current')
		character.hp_maximum = form_data.get('hp-maximum')
		character.armor_class = form_data.get('armor-class')

		# ability_scores = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"]
		# for ability_score in ability_scores:
		# 	DungeonsAndDragonsFifthEditionAbilityScore.objects.create(name=ability_score, character=character)

		# skills = {
		# 	"Athletics": "Strength",
		# 	"Acrobatics": "Dexterity",
		# 	"Sleight of Hand": "Dexterity",
		# 	"Stealth": "Dexterity",
		# 	"Arcana": "Intelligence",
		# 	"History": "Intelligence",
		# 	"Investigation": "Intelligence",
		# 	"Nature": "Intelligence",
		# 	"Religion": "Intelligence",
		# 	"Animal Handling": "Wisdom",
		# 	"Insight": "Wisdom",
		# 	"Perception": "Wisdom",
		# 	"Survival": "Wisdom",
		# 	"Deception": "Charisma",
		# 	"Intimidation": "Charisma",
		# 	"Performance": "Charisma",
		# 	"Persuasion": "Charisma",
		# }
		# for skill in skills:
		# 	ability_score = DungeonsAndDragonsFifthEditionAbilityScore.objects.get(character=character, name=skills[skill])
		# 	DungeonsAndDragonsFifthEditionSkill.objects.create(name=skill, ability_score=ability_score, character=character)

		return character

class DungeonsAndDragonsFifthEditionCharacter(Character):
	system = "D&D 5e"
	species = models.CharField(max_length=200)
	character_class = models.CharField(max_length=200)
	level = models.PositiveIntegerField(default=1)
	hp_maximum = models.PositiveIntegerField(default=0)
	hp_current = models.PositiveIntegerField(default=0)
	armor_class = models.PositiveIntegerField(default=10)

	objects = DungeonsAndDragonsFifthEditionCharacterManager()

	def __str__(self):
		return self.name

class DungeonsAndDragonsFifthEditionAbilityScore(models.Model):
	name = models.CharField(max_length=200)
	score = models.PositiveIntegerField(default=10)
	character = models.ForeignKey(DungeonsAndDragonsFifthEditionCharacter, on_delete=models.CASCADE)

	def __str__(self):
		return self.character.name + "'s " + self.name

class DungeonsAndDragonsFifthEditionSkill(models.Model):
	name = models.CharField(max_length=200)
	proficiency = models.PositiveIntegerField(default=0) # 0 for not proficient, 1 if proficient, 2 if expertise, 0.5 if jack of all trades
	ability_score = models.ForeignKey(DungeonsAndDragonsFifthEditionAbilityScore, on_delete=models.CASCADE)
	character = models.ForeignKey(DungeonsAndDragonsFifthEditionCharacter, on_delete=models.CASCADE)

	def __str__(self):
		return self.character.name + "'s " + self.name

class DungeonsAndDragonsFifthEditionItem(models.Model):
	name = models.CharField(max_length=200)
	description = models.CharField(max_length=10000)
	character = models.ForeignKey(DungeonsAndDragonsFifthEditionCharacter, on_delete=models.CASCADE)

	def __str__(self):
		return self.character.name + "'s " + self.name

class DungeonsAndDragonsFifthEditionAttack(models.Model):
	name = models.CharField(max_length=200)
	attack_bonus = models.IntegerField(default=0)
	damage_amount = models.CharField(max_length=200)
	damage_type = models.CharField(max_length=200)
	character = models.ForeignKey(DungeonsAndDragonsFifthEditionCharacter, on_delete=models.CASCADE)

	def __str__(self):
		return self.character.name + "'s " + self.name