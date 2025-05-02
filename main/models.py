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
			"Acrobatics": "Dexterity",
			"Animal Handling": "Wisdom",
			"Arcana": "Intelligence",
			"Athletics": "Strength",
			"Deception": "Charisma",
			"History": "Intelligence",
			"Insight": "Wisdom",
			"Intimidation": "Charisma",
			"Investigation": "Intelligence",
			"Medicine": "Wisdom",
			"Nature": "Intelligence",
			"Perception": "Wisdom",
			"Performance": "Charisma",
			"Persuasion": "Charisma",
			"Religion": "Intelligence",
			"Sleight of Hand": "Dexterity",
			"Stealth": "Dexterity",
			"Survival": "Wisdom",

		}
		for skill in skills:
			ability_score = DungeonsAndDragonsFifthEditionAbilityScore.objects.get(character=character, name=skills[skill])
			DungeonsAndDragonsFifthEditionSkill.objects.create(name=skill, ability_score=ability_score, character=character)

		return character
	
	# Helper model, used to temporarily store ability scores during character saving.
	class AbilityScoreHelper5e:
			def __init__(self, field_name, display_name):
				self.field_name = field_name
				self.display_name = display_name
				self.score = form_data.get(field_name)
	
	# Helper model, used to temporarily store skills during character saving.
	class SkillHelper5e:
			def __init__(self, field_name, display_name, ability_score):
				self.field_name = field_name
				self.display_name = display_name
				self.ability_score = ability_score
				self.proficiency = form_data.get(field_name)

	# Create a new D&D 5e character sheet using information from an HTML form POST request.
	def save_dnd5e_character(self, current_user, form_data):
		character = self.create(user = current_user)
		character.name = form_data.get('character_name')
		character.species = form_data.get('species')
		character.character_class = form_data.get('character_class')
		character.hp_current = form_data.get('hp_current')
		character.hp_maximum = form_data.get('hp_maximum')
		character.armor_class = form_data.get('armor_class')
		character.spellcasting_ability = form_data.get('spellcasting_ability')
		print(character.spellcasting_ability)

		# Handles generation of ability scores. Assumes the name attribute of all abilit yscore fields to be "[ability score name]_ability_score"
		field_names = form_data.dict().keys()
		for field in field_names:
			if (field.endswith("_ability_score")):
				display_name = field.replace("_ability_score", "")
				display_name = display_name.replace("_", " ")
				display_name = display_name.title()
				DungeonsAndDragonsFifthEditionAbilityScore.objects.create(name=display_name, character=character, score=form_data.get(field))

		# Handles generation of skills. Assumes the name attribute of all skill fields to be "[skill name]_[ability score]_skill"
		for field in field_names:
			if (field.endswith("_skill")):
				display_name = field.replace("_skill", "")	# Removes _skill
				ability_score_name = display_name.split("_")[1].title() # Isolates and formats the ability score name from the field name
				display_name = display_name.split("_")[0].title() # Isolates the display name from the field name
				ability_score = DungeonsAndDragonsFifthEditionAbilityScore.objects.get(character=character, name=ability_score_name)
				DungeonsAndDragonsFifthEditionSkill.objects.create(name=display_name, character=character, proficiency=form_data.get(field), ability_score=ability_score)

		# Handles generation of items.
		item_quantities = form_data.getlist('item_quantity')
		item_names = form_data.getlist('item_name')
		item_descriptions = form_data.getlist('item_description')
		item_weights = form_data.getlist('item_weight')
		for i in range(len(item_names)):
			DungeonsAndDragonsFifthEditionItem.objects.create(name=item_names[i], character=character, amount=item_quantities[i], weight=item_weights[i], description=item_descriptions[i])

		# Handles generation of attacks.
		attack_names = form_data.getlist('attack_name')
		attack_ranges = form_data.getlist('attack_range')
		attack_bonuses = form_data.getlist('attack_bonus')
		attack_damage_rolls = form_data.getlist('attack_damage_roll')
		attack_damage_types = form_data.getlist('attack_damage_type')
		attack_notes = form_data.getlist('attack_notes')
		for i in range(len(attack_names)):
			DungeonsAndDragonsFifthEditionAttack.objects.create(name=attack_names[i], range=attack_ranges[i], attack_bonus=attack_bonuses[i], damage_roll=attack_damage_rolls[i], damage_type=attack_damage_types[i], notes=attack_notes[i], character=character)

		return character

class DungeonsAndDragonsFifthEditionCharacter(Character):
	system = "D&D 5e"
	species = models.CharField(max_length=200)
	character_class = models.CharField(max_length=200)
	level = models.PositiveIntegerField(default=1)
	hp_maximum = models.PositiveIntegerField(default=0)
	hp_current = models.PositiveIntegerField(default=0)
	armor_class = models.PositiveIntegerField(default=10)
	spellcasting_ability = models.CharField(max_length=200, default="")

	objects = DungeonsAndDragonsFifthEditionCharacterManager()

	def __str__(self):
		return self.name

class DungeonsAndDragonsFifthEditionAbilityScore(models.Model):
	name = models.CharField(max_length=200)
	score = models.PositiveIntegerField(default=10)
	saving_throw = models.BooleanField(default=False)
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
	amount = models.IntegerField(default=0)
	weight = models.IntegerField(default=0)
	description = models.CharField(max_length=10000)
	character = models.ForeignKey(DungeonsAndDragonsFifthEditionCharacter, on_delete=models.CASCADE)

	def __str__(self):
		return self.character.name + "'s " + self.name

class DungeonsAndDragonsFifthEditionAttack(models.Model):
	name = models.CharField(max_length=200)
	attack_bonus = models.CharField(max_length=200)
	damage_roll = models.CharField(max_length=200)
	damage_type = models.CharField(max_length=200, default="")
	range = models.CharField(max_length=200, default="")
	notes = models.CharField(max_length=1000, default="")
	character = models.ForeignKey(DungeonsAndDragonsFifthEditionCharacter, on_delete=models.CASCADE)

	def __str__(self):
		return self.character.name + "'s " + self.name