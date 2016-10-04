from django.contrib import admin

from refer.models import Refer

# Register your models here.

class ReferAdmin(admin.ModelAdmin):
    list_display = ('buz_id', 'class_kind', 'owner', 'counter','subject', 'content','attach')
    list_filter = ('mdate',)
    search_fields = ('subject', 'content')
	
admin.site.register(Refer, ReferAdmin)