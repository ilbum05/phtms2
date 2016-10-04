from __future__ import absolute_import, division, print_function
from django.utils.encoding import python_2_unicode_compatible

from django.db import models
from django.core.urlresolvers import reverse

from django.contrib.auth.models import User

from enumchoicefield import ChoiceEnum, EnumChoiceField
class Enum_Buztype(ChoiceEnum):
    m = "시스템 관리회사"
    p = "수요처"
    s = "공급처"

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

@python_2_unicode_compatible
class Company(models.Model):
    buz_no = models.CharField('VAT No.', max_length=10, primary_key=True)
    buz_type = EnumChoiceField(Enum_Buztype)
    zipcode = models.CharField('Zip-Code.', max_length=5)
    point = models.SmallIntegerField('Point')
    cdate = models.DateTimeField('Create Date', auto_now_add=True)
    mdate = models.DateTimeField('Modify Date', auto_now=True)

    class Meta:
        db_table = 'company'


    def __str__(self):
        return self.buz_no

class Faq(models.Model):
    buz_id = models.ForeignKey(
        'Company', on_delete=models.CASCADE,
    )
    class_kind = EnumChoiceField(Enum_Kind)
    owner = models.CharField('Owner.', max_length=20, null=True)
    subject = models.CharField('Subject.', max_length=100)
    content = models.TextField('Content', null=True)
    attach = models.FileField('Attachment.', upload_to='uploads/faq/%Y/%m/%d/',
                              max_length=100, blank=True)
    passno = models.CharField('Password.', max_length=4, null=True,
                              help_text=('Required. 4 digits Only.'))
    cdate = models.DateTimeField('Create Date', auto_now_add=True)
    mdate = models.DateTimeField('Modify Date', auto_now=True)

    class Meta:
        db_table = 'faq'
        verbose_name_plural = 'faqs'
        ordering = ['-mdate']


    def __str__(self):
        return self.subject

    def get_absolute_url(self):
        return reverse('faq:faq_detail', args=(self.id,))

    def get_previous_faq(self):
        return self.get_previous_by_mdate()

    def get_next_faq(self):
        return self.get_next_by_mdate()

    def save(self, *args, **kwargs):
        super(Faq, self).save(*args, **kwargs)