from django.conf.urls import url
from faq.views import *

urlpatterns = [
# Example: /
    url(r'^$', FaqLV.as_view(), name='index'),

    # Example: /post/ (same as /)
    url(r'^faq/$', FaqLV.as_view(), name='faq_list'),

    # Example: /post/django-example/
    url(r'^faq/(?P<pk>[-\w]+)/$', FaqDV.as_view(), name='faq_detail'),

    # Example: /search/
    url (r'^search/$', SearchFormView.as_view(), name='search'),

    # Example: /add/
    url(r'^add/$',
        FaqCreateView.as_view(), name="add",
    ),

    # Example: /change/
    url(r'^change/$',
        FaqChangeLV.as_view(), name="change",
    ),

    # Example: /99/update/
    url(r'^(?P<pk>[0-9]+)/update/$',
        FaqUpdateView.as_view(), name="update",
    ),

    # Example: /99/delete/
    url(r'^(?P<pk>[0-9]+)/delete/$',
        FaqDeleteView.as_view(), name="delete",
    ),
]