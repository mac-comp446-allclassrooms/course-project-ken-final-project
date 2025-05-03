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

	# Create a new D&D 5e character sheet using information from an HTML form POST request.
	def save_dnd5e_character(self, current_user, form_data):
		character = self.create(user = current_user)
		character.name = form_data.get('character_name')
		character.species = form_data.get('species')
		character.character_class = form_data.get('character_class')
		character.hp_current = form_data.get('hp_current')
		character.hp_maximum = form_data.get('hp_maximum')
		character.armor_class = form_data.get('armor_class')
		character.level = form_data.get('character_level')

		character.description_physical = form_data.get('description_physical')
		character.description_personality = form_data.get('description_personality')

		character.proficiencies = form_data.get('proficiencies')

		# Handles coins.
		character.coins_platinum = form_data.get('coins_platinum')
		character.coins_gold = form_data.get('coins_gold')
		character.coins_electrum = form_data.get('coins_electrum')
		character.coins_silver = form_data.get('coins_silver')
		character.coins_copper = form_data.get('coins_copper')

		# Handles spellcasting information.
		character.spellcasting_ability = form_data.get('spellcasting_ability')
		character.spell_slots_level1_current = form_data.get('spell_slots_level1_current')
		character.spell_slots_level1_maximum = form_data.get('spell_slots_level1_maximum')
		character.spell_slots_level2_current = form_data.get('spell_slots_level2_current')
		character.spell_slots_level2_maximum = form_data.get('spell_slots_level2_maximum')
		character.spell_slots_level3_current = form_data.get('spell_slots_level3_current')
		character.spell_slots_level3_maximum = form_data.get('spell_slots_level3_maximum')
		character.spell_slots_level4_current = form_data.get('spell_slots_level4_current')
		character.spell_slots_level4_maximum = form_data.get('spell_slots_level4_maximum')
		character.spell_slots_level5_current = form_data.get('spell_slots_level5_current')
		character.spell_slots_level5_maximum = form_data.get('spell_slots_level5_maximum')
		character.spell_slots_level6_current = form_data.get('spell_slots_level6_current')
		character.spell_slots_level6_maximum = form_data.get('spell_slots_level6_maximum')
		character.spell_slots_level7_current = form_data.get('spell_slots_level7_current')
		character.spell_slots_level7_maximum = form_data.get('spell_slots_level7_maximum')
		character.spell_slots_level8_current = form_data.get('spell_slots_level8_current')
		character.spell_slots_level8_maximum = form_data.get('spell_slots_level8_maximum')
		character.spell_slots_level9_current = form_data.get('spell_slots_level9_current')
		character.spell_slots_level9_maximum = form_data.get('spell_slots_level9_maximum')
		

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

		# Handles generation of traits/features.
		trait_names = form_data.getlist('trait_name')
		trait_descriptions = form_data.getlist('trait_description')
		for i in range(len(trait_names)):
			DungeonsAndDragonsFifthEditionTrait.objects.create(name=trait_names[i], description=trait_descriptions[i], character=character)

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

		# Handles generation of spells.
		spell_names = form_data.getlist('spell_name')
		spell_levels = form_data.getlist('spell_level')
		spell_descriptions = form_data.getlist('spell_description')
		spell_schools = form_data.getlist('spell_school')
		for i in range(len(spell_names)):
			DungeonsAndDragonsFifthEditionSpell.objects.create(name=spell_names[i], level=spell_levels[i], description=spell_descriptions[i], school=spell_schools[i], character=character)

		return character

class DungeonsAndDragonsFifthEditionCharacter(Character):
	system = "D&D 5e"
	species = models.CharField(max_length=200)
	character_class = models.CharField(max_length=200)
	level = models.PositiveIntegerField(default=1)
	hp_maximum = models.PositiveIntegerField(default=0)
	hp_current = models.PositiveIntegerField(default=0)
	armor_class = models.PositiveIntegerField(default=10)

	description_physical = models.CharField(max_length=20000, default="")
	description_personality = models.CharField(max_length=20000, default="")

	proficiencies = models.CharField(max_length=20000, default="")

	coins_platinum = models.IntegerField(default=0)
	coins_gold = models.IntegerField(default=0)
	coins_electrum = models.IntegerField(default=0)
	coins_silver = models.IntegerField(default=0)
	coins_copper = models.IntegerField(default=0)

	spellcasting_ability = models.CharField(max_length=200, default="")
	spell_slots_level1_current = models.PositiveIntegerField(default=0)
	spell_slots_level1_maximum = models.PositiveIntegerField(default=0)
	spell_slots_level2_current = models.PositiveIntegerField(default=0)
	spell_slots_level2_maximum = models.PositiveIntegerField(default=0)
	spell_slots_level3_current = models.PositiveIntegerField(default=0)
	spell_slots_level3_maximum = models.PositiveIntegerField(default=0)
	spell_slots_level4_current = models.PositiveIntegerField(default=0)
	spell_slots_level4_maximum = models.PositiveIntegerField(default=0)
	spell_slots_level5_current = models.PositiveIntegerField(default=0)
	spell_slots_level5_maximum = models.PositiveIntegerField(default=0)
	spell_slots_level6_current = models.PositiveIntegerField(default=0)
	spell_slots_level6_maximum = models.PositiveIntegerField(default=0)
	spell_slots_level7_current = models.PositiveIntegerField(default=0)
	spell_slots_level7_maximum = models.PositiveIntegerField(default=0)
	spell_slots_level8_current = models.PositiveIntegerField(default=0)
	spell_slots_level8_maximum = models.PositiveIntegerField(default=0)
	spell_slots_level9_current = models.PositiveIntegerField(default=0)
	spell_slots_level9_maximum = models.PositiveIntegerField(default=0)

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
	description = models.CharField(max_length=10000, default="")
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
	
class DungeonsAndDragonsFifthEditionTrait(models.Model):
	name = models.CharField(max_length=200)
	description = models.CharField(max_length=20000)
	character = models.ForeignKey(DungeonsAndDragonsFifthEditionCharacter, on_delete=models.CASCADE)

	def __str__(self):
		return self.character.name + "'s " + self.name
	
class DungeonsAndDragonsFifthEditionSpell(models.Model):
	name = models.CharField(max_length=200)
	level = models.PositiveIntegerField(default=0)
	description = models.CharField(max_length=10000)
	school = models.CharField(max_length=200)
	character = models.ForeignKey(DungeonsAndDragonsFifthEditionCharacter, on_delete=models.CASCADE)

	def __str__(self):
		return self.character.name + "'s " + self.name