from django.views.generic import ListView, DetailView, TemplateView

from notice.models import Notice

from django.views.generic.edit import FormView
from notice.forms import NoticeSearchForm
from django.db.models import Q
from django.shortcuts import render

from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.core.urlresolvers import reverse_lazy
from phtms1.views import LoginRequiredMixin

#--- ListView
class NoticeLV(ListView) :
    model = Notice
    template_name = 'notice/notice_all.html'
    context_object_name = 'notices'
    paginate_by = 10

#--- DetailView
class NoticeDV(DetailView) :
    model = Notice

#--- FormView
class SearchFormView(FormView):
    form_class = NoticeSearchForm
    template_name = 'notice/notice_search.html'

    def form_valid(self, form) :
        schWord = '%s' % self.request.POST['search_word']
        notice_list = Notice.objects.filter(Q(owner__icontains=schWord) | Q(subject__icontains=schWord) | Q(content__icontains=schWord)).distinct()

        context = {}
        context['form'] = form
        context['search_term'] = schWord
        context['object_list'] = notice_list

        return render(self.request, self.template_name, context)

class NoticeCreateView(LoginRequiredMixin, CreateView):
    model = Notice
    fields = ['buz_id','class_kind', 'owner', 'subject', 'counter', 'content', 'attach']
    success_url = reverse_lazy('notice:index')

    def form_valid(self, form):
        form.instance.owner = self.request.user
        return super(NoticeCreateView, self).form_valid(form)

class NoticeChangeLV(LoginRequiredMixin, ListView):
    template_name = 'notice/notice_change_list.html'

    def get_queryset(self):
        return Notice.objects.filter(owner=self.request.user)

class NoticeUpdateView(LoginRequiredMixin, UpdateView) :
    model = Notice
    fields = ['buz_id','class_kind', 'owner', 'subject', 'counter', 'content', 'attach']
    success_url = reverse_lazy('notice:index')

class NoticeDeleteView(LoginRequiredMixin, DeleteView) :
    model = Notice
    success_url = reverse_lazy('notice:index')
