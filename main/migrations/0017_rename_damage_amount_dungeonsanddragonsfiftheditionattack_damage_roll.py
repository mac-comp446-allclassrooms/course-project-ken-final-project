# Generated by Django 5.2 on 2025-05-01 20:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0016_dungeonsanddragonsfiftheditionabilityscore_saving_throw"),
    ]

    operations = [
        migrations.RenameField(
            model_name="dungeonsanddragonsfiftheditionattack",
            old_name="damage_amount",
            new_name="damage_roll",
        ),
    ]
