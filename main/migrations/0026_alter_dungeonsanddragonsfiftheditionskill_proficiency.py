# Generated by Django 5.2 on 2025-05-05 20:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "main",
            "0025_rename_dungeonsanddragonsfiftheditionfeature_dungeonsanddragonsfiftheditiontrait",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="dungeonsanddragonsfiftheditionskill",
            name="proficiency",
            field=models.DecimalField(decimal_places=1, default=0, max_digits=2),
        ),
    ]
