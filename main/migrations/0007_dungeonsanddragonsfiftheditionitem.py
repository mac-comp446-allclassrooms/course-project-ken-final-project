# Generated by Django 5.2 on 2025-04-22 19:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0006_delete_dungeonsanddragonsfiftheditionitem"),
    ]

    operations = [
        migrations.CreateModel(
            name="DungeonsAndDragonsFifthEditionItem",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=200)),
                ("description", models.CharField(max_length=10000)),
                (
                    "character",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="main.dungeonsanddragonsfiftheditioncharacter",
                    ),
                ),
            ],
        ),
    ]
