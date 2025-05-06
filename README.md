# RPMe: A Character Manage for Tabletop Roleplaying Games

This is a web-based app for creating character sheets for tabletop roleplaying games, which can be persistently saved to a server (project is not yet deployed, so they are saved locally).

It was developed at Macalester College, during the 2025 Spring semester, by Ev K., Nick D., and Kaliana A.

## Documentation

### Running Dev Server
1.cd into django_auth
2.Create a virtual environment that will exist on your machine (only do this once, this is automatically gitignored):
 - $ python -m venv .venv
3.Run these:
 - $ source .venv/bin/activate
 - (.venv) $ python3 -m pip install -r requirements.txt
 - python manage.py runserver
4.Open the link printed by the console

### Tech Stack

It uses Django as the primary component of the tech stack, and to handle the backend database where characters are stored.

HTML and CSS are used, with some additional Django-specific features (i.e. Django Templating Language).

JS is used for some interactivity, particularly when adding new elements to an opened character sheet.

## Developer Guide

This app is intended to be open-source, wherein new types of character sheets can be added fairly easily. This functionally isn't fully implemented yet.