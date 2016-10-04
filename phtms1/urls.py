from django.conf.urls import include, url
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings

from phtms1.views import HomeView, EbidView, EpmsView, EmroView,  EvoteView
from phtms1.views import EintroView, EprivacyView, EagreeView, EsiteView
from phtms1.views import EstoryView, EmapView

from phtms1.views import UserCreateView, UserCreateDoneTV

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/', include('django.contrib.auth.urls')),
    url(r'^accounts/register/$', UserCreateView.as_view(), name='register'),
    url(r'^accounts/register/done/$', UserCreateDoneTV.as_view(), name='register_done'),

	url(r'^$', HomeView.as_view(), name='home'),
    url(r'^faq/', include('faq.urls', namespace='faq')),
	url(r'^notice/', include('notice.urls', namespace='notice')),
	url(r'^qna/', include('qna.urls', namespace='qna')),
	url(r'^refer/', include('refer.urls', namespace='refer')),

	url(r'^evote/$', EvoteView.as_view(), name='evote'),
	url(r'^ebid/$',  EbidView.as_view(), name='ebid'),
	url(r'^emro/$', EmroView.as_view(), name='emro'),
	url(r'^epms/$', EpmsView.as_view(), name='epms'),
	url(r'^eprivacy/$', EprivacyView.as_view(), name='eprivacy'),
	url(r'^eintro/$', EintroView.as_view(), name='eintro'),
	url(r'^estory/$', EstoryView.as_view(), name='estory'),
	url(r'^eagree/$', EagreeView.as_view(), name='eagree'),
	url(r'^emap/$', EmapView.as_view(), name='emap'),
	url(r'^esite/$', EsiteView.as_view(), name='esite'),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

