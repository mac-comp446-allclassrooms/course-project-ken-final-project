from django.shortcuts import render
from django.http import HttpResponse
from model_utils.managers import InheritanceManager

from main.models import Character

# Create your views here.

# view page for the home
def home(request):
	characters = Character.objects.filter(user=request.user).select_subclasses()

	context = {
		"characters" : characters
	}

	return render(request, 'main/menu.html', context)