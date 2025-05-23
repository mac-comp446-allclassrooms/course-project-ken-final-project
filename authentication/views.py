from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import *

# make a view request for the home page
# def home(request):
# 	return render(request, 'menu.html')

# make a view request for the login page
def login_page(request):
	if request.method == 'POST':
		if 'theme-submit' in request.POST:
			changeTheme(request)
			return redirect('/login/')

		un = request.POST.get('username')
		pw = request.POST.get('password')

		# does the username exist?
		if not User.objects.filter(username=un).exists():
			messages.error(request, 'Invalid Username')
			return redirect('/login/')

		user = authenticate(username=un, password=pw)

		if user is None:
			#incorrect password
			messages.error(request, 'Invalid Password')
			return redirect('/login/')
		
		#login successful!
		login(request, user)
		return redirect('/home/')
	#GET request
	theme = request.session.get('theme', 'light-theme')
	context = {'theme': theme}
	return render(request, 'authentication/login.html', context)

# make view function for registration page
def register_page(request):
	if request.method == 'POST':
		if 'theme-submit' in request.POST:
			changeTheme(request)
			return redirect('/register/')

		fn = ''
		ln = ''
		un = request.POST.get('username')
		pw = request.POST.get('password')
		print('un is', un)
		print('pw is', pw)
		user = User.objects.filter(username=un)
		
		if user.exists():
			messages.info(request, 'Username already taken')
			return redirect('/register/')

		user = User.objects.create_user(first_name=fn, last_name=ln, username=un)
		user.set_password(pw)
		user.save()

		messages.info(request, 'Account created successfully!')
		return redirect('/login/')
	# this is a a get request
	theme = request.session.get('theme', 'light-theme')
	context = {'theme': theme}
	return render(request, 'authentication/register.html', context)


# NOT A VIEW, JUST A HELPER FUNCTION
def changeTheme(request):
	request.session['theme'] = request.POST.get('theme')
	request.session.save()

# much of this was helped by https://www.geeksforgeeks.org/user-authentication-system-using-django/
