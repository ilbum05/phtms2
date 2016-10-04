from django import forms

class ReferSearchForm(forms.Form):
    search_word = forms.CharField(label='Search Word')
