# Generated by Django 5.2 on 2025-04-24 17:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0012_dungeonsanddragonsfiftheditionattack"),
    ]

    operations = [
        migrations.AddField(
            model_name="dungeonsanddragonsfiftheditioncharacter",
            name="hp_current",
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name="dungeonsanddragonsfiftheditioncharacter",
            name="hp_maximum",
            field=models.PositiveIntegerField(default=0),
        ),
    ]
