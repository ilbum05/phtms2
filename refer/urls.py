from django.conf.urls import url
from refer.views import *

urlpatterns = [
    url(r'^$', ReferLV.as_view(), name='index'),
    url(r'^refer/$', ReferLV.as_view(), name='refer_list'),
    url(r'^refer/(?P<pk>[-\w]+)/$', ReferDV.as_view(), name='refer_detail'),
    url(r'^search/$', SearchFormView.as_view(), name='search'),
    url(r'^add/$', ReferCreateView.as_view(), name="add"),
    url(r'^change/$', ReferChangeLV.as_view(), name="change"),
    url(r'^(?P<pk>[0-9]+)/update/$', ReferUpdateView.as_view(), name="update"),
    url(r'^(?P<pk>[0-9]+)/delete/$', ReferDeleteView.as_view(), name="delete"),
]