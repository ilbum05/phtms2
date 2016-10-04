from __future__ import absolute_import, division, print_function
from django.utils.encoding import python_2_unicode_compatible

from django.db import models
from django.core.urlresolvers import reverse

from django.contrib.auth.models import User

from enumchoicefield import ChoiceEnum, EnumChoiceField


# Create your models here.
class Enum_Agent(ChoiceEnum):
    a21 = "서울-강동"
    a22 = "서울-강서"
    a23 = "서울-강남"
    a24 = "서울-강북"
    a31 = "경기-동부"
    a32 = "경기-서부"
    a33 = "경기-남부"
    a34 = "경기-북부"
    a02 = "부산"
    a03 = "인천"
    a04 = "대전"
    a05 = "광주"
    a06 = "대구"
    a07 = "울산"
    a08 = "세종"
    a09 = "제주"
    a10 = "강원"
    a12 = "충북"
    a13 = "충남"
    a14 = "전북"
    a15 = "전남"
    a16 = "경북"
    a17 = "경남"


class Enum_Board(ChoiceEnum):
    c = "운영위원회 대표"
    a = "운영위원회 감사"
    e = "운영위원회 위원"
    w = "부녀회 회장"
    s = "부녀회 총무"
    l = "부녀회 회원"
    n = "입주민"


class Enum_Buztype(ChoiceEnum):
    m = "시스템 관리회사"
    p = "수요처"
    s = "공급처"


class Enum_Item(ChoiceEnum):
    o = "사무용품"
    c = "소모품"
    e = "전기용품"
    t = "치공구"
    z = "기타"


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


class Enum_Point(ChoiceEnum):
    p1 = "아파트 회원 가입"
    p2 = "공급처 가입"
    p3 = "낙찰-수요처"
    p4 = "낙찰-공급처"
    p5 = "소모품 사용"
    p6 = "공사관리"
    p7 = "전자투표 소모"
    p8 = "포인트 구매"
    p9 = "기타"


class Enum_Region(ChoiceEnum):
    r00 = "전국"
    r01 = "서울"
    r02 = "부산"
    r03 = "인천"
    r04 = "대전"
    r05 = "광주"
    r06 = "대구"
    r07 = "울산"
    r08 = "세종"
    r09 = "제주"
    r10 = "강원"
    r11 = "경기"
    r12 = "충북"
    r13 = "충남"
    r14 = "전북"
    r15 = "전남"
    r16 = "경북"
    r17 = "경남"


class Enum_Rnr(ChoiceEnum):
    r1 = "대표"
    r2 = "영업 관리자"
    r3 = "임직원"
    r4 = "시스템 관리자"


class Enum_Unit(ChoiceEnum):
    bg = "Baggage"
    bx = "Box"
    ea = "Each"
    pk = "Package"
    oz = "Others"


class Enum_User(ChoiceEnum):
    u1 = "아파트 대표"
    u2 = "관리소장"
    u3 = "관리실 실무자"
    u4 = "아파트 입주민"
    u5 = "공급처 대표"
    u6 = "공급처 실무자"


class Enum_Vote(ChoiceEnum):
    y = "가부형"
    s = "선출형"


class Enum_Yesno(ChoiceEnum):
    y = "예"
    n = "아니오"


class Enum_Svc(ChoiceEnum):
    s1 = "물품구매"
    s2 = "공사"
    s3 = "용역"
    s4 = "매각"


class Enum_Svcpjt(ChoiceEnum):
    sp01 = "공사 유형 01"
    sp02 = "공사 유형 02"
    sp03 = "공사 유형 03"
    sp04 = "공사 유형 04"
    sp05 = "공사 유형 05"
    sp06 = "공사 유형 06"
    sp07 = "공사 유형 07"
    sp08 = "공사 유형 08"
    sp09 = "공사 유형 09"
    sp10 = "공사 유형 10"
    sp11 = "공사 유형 11"
    sp12 = "공사 유형 12"
    sp13 = "공사 유형 13"


class Enum_Svclbr(ChoiceEnum):
    sl01 = "공사 유형 01"
    sl02 = "공사 유형 02"
    sl03 = "공사 유형 03"
    sl04 = "공사 유형 04"
    sl05 = "공사 유형 05"
    sl06 = "공사 유형 06"
    sl07 = "공사 유형 07"
    sl08 = "공사 유형 08"
    sl09 = "공사 유형 09"
    sl10 = "공사 유형 10"
    sl11 = "공사 유형 11"
    sl12 = "공사 유형 12"
    sl13 = "공사 유형 13"


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
    buz_no = models.ForeignKey(
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