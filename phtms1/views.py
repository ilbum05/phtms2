from django.views.generic.base import TemplateView

from django.views.generic.edit import CreateView
from django.contrib.auth.forms import UserCreationForm
from django.core.urlresolvers import reverse_lazy

from django.contrib.auth.decorators import login_required

# Create your views here.

#--- TemplateView
class HomeView(TemplateView):
    template_name = 'home.html'

#--- User Creation
class UserCreateView(CreateView):
    template_name = 'registration/register.html'
    form_class = UserCreationForm
    success_url = reverse_lazy('register_done')

class UserCreateDoneTV(TemplateView):
    template_name = 'registration/register_done.html'

class LoginRequiredMixin(object):
    @classmethod
    def as_view(cls, **initkwargs):
        view = super(LoginRequiredMixin, cls).as_view(**initkwargs)
        return login_required(view)	
		
class EvoteView(TemplateView):
    template_name = 'evote.html'
	
class EbidView(TemplateView):
    template_name = 'ebid.html'
	
class EmroView(TemplateView):
    template_name = 'emro.html'
	
class EpmsView(TemplateView):
    template_name = 'epms.html'
	
class EphtmsView(TemplateView):
    template_name = 'ephtms.html'
	
class EintroView(TemplateView):
    template_name = 'eintro.html'
	
class EprivacyView(TemplateView):
    template_name = 'eprivacy.html'
	
class EagreeView(TemplateView):
    template_name = 'eagree.html'
	
class EsiteView(TemplateView):
    template_name = 'esite.html'
	
class EmapView(TemplateView):
    template_name = 'emap.html'
	
class EstoryView(TemplateView):
    template_name = 'estory.html'