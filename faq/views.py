from django.views.generic import ListView, DetailView, TemplateView

from faq.models import Faq

from django.views.generic.edit import FormView
from faq.forms import FaqSearchForm
from django.db.models import Q
from django.shortcuts import render

from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.core.urlresolvers import reverse_lazy
from phtms1.views import LoginRequiredMixin

#--- ListView
class FaqLV(ListView) :
    model = Faq
    template_name = 'faq/faq_all.html'
    context_object_name = 'faqs'
    paginate_by = 3

#--- DetailView
class FaqDV(DetailView) :
    model = Faq

#--- FormView
class SearchFormView(FormView):
    form_class = FaqSearchForm
    template_name = 'faq/faq_search.html'

    def form_valid(self, form) :
        schWord = '%s' % self.request.POST['search_word']
        faq_list = Faq.objects.filter(Q(owner__icontains=schWord) | Q(subject__icontains=schWord) | Q(content__icontains=schWord)).distinct()

        context = {}
        context['form'] = form
        context['search_term'] = schWord
        context['object_list'] = faq_list

        return render(self.request, self.template_name, context)

class FaqCreateView(LoginRequiredMixin, CreateView):
    model = Faq
    fields = ['buz_id','class_kind', 'owner', 'subject', 'content', 'attach', 'passno']
    success_url = reverse_lazy('faq:index')

    def form_valid(self, form):
        form.instance.owner = self.request.user
        return super(FaqCreateView, self).form_valid(form)

class FaqChangeLV(LoginRequiredMixin, ListView):
    template_name = 'faq/faq_change_list.html'

    def get_queryset(self):
        return Faq.objects.filter(owner=self.request.user)

class FaqUpdateView(LoginRequiredMixin, UpdateView) :
    model = Faq
    fields = ['buz_id','class_kind', 'owner', 'subject', 'content', 'attach', 'passno']
    success_url = reverse_lazy('faq:index')

class FaqDeleteView(LoginRequiredMixin, DeleteView) :
    model = Faq
    success_url = reverse_lazy('faq:index')