from django import forms

class QnaSearchForm(forms.Form):
    search_word = forms.CharField(label='Search Word')
