from django.conf.urls import url
from qna.views import *

urlpatterns = [
    url(r'^$', QnaLV.as_view(), name='index'),
    url(r'^qna/$', QnaLV.as_view(), name='qna_list'),
    url(r'^qna/(?P<pk>[-\w]+)/$', QnaDV.as_view(), name='qna_detail'),
    url(r'^search/$', SearchFormView.as_view(), name='search'),
    url(r'^add/$', QnaCreateView.as_view(), name="add"),
    url(r'^change/$', QnaChangeLV.as_view(), name="change"),
    url(r'^(?P<pk>[0-9]+)/update/$', QnaUpdateView.as_view(), name="update"),
    url(r'^(?P<pk>[0-9]+)/delete/$', QnaDeleteView.as_view(), name="delete"),
]