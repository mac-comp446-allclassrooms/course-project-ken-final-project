from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

# view page for the home
def home(request):
	characters = request.user.character_set.all()
	context = {
		"characters" : characters
	}
	return render(request, 'main/menu.html', context)