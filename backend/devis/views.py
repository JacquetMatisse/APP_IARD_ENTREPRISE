from rest_framework import generics
from .models import Devis
from .serializers import DevisSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import FileResponse, Http404
from docx import Document
import os
from datetime import datetime
from docx2pdf import convert


class DevisListCreateView(generics.ListCreateAPIView):
    queryset = Devis.objects.all().order_by('-date_creation')
    serializer_class = DevisSerializer

class DevisWordView(APIView):
    def get(self, request, pk):
        try:
            devis = Devis.objects.get(pk=pk)
        except Devis.DoesNotExist:
            raise Http404

        # Génération du document Word
        doc = Document()
        doc.add_heading('TARIFICATION INDICATIVE', 0)
        doc.add_paragraph(f"Numéro d'opportunité : {devis.numero_opportunite}")
        doc.add_paragraph(f"Nom du client : {devis.nom_client}")
        doc.add_paragraph(f"Type de garantie : {devis.type_garantie}")
        doc.add_paragraph(f"Type de bien : {devis.type_bien}")
        doc.add_paragraph(f"Destination de l'ouvrage : {devis.destination_ouvrage}")
        doc.add_paragraph(f"Types de travaux : {devis.types_travaux}")
        doc.add_paragraph(f"Coût de l'ouvrage : {devis.cout_ouvrage} €")
        doc.add_paragraph(f"Présence d'existant : {'Oui' if devis.presence_existant else 'Non'}")
        doc.add_paragraph(f"Client VIP : {'Oui' if devis.client_vip else 'Non'}")
        doc.add_paragraph(f"Souhaite RCMO : {'Oui' if devis.souhaite_rcmo else 'Non'}")
        # Ajoute d'autres champs si besoin

        now = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"Proposition_commerciale_{devis.numero_opportunite}_{now}.docx"
        filepath = os.path.join("/tmp", filename)
        doc.save(filepath)

        return FileResponse(open(filepath, 'rb'), as_attachment=True, filename=filename)
    
class DevisPDFView(APIView):
    def get(self, request, pk):
        try:
            devis = Devis.objects.get(pk=pk)
        except Devis.DoesNotExist:
            raise Http404

        # Génère d'abord le Word
        doc = Document()
        doc.add_heading('TARIFICATION INDICATIVE', 0)
        doc.add_paragraph(f"Numéro d'opportunité : {devis.numero_opportunite}")
        doc.add_paragraph(f"Nom du client : {devis.nom_client}")
        doc.add_paragraph(f"Type de garantie : {devis.type_garantie}")
        doc.add_paragraph(f"Type de bien : {devis.type_bien}")
        doc.add_paragraph(f"Destination de l'ouvrage : {devis.destination_ouvrage}")
        doc.add_paragraph(f"Types de travaux : {devis.types_travaux}")
        doc.add_paragraph(f"Coût de l'ouvrage : {devis.cout_ouvrage} €")
        doc.add_paragraph(f"Présence d'existant : {'Oui' if devis.presence_existant else 'Non'}")
        doc.add_paragraph(f"Client VIP : {'Oui' if devis.client_vip else 'Non'}")
        doc.add_paragraph(f"Souhaite RCMO : {'Oui' if devis.souhaite_rcmo else 'Non'}")
        # Ajoute d'autres champs si besoin

        now = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename_docx = f"Proposition_commerciale_{devis.numero_opportunite}_{now}.docx"
        filename_pdf = f"Proposition_commerciale_{devis.numero_opportunite}_{now}.pdf"
        filepath_docx = os.path.join("/tmp", filename_docx)
        filepath_pdf = os.path.join("/tmp", filename_pdf)
        doc.save(filepath_docx)

        # Conversion en PDF
        convert(filepath_docx, filepath_pdf)

        return FileResponse(open(filepath_pdf, 'rb'), as_attachment=True, filename=filename_pdf)