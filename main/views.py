from django.shortcuts import redirect, render
from django.http import Http404, HttpResponse
from model_utils.managers import InheritanceManager

from main.models import Character, DungeonsAndDragonsFifthEditionCharacter

# Create your views here.

# view page for home menu
def home(request):
	# POST request, handles opening and deleting characters
	if (request.method == 'POST'):
		if 'theme-submit' in request.POST:
			changeTheme(request)
			return redirect('/home/')
		elif 'open' in request.POST:
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
			new_character = DungeonsAndDragonsFifthEditionCharacter.objects.create_blank_dnd5e_character(request.user) # Currently creates a 5e character, does not support dynamic templating at the moment.
			print("opening new character")
			request.session['character-id'] = new_character.id
			return redirect('/character/')

	# GET request
	theme = request.session.get('theme', 'light-theme')
	characters = Character.objects.filter(user=request.user).select_subclasses()
	context = {
		"characters" : characters,
		'theme': theme
	}
	request.session['theme'] = theme
	return render(request, 'main/menu.html', context)

# view page for an individual character
def character(request):
	# POST request, handles saving characters
	if (request.method == 'POST'):
		if 'theme-submit' in request.POST:
			changeTheme(request)
			print(request.session.get('theme'))
			return redirect('/character/')
		else:
			# Gets system string of opened character.
			system = Character.objects.get_subclass(user=request.user, id=request.session['character-id']).system
			if (system == "D&D 5e"):
				updated_character = DungeonsAndDragonsFifthEditionCharacter.objects.save_dnd5e_character(request.user, request.POST)
			else:
				raise Http404("Game system not found!")
			print("saving character")
			updated_character.save()
			Character.objects.get_subclass(user=request.user, id=request.session['character-id']).delete()
			request.session['character-id'] = updated_character.id	# set new character's id as current
			return redirect('/home/')
	
	# GET request
	character = Character.objects.get_subclass(user=request.user, id=request.session['character-id'])
	ability_scores = character.dungeonsanddragonsfiftheditionabilityscore_set.all()
	skills = character.dungeonsanddragonsfiftheditionskill_set.all()
	traits = character.dungeonsanddragonsfiftheditiontrait_set.all()
	items = character.dungeonsanddragonsfiftheditionitem_set.all()
	attacks = character.dungeonsanddragonsfiftheditionattack_set.all()
	spells = character.dungeonsanddragonsfiftheditionspell_set.all()
	theme = request.session.get('theme', 'light-theme')

	context = {
		"character" : character,
		"ability_scores" : ability_scores,
		"skills" : skills,
		"traits" : traits,
		"items" : items,
		"attacks" : attacks,
		"spells" : spells,
		'theme': theme,
	}
	try:
		if character.system == "D&D 5e":
			return render(request, 'main/dnd5e-character-sheet.html', context)
		else: 
			raise Http404("Game system not found!")
	except:
		raise Http404("Character not found!")


def themeToLight(request):
	# current_theme = request.session.get('theme', 'light') # the second value is the default if one isn't present
	request.session['theme'] = 'light-theme'
	request.session.save()
	return HttpResponse('Theme set to light')

def themeToDark(request):
	request.session['theme'] = 'dark-theme'
	request.session.save()
	return HttpResponse('Theme set to dark')

def themeToHotDog(request):
	request.session['theme'] = 'hot-dog-theme'
	request.session.save()
	return HttpResponse('Theme set to hot dog stand')


def index(request):
	template_name='index.html'
	return render(request, 'main/index.html')


# NOT A VIEW, JUST A HELPER FUNCTION
def changeTheme(request):
	request.session['theme'] = request.POST.get('theme')
	request.session.save()
