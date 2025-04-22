from django.shortcuts import redirect, render
from django.http import HttpResponse
from model_utils.managers import InheritanceManager

from main.models import Character

# Create your views here.

# view page for home menu
def home(request):
	# POST request, handles opening and deleting characters
	if (request.method == 'POST'):
		if 'open' in request.POST:
			opened_character = Character.objects.get(user=request.user, id=request.POST.get('character-id'))
			print("open: " + opened_character.name)
			# return redirect('/character/', opened_character)
		elif 'delete' in request.POST:
			print("delete!")
			Character.objects.get(user=request.user, id=request.POST.get('character-id')).delete()
			return redirect('/home/')

	# GET request
	characters = Character.objects.filter(user=request.user).select_subclasses()
	context = {
		"characters" : characters
	}
	return render(request, 'main/menu.html', context)

# view page for an individual character
def character(request, character):
	context = {
		"character" : character
	}

	return render(request, 'main/character-sheet.html', context)