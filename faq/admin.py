from django.contrib import admin

from faq.models import Company, Faq

# Register your models here.

class FaqInline(admin.StackedInline):
    model = Faq
    extra = 2

class CompanyAdmin(admin.ModelAdmin):
    inlines = [FaqInline]
    list_display  = ('buz_no','buz_type','zipcode','point')

class FaqAdmin(admin.ModelAdmin):
    list_display = ('buz_id', 'class_kind', 'owner', 'subject', 'content','attach','passno')
    list_filter = ('mdate',)
    search_fields = ('subject', 'content')

admin.site.register(Company, CompanyAdmin)
admin.site.register(Faq, FaqAdmin)