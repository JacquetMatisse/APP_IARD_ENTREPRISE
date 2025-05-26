from django.urls import path
from .views import DevisListCreateView, DevisWordView, DevisPDFView

urlpatterns = [
    path('devis/', DevisListCreateView.as_view(), name='devis-list-create'),
    path('devis/<int:pk>/docx/', DevisWordView.as_view(), name='devis-word'),
    path('devis/<int:pk>/pdf/', DevisPDFView.as_view(), name='devis-pdf'),
]