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
    # Montants de garanties
    garantie_ouvrage = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    garantie_rc = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    garantie_maintenance = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    garantie_mesure_conservatoire = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    # Montants de franchise
    franchise_batiment = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    franchise_cat_nat = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    franchise_rc_maitre = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    franchise_rc_intervenant = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    franchise_maintenance = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    # Champs vendeur et taux/primes
    vendeur = models.CharField(max_length=100, null=True, blank=True)
    taux_seul_do = models.DecimalField(max_digits=6, decimal_places=3, null=True, blank=True)
    taux_seul_trc = models.DecimalField(max_digits=6, decimal_places=3, null=True, blank=True)
    prime_seule_do = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    prime_seule_trc = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    date_creation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.numero_opportunite} - {self.nom_client}"