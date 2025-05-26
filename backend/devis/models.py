from django.db import models

class Devis(models.Model):
    numero_opportunite = models.CharField(max_length=100)
    nom_client = models.CharField(max_length=255)
    type_garantie = models.CharField(max_length=100)
    type_bien = models.CharField(max_length=100)
    destination_ouvrage = models.CharField(max_length=100)
    types_travaux = models.CharField(max_length=100)
    cout_ouvrage = models.DecimalField(max_digits=12, decimal_places=2)
    presence_existant = models.BooleanField()
    client_vip = models.BooleanField()
    souhaite_rcmo = models.BooleanField()
    date_creation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.numero_opportunite} - {self.nom_client}"