# Generated by Django 5.2 on 2025-04-17 19:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0002_character_rename_usertemplates_usertemplate_and_more"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="DungeonsAndDragons5eCharacter",
            new_name="DungeonsAndDragonsFifthEditionCharacter",
        ),
    ]
