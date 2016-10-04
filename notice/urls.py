from django.conf.urls import url
from notice.views import *

urlpatterns = [
    url(r'^$', NoticeLV.as_view(), name='index'),
    url(r'^notice/$', NoticeLV.as_view(), name='notice_list'),
    url(r'^notice/(?P<pk>[-\w]+)/$', NoticeDV.as_view(), name='notice_detail'),
    url(r'^search/$', SearchFormView.as_view(), name='search'),
    url(r'^add/$', NoticeCreateView.as_view(), name="add"),
    url(r'^change/$', NoticeChangeLV.as_view(), name="change"),
    url(r'^(?P<pk>[0-9]+)/update/$', NoticeUpdateView.as_view(), name="update"),
    url(r'^(?P<pk>[0-9]+)/delete/$', NoticeDeleteView.as_view(), name="delete"),
] 