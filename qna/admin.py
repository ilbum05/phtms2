from django.contrib import admin

from qna.models import Qna

# Register your models here.

class QnaAdmin(admin.ModelAdmin):
    list_display = ('buz_id', 'class_kind', 'owner', 'subject', 'content','answer','attach','passno')
    list_filter = ('mdate',)
    search_fields = ('subject', 'content', 'answer')
	
admin.site.register(Qna, QnaAdmin)