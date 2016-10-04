from __future__ import absolute_import, division, print_function
from django.utils.encoding import python_2_unicode_compatible

from django.db import models

from django.core.urlresolvers import reverse

from django.contrib.auth.models import User
from faq.models import *

from enumchoicefield import ChoiceEnum, EnumChoiceField

class Enum_Kind(ChoiceEnum):
    k1 = "전자입찰"
    k2 = "적격심사"
    k3 = "공사관리"
    k4 = "구매대행"
    k5 = "전자투표"
    k6 = "관리비"
    k7 = "회원관리"
    k8 = "포인트관리"
    k9 = "기타"

# Create your models here.

class Refer(models.Model):
    buz_id = models.ForeignKey(
        'faq.Company', on_delete=models.CASCADE,
    )
    class_kind = EnumChoiceField(Enum_Kind)
    owner = models.CharField('Owner.', max_length=20, null=True)
    counter = models.SmallIntegerField('Counter')
    subject = models.CharField('Subject.', max_length=100)
    content = models.TextField('Content', null=True)
    attach = models.FileField('Attachment.', upload_to='uploads/refer/%Y/%m/%d/',
                              max_length=100, blank=True)
    cdate = models.DateTimeField('Create Date', auto_now_add=True)
    mdate = models.DateTimeField('Modify Date', auto_now=True)

    class Meta:
        db_table = 'refer'
        verbose_name_plural = 'refers'
        ordering = ['-mdate']

    def __str__(self):
        return self.subject

    def get_absolute_url(self):
        return reverse('refer:refer_detail', args=(self.id,))

    def get_previous_refer(self):
        return self.get_previous_by_mdate()

    def get_next_refer(self):
        return self.get_next_by_mdate()

    def save(self, *args, **kwargs):
        super(Refer, self).save(*args, **kwargs)