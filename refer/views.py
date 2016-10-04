from django.views.generic import ListView, DetailView, TemplateView

from refer.models import Refer

from django.views.generic.edit import FormView
from refer.forms import ReferSearchForm
from django.db.models import Q
from django.shortcuts import render

from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.core.urlresolvers import reverse_lazy
from phtms1.views import LoginRequiredMixin

#--- ListView
class ReferLV(ListView) :
    model = Refer
    template_name = 'refer/refer_all.html'
    context_object_name = 'refers'
    paginate_by = 3

#--- DetailView
class ReferDV(DetailView) :
    model = Refer

#--- FormView
class SearchFormView(FormView):
    form_class = ReferSearchForm
    template_name = 'refer/refer_search.html'

    def form_valid(self, form) :
        schWord = '%s' % self.request.POST['search_word']
        refer_list = Refer.objects.filter(Q(owner__icontains=schWord) | Q(subject__icontains=schWord) | Q(content__icontains=schWord)).distinct()

        context = {}
        context['form'] = form
        context['search_term'] = schWord
        context['object_list'] = refer_list

        return render(self.request, self.template_name, context)

class ReferCreateView(LoginRequiredMixin, CreateView):
    model = Refer
    fields = ['buz_id','class_kind', 'owner', 'subject', 'counter', 'content', 'attach']
    success_url = reverse_lazy('refer:index')

    def form_valid(self, form):
        form.instance.owner = self.request.user
        return super(ReferCreateView, self).form_valid(form)

class ReferChangeLV(LoginRequiredMixin, ListView):
    template_name = 'refer/refer_change_list.html'

    def get_queryset(self):
        return Refer.objects.filter(owner=self.request.user)

class ReferUpdateView(LoginRequiredMixin, UpdateView) :
    model = Refer
    fields = ['buz_id','class_kind', 'owner', 'subject', 'counter', 'content', 'attach']
    success_url = reverse_lazy('refer:index')

class ReferDeleteView(LoginRequiredMixin, DeleteView) :
    model = Refer
    success_url = reverse_lazy('refer:index')