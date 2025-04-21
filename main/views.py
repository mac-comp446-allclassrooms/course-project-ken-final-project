from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

# view page for the home
def home(request):
	characters = request.user.character_set.all()
	for character in characters:
		try:
			character = character.child
		except character.DoesNotExist:
			pass

	context = {
		"characters" : characters
	}

	return render(request, 'main/menu.html', context)