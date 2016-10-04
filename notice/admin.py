from django.contrib import admin

from notice.models import Notice

# Register your models here.

class NoticeAdmin(admin.ModelAdmin):
    list_display = ('buz_id', 'class_kind', 'owner', 'counter','subject', 'content','attach')
    list_filter = ('mdate',)
    search_fields = ('subject', 'content')
	
admin.site.register(Notice, NoticeAdmin)