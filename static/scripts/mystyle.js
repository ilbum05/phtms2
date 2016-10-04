window.name='main';

//가운데 popup
function CPopup_Window(purl,pname,pwidth,pheight,ptoolbar,plocation,pstatus,pmenubar,pscrollbars,presizable){
	var window_left = (screen.width - pwidth) / 2;
	var window_top = (screen.height - pheight) / 2;
	winprops = 'top='+window_top+',left='+window_left+',height='+pheight+',width='+pwidth+',toolbar='+ptoolbar+',location='+plocation+',status='+pstatus+',menubar='+pmenubar+',scrollbars='+pscrollbars+',resizable='+presizable;
	win = window.open(purl, pname, winprops)
	if(parseInt(navigator.appVersion) >= 4){ win.window.focus(); }
}
//0,0좌표에 popup
function LPopup_Window(purl,pname,pwidth,pheight,ptoolbar,plocation,pstatus,pmenubar,pscrollbars,presizable){
	var window_left = 0;
	var window_top = 0;
	pwidth = pwidth - 10;
	pheight = pheight - 25;
	
	winprops = 'top='+window_top+',left='+window_left+',height='+pheight+',width='+pwidth+',toolbar='+ptoolbar+',location='+plocation+',status='+pstatus+',menubar='+pmenubar+',scrollbars='+pscrollbars+',resizable='+presizable;
	win = window.open(purl, pname, winprops)
	if(parseInt(navigator.appVersion) >= 4){ win.window.focus(); }
}

// 모달창
function Modal_Window(purl,pname,ptop,pleft,pwidth,pheight,phelp,presizable,pstatus,pscroll,pcenter){ 
	if(pcenter=="yes"){
		var pleft = (screen.width - pwidth) / 2;
		var ptop = (screen.height - pheight) / 2;
	}
winprops = 'dialogTop:'+ptop+'px; dialogLeft:'+pleft+'px; dialogWidth:'+pwidth+'px;dialogHeight:'+pheight+'px; help:'+phelp+'; resizable:'+presizable+'; status:'+pstatus+'; scroll:'+pscroll+'; center:'+pcenter+';';
showModalDialog(purl, pname, winprops); 
} 

//쿠키 저장함수
function setCookie(name,value,expiredays){ 
	var todayDate = new Date(); 
  todayDate.setDate(todayDate.getDate() + expiredays); 
  document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
} 

// 쿠키 불러오는 함수
function getCookie(Name){
  var search = Name + "=";
  if(document.cookie.length > 0){                    // if there are any cookies
    offset = document.cookie.indexOf(search);
    if(offset != -1){                                               // if cookie exists
       offset += search.length;                             // set index of beginning of value
       end = document.cookie.indexOf(";", offset);   // set index of end of cookie value
       if(end == -1) 
          end = document.cookie.length;
       return unescape(document.cookie.substring(offset, end));
    } 
 }
}

// 즐겨찿기 시작//
/*/ <a href="http://www.i-plan.co.kr"  onClick="javascript:bookmarksite('타이틀', 'http://www.i-plan.co.kr'); return false;" >즐겨찾기 추가하기</a>
function bookmarksite(title,url) { 
	if(document.all){ // Internet Explorer
       window.external.AddFavorite(url, title); 
  }else if(window.chrome){ // Google Chrome
      alert("Ctrl+D키를 누르시면 즐겨찾기에 추가하실 수 있습니다.");
   }else if (window.sidebar){  // firefox 
       window.sidebar.addPanel(title, url, ""); 
   }else if(window.opera && window.print){ // opera 
      var elem = document.createElement('a'); 
      elem.setAttribute('href',url); 
      elem.setAttribute('title',title); 
      elem.setAttribute('rel','sidebar'); 
      elem.click(); 
   }
}*/

// 필드 미리 글써놓기
function ClearField(field){
	if (field.value == field.defaultValue) {
		field.value = "";
	}
}

function FillField(field){
	if (!field.value) {
		field.value = field.defaultValue;
	}
}
// 필드 미리 글써놓기

//auto tab ex) onkeyup="autoTab(this,6,event);"
var isNN = (navigator.appName.indexOf("Netscape")!=-1);
//if(isNN)document.captureEvents(Event.KEYPRESS);

function autoTab(field,len, e){
  var keyCode = (isNN)?e.which:e.keyCode;  
  var filter = (isNN)?[0,8,9]:[0,8,9,16,17,18,37,38,39,40,46];
  if(field.value.length >= len && !containsElement(filter,keyCode)){
	   field.value = field.value.slice(0,len);
  	 field.form[(getIndex(field)+1)%field.form.length].select();
}

function containsElement(arr, ele){
	var found = false, index = 0;
  while(!found && index < arr.length)
  	if(arr[index]==ele)
    	found = true;
    else
      index++;
	return found;
}

function getIndex(field){
  var index = -1, i = 0, found = false;
  while(i < field.form.length && index==-1)
		if(field.form[i] == field)index = i;
	    else i++;
		return index;
	}
	return true;
}

// 재외국인 번호 체크
function isFgnno(field,field2,msg){
	var fgnno = field.value+field2.value;
  var sum=0;
  var odd=0;
  buf = new Array(13);
  for(i=0; i<13; i++){ buf[i]=parseInt(fgnno.charAt(i)); }
  odd = buf[7]*10 + buf[8];
  if(odd%2 != 0){ 
		alert(msg);
		field.focus();				
		return false; 
	}
  if((buf[11]!=6) && (buf[11]!=7) && (buf[11]!=8) && (buf[11]!=9)){
		alert(msg);
		field.focus();
  	return false;
	}
  multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
  for(i=0, sum=0; i<12; i++){ sum += (buf[i] *= multipliers[i]); }
  sum = 11 - (sum%11);
  if(sum >= 10){ sum -= 10; }
  sum += 2;
  if(sum >= 10){ sum -= 10; }
  if(sum != buf[12]){ 
		alert(msg);
		field.focus();
		return false 
	}
  return true;
}

// 주민번호 체크
function isJuminno(field,field2,msg){
	var juminno = field.value+field2.value;
	if(juminno=="" || juminno==null || juminno.length!=13){
  	alert(msg);
		field.focus();
		return false;
	}
	var jumin1 = juminno.substr(0,6);
	var jumin2 = juminno.substr(6,7);
	var yy       = jumin1.substr(0,2);        // 년도
	var mm     = jumin1.substr(2,2);        // 월
	var dd     = jumin1.substr(4,2);        // 일
	var genda  = jumin2.substr(0,1);        // 성별
	var msg, ss, cc;

	// 길이가 6이 아닌 경우
  if(jumin1.length != 6){
  	alert("주민등록번호 앞자리를 다시 입력하세요.");
		field.focus();
    return false;
  }
	// 첫번째 자료에서 연월일(YYMMDD) 형식 중 기본 구성 검사
	if(yy < "00" || yy > "99" || mm < "01" || mm > "12" || dd < "01" || dd > "31"){
		alert("주민등록번호 앞자리를 다시 입력하세요.");
		field.focus();
		return false;
	}
	// 길이가 7이 아닌 경우
	if(jumin2.length != 7){
		alert("주민등록번호 뒷자리를 다시 입력하세요.");
		field2.focus();
		return false;
	}
	// 성별부분이 1 ~ 4 가 아닌 경우
	if(genda < "1" || genda > "4"){
		alert("주민등록번호 뒷자리를 다시 입력하세요.");
		field2.focus();
		return false;
	}
	// 연도 계산 - 1 또는 2: 1900년대, 3 또는 4: 2000년대
	cc = (genda == "1" || genda == "2") ? "19" : "20";
	// 첫번째 자료에서 연월일(YYMMDD) 형식 중 날짜 형식 검사
	if(isYYYYMMDD(parseInt(cc+yy), parseInt(mm), parseInt(dd)) == false){
		alert("주민등록번호 앞자리를 다시 입력하세요.");
		field.focus();
		return false;
	}
  // Check Digit 검사
	if(!isSSN(jumin1, jumin2)){
		alert("입력한 주민등록번호를 검토한 후, 다시 입력하세요.");
		field.focus();
		return false;
	}
  return true;
}

// 사업자등록번호 체크
function isBusino(field,field2,field3,msg){
	var vencod = field.value+field2.value+field3.value;
	if(vencod=="" || vencod==null){
		alert(msg);
		field.focus();
		return false;
	}
	var sum = 0;
	var getlist =new Array(10);
	var chkvalue =new Array("1","3","7","1","3","7","1","3","5");
	for(var i=0; i<10; i++){ getlist[i] = vencod.substring(i, i+1); }
	for(var i=0; i<9; i++){ sum += getlist[i]*chkvalue[i]; }
	sum = sum + parseInt((getlist[8]*5)/10);
	sidliy = sum % 10;
	sidchk = 0;
	if(sidliy != 0){ sidchk = 10 - sidliy; }
	else{ sidchk = 0; }
	if(sidchk != getlist[9]){ 
		alert("입력한 사업자등록번호를 검토한 후, 다시 입력하세요.");
		field.focus();
		return false; 
	}
  return true;
}


function isYYYYMMDD(y, m, d){
	switch(m){
	case 2:        // 2월의 경우
		if(d > 29) return false;
		if(d == 29){
		// 2월 29의 경우 당해가 윤년인지를 확인
			if((y % 4 != 0) || (y % 100 == 0) && (y % 400 != 0)) return false;
		}
    break;
	case 4:        // 작은 달의 경우
	case 6:
	case 9:
	case 11:
		if(d == 31) return false;
        }
    // 큰 달의 경우
	return true;
}

// 숫자체크
function isNumeric(checkStr){
	var checkOK = "0123456789";
	for(i = 0;  i < checkStr.length;  i++){
		ch = checkStr.charAt(i);
		for(j = 0;  j < checkOK.length;  j++)
			if(ch == checkOK.charAt(j)) break;
			if(j == checkOK.length){
				return(false);
        break;
			}
	}
	return(true);
}

function isLeapYear(y){
	if(y < 100)
		y = y + 1900;
	if((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)){
    return true;
	} else{
  	return false;
	}
}

function getNumberOfDate(yy, mm){
	month = new Array(29,31,28,31,30,31,30,31,31,30,31,30,31);
	if(mm == 2 && isLeapYear(yy)) mm = 0;
		return month[mm];
}

function isSSN(s1, s2){
	n = 2;
	sum = 0;
	for(i=0; i<s1.length; i++)
		sum += parseInt(s1.substr(i, 1)) * n++;
	for(i=0; i<s2.length-1; i++){
		sum += parseInt(s2.substr(i, 1)) * n++;
		if(n == 10) n = 2;
	}
	c = 11 - sum % 11;
	if(c == 11) c = 1;
	if(c == 10) c = 0;
	if(c != parseInt(s2.substr(6, 1))) return false;
	else return true;
}

function isField(field,msg){
// 예: 	if(!isField(document.form.confirmation,"비밀번호 확인을 입력하여 주십시요.")){return false;}
	if(field.value.length == 0){
		alert(msg);
		field.focus();
		return false;
	}else{
		return true;
	}
}

//한글체크
function isKorean(field,msg){
	var strVal = field.value;
  for(var i=0;i<strVal.length;i++){
		if(!((strVal.charCodeAt(i) > 0x3130 && strVal.charCodeAt(i) < 0x318F) || (strVal.charCodeAt(i) >= 0xAC00 && strVal.charCodeAt(i) <= 0xD7A3))){
			alert(msg);
			field.focus();
			return false;
		}
	}
  return true;
}

/**
* 입력값이 특정 문자(chars)만으로 되어있는지 체크
* 특정 문자만 허용하려 할 때 사용
* ex) if(!containsCharsOnly(form.blood,"ABO")){alert("혈액형 필드에는 A,B,O 문자만 사용할 수 있습니다.");}
*/
function containsCharsOnly(field,chars){
	for(var inx = 0; inx < field.value.length; inx++){
  	if(chars.indexOf(field.value.charAt(inx)) == -1)
    	return false;
	}
	return true;
}

//입력값이 형액형 체크
function isBloodType(field,msg){
    var chars = "ABORH+";
    if(!containsCharsOnly(field,chars)){
			alert(msg);
			field.focus();
			return false;
		}
		return true;
}


//입력값이 알파벳 체크
function isAlphabet(field){
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return containsCharsOnly(field,chars);
}

//입력값이 알파벳 대문자인지 체크
function isUpperCase(field,msg){
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
		if(!containsCharsOnly(field,chars)){
			alert(msg);
			field.focus();
			return false;
		}
		return true;
}

// 입력값이 알파벳 소문자인지 체크
function isLowerCase(field,msg){
    var chars = "abcdefghijklmnopqrstuvwxyz ";
		if(!containsCharsOnly(field,chars)){
			alert(msg);
			field.focus();
			return false;
		}
		return true;
}

// 입력값에 숫자만 있는지 체크
function isNumber(field,msg){
    var chars = "0123456789";
		if(!containsCharsOnly(field,chars)){
			alert(msg);
			field.focus();
			return false;
		}
		return true;
}
  
//입력값이 알파벳,숫자로 되어있는지 체크
function isAlphaNum(field,msg){
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
		if(!containsCharsOnly(field,chars)){
			alert(msg);
			field.focus();
			return false;
		}
		return true;
}

// 입력값이 숫자,대시(-)로 되어있는지 체크
function isNumDash(field,msg){
    var chars = "-0123456789";
		if(!containsCharsOnly(field,chars)){
			alert(msg);
			field.focus();
			return false;
		}
		return true;
}
  
//입력값이 숫자,콤마(,)로 되어있는지 체크
function isNumComma(field,msg){
    var chars = ",0123456789";
		if(!containsCharsOnly(field,chars)){
			alert(msg);
			field.focus();
			return false;
		}
		return true;
}

//입력값이 숫자,닷(.)로 되어있는지 체크
function isNumdot(field,mag){
    var chars = ".0123456789";
		if(!containsCharsOnly(field,chars)){
			alert(msg);
			field.focus();
			return false;
		}
		return true;
}


// 입력값이 사용자가 정의한 포맷 형식인지 체크
// 자세한 format 형식은 자바스크립트의 `regular expression`을 참조
function isValidFormat(field,format){
    if(field.value.search(format) != -1){
        return true; //올바른 포맷 형식
    }
    return false;
}
 

// 입력값이 이메일 형식인지 체크
// ex) if(!isValidEmail(form.email,"올바른 이메일 주소가 아닙니다)){return false}
function isValidEmail(field,msg){
    var format = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		if(!isValidFormat(field,format)){
			alert(msg);
			field.focus();
			return false;
		}
		return true;
}

//입력값이 전화번호 형식(숫자-숫자-숫자)인지 체크
function isValidPhone(field,msg){
    var format = /^(\d+)-(\d+)-(\d+)$/;
		if(!isValidFormat(field,format)){
			alert(msg);
			field.focus();
			return false;
		}
		return true;
}

//입력값이 기간형식(숫자.숫자.숫자~숫자.숫자.숫자)인지 체크
function isValidterm(field,msg){
    var format = /^(\d+).(\d+).(\d+)~(\d+).(\d+).(\d+)$/;
		if(!isValidFormat(field,format)){
			alert(msg);
			field.focus();
			return false;
		}
		return true;
}

//입력값이 날짜 형식(숫자.숫자.숫자)인지 체크
function isValiddot(field,msg){
    var format = /^(\d+)-(\d+)-(\d+)$/;
		if(!isValidFormat(field,format)){
			alert(msg);
			field.focus();
			return false;
		}
		return true;
}

//입력값이 주민번호 형식(숫자-.숫자)인지 체크
function isValidjumin(field,msg){
    var format = /^(\d+)-(\d+)$/;
		if(!isValidFormat(field,format)){
			alert(msg);
			field.focus();
			return false;
		}
		return true;
}


// 입력값의 바이트 길이를 리턴
// ex) if(getByteLength(form.title) > 100){ alert("제목은 한글 50자(영문 100자) 이상 입력할 수 없습니다.");}
function getByteLength(field,Byte){
    var byteLength = 0;
    for(var inx = 0; inx < field.value.length; inx++){
        var oneChar = escape(field.value.charAt(inx));
        if( oneChar.length == 1){
            byteLength ++;
        } else if(oneChar.indexOf("%u") != -1){
            byteLength += 2;
        } else if(oneChar.indexOf("%") != -1){
            byteLength += oneChar.length/3;
        }
    }
		if(byteLength > Byte){
			alert("제목은 한글 "+ Byte%2 +"자(영문 "+Byte+"자) 이상 입력할 수 없습니다.");
			field.focus();
			return false;
		}
		return true;
}

//입력값에서 콤마를 추가한다.
function addComma(field){
 var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
 field += '';  // 숫자를 문자열로 변환
 while (reg.test(field))
  field = field.replace(reg, '$1' + ',' + '$2');
 return field;
}

//입력값에서 콤마를 없앤다.
function delComma(field){
    return field.replace(/,/gi,"");
}

//입력값에서 콤마를 없앤다.
function removeComma(field){
    return field.value.replace(/,/gi,"");
}
  
// 선택된 라디오버튼이 있는지 체크
function hasCheckedRadio(field){
    if(field.length > 1){
        for(var inx = 0; inx < field.length; inx++){
            if(field[inx].checked) return true;
        }
    } else{
        if(field.checked) return true;
    }
    return false;
}
  
//선택된 체크박스가 있는지 체크
function hasCheckedBox(field){
    return hasCheckedRadio(field);
}

// <input type=text name=num2 onfocus="OnCheckPhone(this)" onKeyup="OnCheckPhone(this)" size=14> 
function OnCheckPhone(oTa) { 
    var oForm = oTa.form ; 
    var sMsg = oTa.value ; 
    var onlynum = "" ; 
    var imsi=0; 
    onlynum = RemoveDash2(sMsg);  //하이픈 입력시 자동으로 삭제함 
    onlynum =  checkDigit(onlynum);  // 숫자만 입력받게 함 
    var retValue = ""; 

    if(event.keyCode != 12 ) { 
        if(onlynum.substring(0,2) == 02) {  // 서울전화번호일 경우  10자리까지만 나타나교 그 이상의 자리수는 자동삭제 
                if (GetMsgLen(onlynum) <= 1) oTa.value = onlynum ; 
                if (GetMsgLen(onlynum) == 2) oTa.value = onlynum + "-"; 
                if (GetMsgLen(onlynum) == 4) oTa.value = onlynum.substring(0,2) + "-" + onlynum.substring(2,3) ; 
                if (GetMsgLen(onlynum) == 4) oTa.value = onlynum.substring(0,2) + "-" + onlynum.substring(2,4) ; 
                if (GetMsgLen(onlynum) == 5) oTa.value = onlynum.substring(0,2) + "-" + onlynum.substring(2,5) ; 
                if (GetMsgLen(onlynum) == 6) oTa.value = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) ; 
                if (GetMsgLen(onlynum) == 7) oTa.value = onlynum.substring(0,2) + "-" + onlynum.substring(2,5) + "-" + onlynum.substring(5,7) ; ; 
                if (GetMsgLen(onlynum) == 8) oTa.value = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) + "-" + onlynum.substring(6,8) ; 
                if (GetMsgLen(onlynum) == 9) oTa.value = onlynum.substring(0,2) + "-" + onlynum.substring(2,5) + "-" + onlynum.substring(5,9) ; 
                if (GetMsgLen(onlynum) == 10) oTa.value = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) + "-" + onlynum.substring(6,10) ; 
                if (GetMsgLen(onlynum) == 11) oTa.value = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) + "-" + onlynum.substring(6,10) ; 
                if (GetMsgLen(onlynum) == 12) oTa.value = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) + "-" + onlynum.substring(6,10) ; 
        } 
        if(onlynum.substring(0,2) == 05 ) {  // 05로 시작되는 번호 체크 
            if(onlynum.substring(2,3) == 0 ) {  // 050으로 시작되는지 따지기 위한 조건문 
                    if (GetMsgLen(onlynum) <= 3) oTa.value = onlynum ; 
                    if (GetMsgLen(onlynum) == 4) oTa.value = onlynum + "-"; 
                    if (GetMsgLen(onlynum) == 5) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,5) ; 
                    if (GetMsgLen(onlynum) == 6) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,6) ; 
                    if (GetMsgLen(onlynum) == 7) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,7) ; 
                    if (GetMsgLen(onlynum) == 8) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ; 
                    if (GetMsgLen(onlynum) == 9) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,7) + "-" + onlynum.substring(7,9) ; ; 
                    if (GetMsgLen(onlynum) == 10) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) + "-" + onlynum.substring(8,10) ; 
                    if (GetMsgLen(onlynum) == 11) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,7) + "-" + onlynum.substring(7,11) ; 
                    if (GetMsgLen(onlynum) == 12) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) + "-" + onlynum.substring(8,12) ; 
                    if (GetMsgLen(onlynum) == 13) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) + "-" + onlynum.substring(8,12) ; 
          } else { 
                if (GetMsgLen(onlynum) <= 2) oTa.value = onlynum ; 
                if (GetMsgLen(onlynum) == 3) oTa.value = onlynum + "-"; 
                if (GetMsgLen(onlynum) == 4) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,4) ; 
                if (GetMsgLen(onlynum) == 5) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,5) ; 
                if (GetMsgLen(onlynum) == 6) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) ; 
                if (GetMsgLen(onlynum) == 7) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) ; 
                if (GetMsgLen(onlynum) == 8) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) + "-" + onlynum.substring(6,8) ; ; 
                if (GetMsgLen(onlynum) == 9) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,9) ; 
                if (GetMsgLen(onlynum) == 10) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) + "-" + onlynum.substring(6,10) ; 
                if (GetMsgLen(onlynum) == 11) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ; 
                if (GetMsgLen(onlynum) == 12) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ; 
          } 
        } 

        if(onlynum.substring(0,2) == 03 || onlynum.substring(0,2) == 04  || onlynum.substring(0,2) == 06  || onlynum.substring(0,2) == 07  || onlynum.substring(0,2) == 08 ) {  // 서울전화번호가 아닌 번호일 경우(070,080포함 // 050번호가 문제군요) 
                if (GetMsgLen(onlynum) <= 2) oTa.value = onlynum ; 
                if (GetMsgLen(onlynum) == 3) oTa.value = onlynum + "-"; 
                if (GetMsgLen(onlynum) == 4) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,4) ; 
                if (GetMsgLen(onlynum) == 5) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,5) ; 
                if (GetMsgLen(onlynum) == 6) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) ; 
                if (GetMsgLen(onlynum) == 7) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) ; 
                if (GetMsgLen(onlynum) == 8) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) + "-" + onlynum.substring(6,8) ; ; 
                if (GetMsgLen(onlynum) == 9) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,9) ; 
                if (GetMsgLen(onlynum) == 10) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) + "-" + onlynum.substring(6,10) ; 
                if (GetMsgLen(onlynum) == 11) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ; 
                if (GetMsgLen(onlynum) == 12) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ; 

        } 
        if(onlynum.substring(0,2) == 01) {  //휴대폰일 경우 
            if (GetMsgLen(onlynum) <= 2) oTa.value = onlynum ; 
            if (GetMsgLen(onlynum) == 3) oTa.value = onlynum + "-"; 
            if (GetMsgLen(onlynum) == 4) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,4) ; 
            if (GetMsgLen(onlynum) == 5) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,5) ; 
            if (GetMsgLen(onlynum) == 6) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) ; 
            if (GetMsgLen(onlynum) == 7) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) ; 
            if (GetMsgLen(onlynum) == 8) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,8) ; 
            if (GetMsgLen(onlynum) == 9) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,9) ; 
            if (GetMsgLen(onlynum) == 10) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) + "-" + onlynum.substring(6,10) ; 
            if (GetMsgLen(onlynum) == 11) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ; 
            if (GetMsgLen(onlynum) == 12) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ; 
        } 

        if(onlynum.substring(0,1) == 1) {  // 1588, 1688등의 번호일 경우 
            if (GetMsgLen(onlynum) <= 3) oTa.value = onlynum ; 
            if (GetMsgLen(onlynum) == 4) oTa.value = onlynum + "-"; 
            if (GetMsgLen(onlynum) == 5) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,5) ; 
            if (GetMsgLen(onlynum) == 6) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,6) ; 
            if (GetMsgLen(onlynum) == 7) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,7) ; 
            if (GetMsgLen(onlynum) == 8) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ; 
            if (GetMsgLen(onlynum) == 9) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ; 
            if (GetMsgLen(onlynum) == 10) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ; 
            if (GetMsgLen(onlynum) == 11) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ; 
            if (GetMsgLen(onlynum) == 12) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ; 
        } 
    } 
} 

function RemoveDash2(sNo) { 
var reNo = "" 
for(var i=0; i<sNo.length; i++) { 
    if ( sNo.charAt(i) != "-" ) { 
    reNo += sNo.charAt(i) 
    } 
} 
return reNo 
} 

function GetMsgLen(sMsg) { // 0-127 1byte, 128~ 2byte 
var count = 0 
    for(var i=0; i<sMsg.length; i++) { 
        if ( sMsg.charCodeAt(i) > 127 ) { 
            count += 2 
        } 
        else { 
            count++ 
        } 
    } 
return count 
} 

function checkDigit(num) { 
    var Digit = "1234567890"; 
    var string = num; 
    var len = string.length 
    var retVal = ""; 

    for (i = 0; i < len; i++) 
    { 
        if (Digit.indexOf(string.substring(i, i+1)) >= 0) 
        { 
            retVal = retVal + string.substring(i, i+1); 
        } 
    } 
    return retVal; 
}

// 퀵 스크롤 베너
//<div id="banner">내용</div>
/*var lastScrollY = 0;
$(function(){
	var diffY = document.documentElement.scrollTop;
	// scroll event 
	$(window).scroll(function(){
		var diffTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		if (diffY != lastScrollY) {
			percent = .10 * (diffY - lastScrollY);
			if (percent > 0) {
				percent = Math.ceil(percent);
			} else {
				percent = Math.floor(percent);
			}
			diffTop = parseInt($("#banner").offset().top) + percent;//해당 라인에서 버그남
			lastScrollY = lastScrollY + percent;
		}
      $("#banner").stop();
      $("#banner").animate({"top": diffTop}, 500);
 		});
});*/

//디바이스체크 or 모바일페이지 이동 ---------------------------------------------------------------------------------------->
// device_check("url");  return문에 의하여 처리
function device_check(url){
	var UserAgent = navigator.userAgent; 
	if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|PalmOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson|SCH-M\d+/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null){
  	if(url !=""){
			location.href = url;
		}else{
			return "mobile";
		}
	}else{
		return "pc";
	}
}

/*/화면 확대 축소 시작 IE 전용  
var nowZoom = 100; // 현재비율
var maxZoom = 200; // 최대비율(500으로하면 5배 커진다)
var minZoom = 80; // 최소비율
 
  // +, - 키를 입력하면 화면 확대, 축소를 한다.
document.onkeypress = getKey;
 
function getKey(keyStroke) {
  isNetscape = (document.layers);
  eventChooser = (isNetscape) ? keyStroke.which : event.keyCode;//해당라인 스크립트 오류
  which = String.fromCharCode(eventChooser).toLowerCase();
  which2 = eventChooser;
 
  var el = event.srcElement;
 
  if ((el.tagName != "INPUT") && (el.tagName != "TEXTAREA")) {
   if (which == "+") {
    zoomIn();
   } else if (which == "-") {
    zoomOut();
   }
  }
}

//화면 키운다.
function zoomIn(){
    if (nowZoom < maxZoom) {
        nowZoom += 10; //25%씩 커진다.
    }else{
        return;
    }
    document.body.style.zoom = nowZoom + "%";
}
 
//화면 줄인다.
function zoomOut(){
    if (nowZoom > minZoom){
        nowZoom -= 10; //25%씩 작아진다.
    }else{
        return;
    }
    document.body.style.zoom = nowZoom + "%";
}
 
 
 
//화면 원래대로 
function zoomDefault(){ 
    nowZoom = 100; 
    document.body.style.zoom = nowZoom + "%"; 
}*/

//SNS 연결
//<a href="javascript:void(0);" onclick="SNS.facebook('http://www.ttting.co.kr','팅팅팅으로 놀러오세요!')"><img  src = "facebook.gif"></a>
var SNS = {
       facebook : function(link, description){
            // http://www.facebook.com/sharer.php?u=주소&t=설명
            
            //한글데이터가 get방식으로 넘어갈경우 문제가 될수있으니 인코딩 처리를 함.
            link = encodeURIComponent(link);
            description = encodeURIComponent(description);
            var url = 'http://www.facebook.com/sharer.php?u='+link+'&t='+description; 
            window.open(url,"",""); //팝업창 오픈
                    
        },tweeter : function(link, description){
            // http://twitter.com/share?text=설명 주소
            link = encodeURIComponent(link);
            description = encodeURIComponent(description);
        
						var url = 'http://twitter.com/share?text='+description+'&url='+link;
            window.open(url,"","");

        },me2day : function(link, description){
            // http://me2day.net/posts/new?new_post[body]="설명":주소
            link = encodeURIComponent(link);
            description = encodeURIComponent(description);

            var url = 'http://me2day.net/posts/new?new_post[body]="'+description+'":'+link;
            window.open(url,"","");
        },yozm : function(link, description){
            // http://yozm.daum.net/api/popup/prePost?sourceid=54&link = 주소&prefix=설명
            link = encodeURIComponent(link);
            description = encodeURIComponent(description);

            var url = 'http://yozm.daum.net/api/popup/prePost?sourceid=54&link ='+link+'&prefix='+description;
            window.open(url,"","");
        },msn : function(link, description){
						//http://profile.live.com/badge?url=[url]&text=[내용]
            link = encodeURIComponent(link);
            description = encodeURIComponent(description);
            var url = 'http://profile.live.com/badge?link ='+link+'&text='+description;
            window.open(url,"","");
        }
}

//태그제거
//ex: var str = strip_tags('<p>iplan</p> <b>iplan</b> <i>iplan</i>', '<i><b>');
//    결과 : 'iplan <b>iplan</b> <i>iplan</i>' 
function strip_tags (input, allowed) {
   allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
   var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
       commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
   return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
   });
}

$(document).ready(function(e) {

	//start 인증키 클릭으로 입력하기 
  $(document).find($("img[src*='gd_string.php']")).css('cursor','pointer');
	$("img[src*='gd_string.php']").click(function(){
		xx = $("img[src*='common']").attr('src');
		xx_tmp = xx.split(",");
		xx_var = xx_tmp[xx_tmp.length-1];
		$('#confirm_key').val(xx_var);
	});
	//end 인증키 클릭으로 입력하기 

}); //ready end
