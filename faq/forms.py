from django import forms

class FaqSearchForm(forms.Form):
    search_word = forms.CharField(label='Search Word')
