from django.urls import path

from .views import *

urlpatterns = [
	path('home/', home, name='home'),
    path('character/', character, name='character'),
	path('index/', index, name='index'),
	path('theme-light/', themeToLight, name='theme-light'),
	path('theme-dark/', themeToDark, name='theme-dark'),
	path('theme-hot-dog/', themeToHotDog, name='theme-hot-dog'),
]
