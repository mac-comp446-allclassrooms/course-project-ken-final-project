# Generated by Django 5.2 on 2025-04-22 19:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0004_dungeonsanddragonsfiftheditioncharacter_level"),
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
            ],
        ),
        migrations.RemoveField(
            model_name="character",
            name="system",
        ),
    ]
