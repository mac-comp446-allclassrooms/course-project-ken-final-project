from django.shortcuts import redirect, render
from django.http import Http404, HttpResponse
from model_utils.managers import InheritanceManager

from main.models import Character, DungeonsAndDragonsFifthEditionCharacter

# Create your views here.

# view page for home menu
def home(request):
	# POST request, handles opening and deleting characters
	if (request.method == 'POST'):
		if 'open' in request.POST:
			opened_character = Character.objects.get(user=request.user, id=request.POST.get('character-id'))
			print("open: " + opened_character.name)
			request.session['character-id'] = request.POST.get('character-id')
			return redirect('/character/')
		elif 'delete' in request.POST:
			print("delete!")
			Character.objects.get(user=request.user, id=request.POST.get('character-id')).delete()
			return redirect('/home/')
		elif 'new-character' in request.POST:
			print("new character!")
			new_character = DungeonsAndDragonsFifthEditionCharacter.objects.create_dnd5e_character(request.user) # Currently creates a 5e character, does not support dynamic templating at the moment.
			print("opening new character")
			request.session['character-id'] = new_character.id
			return redirect('/character/')

	# GET request
	characters = Character.objects.filter(user=request.user).select_subclasses()
	context = {
		"characters" : characters
	}
	return render(request, 'main/menu.html', context)

# view page for an individual character
def character(request):
	character = Character.objects.get_subclass(user=request.user, id=request.session['character-id'])
	ability_scores = character.dungeonsanddragonsfiftheditionabilityscore_set.all()
	skills = character.dungeonsanddragonsfiftheditionskill_set.all()
	items = character.dungeonsanddragonsfiftheditionitem_set.all()
	attacks = character.dungeonsanddragonsfiftheditionattack_set.all()

	context = {
		"character" : character,
		"ability_scores" : ability_scores,
		"skills" : skills,
		"items" : items,
		"attacks" : attacks
	}
	try:
		if character.system == "D&D 5e":
			return render(request, 'main/dnd5e-character-sheet.html', context)
		else: 
			raise Http404("Game system not found!")
	except:
		raise Http404("Character not found!")