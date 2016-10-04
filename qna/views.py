from django.views.generic import ListView, DetailView, TemplateView

from qna.models import Qna

from django.views.generic.edit import FormView
from qna.forms import QnaSearchForm
from django.db.models import Q
from django.shortcuts import render

from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.core.urlresolvers import reverse_lazy
from phtms1.views import LoginRequiredMixin

#--- ListView
class QnaLV(ListView) :
    model = Qna
    template_name = 'qna/qna_all.html'
    context_object_name = 'qnas'
    paginate_by = 3

#--- DetailView
class QnaDV(DetailView) :
    model = Qna

#--- FormView
class SearchFormView(FormView):
    form_class = QnaSearchForm
    template_name = 'qna/qna_search.html'

    def form_valid(self, form) :
        schWord = '%s' % self.request.POST['search_word']
        qna_list = Qna.objects.filter(Q(owner__icontains=schWord) | Q(subject__icontains=schWord) |
                                      Q(content__icontains=schWord) | Q(answer__icontains=schWord)).distinct()
        context = {}
        context['form'] = form
        context['search_term'] = schWord
        context['object_list'] = qna_list

        return render(self.request, self.template_name, context)

class QnaCreateView(LoginRequiredMixin, CreateView):
    model = Qna
    fields = ['buz_id','class_kind', 'owner', 'subject', 'content', 'answer', 'attach', 'passno']
    success_url = reverse_lazy('qna:index')

    def form_valid(self, form):
        form.instance.owner = self.request.user
        return super(QnaCreateView, self).form_valid(form)

class QnaChangeLV(LoginRequiredMixin, ListView):
    template_name = 'qna/qna_change_list.html'

    def get_queryset(self):
        return Qna.objects.filter(owner=self.request.user)

class QnaUpdateView(LoginRequiredMixin, UpdateView) :
    model = Qna
    fields = ['buz_id','class_kind', 'owner', 'subject', 'content','answer', 'attach', 'passno']
    success_url = reverse_lazy('qna:index')

class QnaDeleteView(LoginRequiredMixin, DeleteView) :
    model = Qna
    success_url = reverse_lazy('qna:index')