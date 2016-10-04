// Header js start
//header config
var menuLayoutChk = 1;// "0"이면 로고우측에 메인메뉴 위치, "0"이 아니면 로고 하단에 메인메뉴 전체폭으로
var logoCenter = 0;// "1"이면 중앙정렬, "0"이면 왼쪽정렬
var submenuShow = 0;// "0" 서브메뉴 감춤
var headerInnerHchk = 0;// headerInner 높이 지정 선택, "0" 없을경우, "1"이면 서브메뉴와 비쥬얼 겹칠경우, 둘다 아니면 서브메뉴와 비쥬얼 안겹칠경우
var skipMenuChk = 0;//"0" 스킵메뉴 없을경우
var changeLangChk = 0;//"0" 다국어변환 없을경우
var menuWidthChk = 1;//"0" 일정한 폭으로 메인메뉴 배열, "0"이 아닐경우 메뉴 사이즈 비율로 폭지정
var menuGubunLineChk = 1;//메인 메뉴의 구분라인이 있으면서 마우스 오버시 백그라운드 색상 및 이미지가 지정될경우 "0"
var leftMenuWidth = 248;//레프트 메뉴 폭
var mobileChk = window.navigator.userAgent.toLowerCase();// 모바일 브라우져 체크
//if ( /iphone/.test(mobileChk) || /android/.test(mobileChk) || /opera/.test(mobileChk) || /bada/.test(mobileChk) ) {     alert('모바일 브라우저입니다');} 
var mainWide = 0 ;//"0"이 아니면 컨텐츠 폭 전체
$.extend({
	header : function(first,second,therd,wideyn, screenSize){
	mainWide = wideyn;
	var firstCnt = first;//메인메뉴 번호
	var secondCnt = second;//2차 서브메뉴 번호
	var siteWidth = screenSize;//메인디자인 폭
	var logoTBpadding =  20;//로고 높이 지정
	var infoMenuTBpadding = 3;//인포메뉴 높이 지정
	var naviTBpadding = 10;//메인메뉴 높이 지정
	var subMenuTBpadding = 3;//서브메뉴 높이 지정
	var subMenuLRpadding = 10;//서브메뉴 left, right padding 값지정
	var menuCnt = $("ul#navigation > li").size();//보여지는 메인메뉴 갯수
	var paddingGap =10;//subContents, pg_css, title, footerWrap의 왼쪽/오른쪽 패팅 값지정

//전체 레이아웃 구성 시작//
	$("#popupInner, #popupWrap .popupCloseInner, .logoWrapInner, .infoMenuWrapInner, .naviWrapInner, #visualInner, #contentsInner, #footerInner").css("width", siteWidth+"px");// 사이트 전체 폭지정	
	var popupHeight = $("#imgPopupFadeList li img").height() + $("#popupWrap .popupClose").height()
	$("#popupWrap").css({marginTop: -popupHeight+"px"});//팝업존 숨김

	$(".infoMenu").css({padding: infoMenuTBpadding+"px 0"});//인포메뉴  top, bottom padding 값지정
	var infoMenuHeight = $(".infoMenuWrapInner").height();//인포메뉴 높이
	$("#navigation > li > a").css({padding: naviTBpadding+"px 0"});//메인메뉴  top, bottom padding 값지정
	var naviHeight = $("#navigation > li").height();//네비메뉴 높이
	
	if(menuLayoutChk != 0){
		$("h1.logo").css({padding: logoTBpadding+"px 0"});//메인메뉴  top, bottom padding 값지정		
		if(logoCenter == 0){
			$("h1.logo").css({width: leftMenuWidth+"px"});//록고 폭 값지정
		}
		var logoHigh =  $(".logoWrapInner").height();//로고높이		
		$(".logoWrap").css({top: infoMenuHeight+"px"});//로고  Y좌표 지정
		$(".logoWrap").css({height: logoHigh+"px"});//로고 높이 지정
		$(".naviWrap").css({top: infoMenuHeight+$(".logoWrap").height()+"px"});//네비메뉴랩 Y좌표 지정
		$(".logoWrapInner .logo2").css({left: (siteWidth-$(".logoWrapInner .logo2").width())/2+"px", top: (logoHigh-$(".logoWrapInner .logo2").height())/2+"px"});//검색창 위치 지정
		//$(".logoWrapInner .dataSearch").css({left: (siteWidth-$(".logoWrapInner .dataSearch").width())/2+"px", top: (logoHigh-$(".logoWrapInner .dataSearch").height())/2+"px"});//검색창 위치 지정
		$(".logoWrapInner p.tel").css({right: "5px", top: (logoHigh-$(".logoWrapInner p.tel").height())/2+"px"});//전화번호 위치 지정
	}else{
		$(".naviWrap").css({top: infoMenuHeight+"px"});//네비메뉴랩 Y좌표 지정
		$("#navigation").css({width: siteWidth - leftMenuWidth +"px"});//메뉴 폭지정
		$("#navigation").css({marginLeft: leftMenuWidth +"px"});//메뉴 왼쪽 여백 지정
		$(".logoWrapInner .dataSearch").addClass("blind");
		$(".logoWrapInner p.tel").addClass("blind");
	};
	
	$("#navigation").css({height: naviHeight+"px"});//네비메뉴 높이지정		
	if(submenuShow != 0){
		$("#navigation li ul").css({padding: subMenuTBpadding+"px "+subMenuLRpadding+"px"});//서브메뉴  top, bottom padding 값지정
		var subMenuHeight = $("ul#navigation > li > ul > li").height() + subMenuTBpadding;//서브메뉴 높이
	}else{
		var subMenuHeight = 0;
	};
	
	if(headerInnerHchk == 0){
		$(".naviWrap").css({height: naviHeight+"px"});//네비메뉴랩 높이지정
		$(".naviWrapInner").css({height: naviHeight+"px"});//네비메뉴랩이너 높이지정
		if(menuLayoutChk == 0){
			$("#headerInner").css("height",  infoMenuHeight+naviHeight+"px");//2차메뉴가 없는 경우(헤더 높이지정) 혹은 2차메뉴가 headerInner아래쪽에 위치한 경우
			$(".logoWrap").css({top: ($("#headerInner").height()-$("h1.logo").height())/2+infoMenuHeight/2+"px"});//로고  Y좌표 지정
		}else{
			$("#headerInner").css("height",  infoMenuHeight+$(".logoWrap").height()+naviHeight+"px");//2차메뉴가 없는 경우(헤더 높이지정) 혹은 2차메뉴가 headerInner아래쪽에 위치한 경우
		};
	}else if(headerInnerHchk == 1){
		$(".naviWrap").css({height: naviHeight+subMenuHeight/2+2+"px"});//네비메뉴랩 높이지정
		$(".naviWrapInner").css({height: naviHeight+subMenuHeight/2+2+"px"});//네비메뉴랩이너 높이지정
		if(menuLayoutChk == 0){
			$("#headerInner").css("height", infoMenuHeight+naviHeight+subMenuHeight/2+2+"px");//2차메뉴가 비쥬얼과 겹치는 경우(헤더 높이지정)
			$(".logoWrap").css({top: ($("#headerInner").height()-$("h1.logo").height())/2+infoMenuHeight/2+"px"});//로고  Y좌표 지정
		}else{
			$("#headerInner").css({height: infoMenuHeight+$(".logoWrap").height()+naviHeight+subMenuHeight/2+2+"px"});//2차메뉴가 비쥬얼과 겹치는 경우(헤더 높이지정)
		}
	}else{
		$(".naviWrap").css({height: naviHeight+subMenuHeight+5+"px"});//네비메뉴랩 높이지정
		$(".naviWrapInner").css({height: naviHeight+subMenuHeight+5+"px"});//네비메뉴랩이너 높이지정
		if(menuLayoutChk == 0){
			$("#headerInner").css("height",  infoMenuHeight+naviHeight+subMenuHeight+4+"px");//2차메뉴가 비쥬얼과 안 겹치는 경우(헤더 높이지정)
			$(".logoWrap").css({top: ($("#headerInner").height()-$("h1.logo").height())/2+infoMenuHeight/2-subMenuHeight/2+"px"});//로고  Y좌표 지정
		}else{
			$("#headerInner").css("height", infoMenuHeight+$(".logoWrap").height()+naviHeight+subMenuHeight+2+"px");//2차메뉴가 비쥬얼과 안 겹치는 경우(헤더 높이지정)
		}
	}
	
	if(menuLayoutChk == 0){
		$("h1.logo").css({position: "absolute", top: 0, left: 0, width: leftMenuWidth+"px"});//로고 지정
	}
	
	if(mainWide == 0){
		$("#leftMenu").css("width",  leftMenuWidth+"px");//레프트메뉴 폭지정
		$("#sub").css({width:(siteWidth-leftMenuWidth)+"px", marginLeft: leftMenuWidth+"px"});//#sub의 margin-left값설정
		$("#subContents, #pg_css").css("padding", "0 "+paddingGap+"px");//#subContents, #pg_css의 padding값지정
		$("#title").css("padding",  "0 "+paddingGap+"px");// #title의 padding-left, padding-right값지정
		$("#title p.location").css("right",  paddingGap+"px");// #title의 위치정보 right값지정
	};
		
	$("#footerInner .footerWrap").css("padding-left", leftMenuWidth + paddingGap+"px");//#subContents, #pg_css의 padding값지정
	var footerLogoX = (leftMenuWidth- $("h1.logo img").width())/2;//로고 X좌표
	$("#footerInner .footerWrap").css("background", "url(../static/img/footer_logo.png) no-repeat "+footerLogoX+"px"+" center")//푸터 로고 위치지정
	$("#header, #visual, #contents, #footer").css("visibility","visible");
	
	if( /iphone/.test(mobileChk) || /android/.test(mobileChk) || /opera/.test(mobileChk) || /bada/.test(mobileChk)){
		$("#banner").addClass("blind")// 모바일 접속시 배너 숨김
	};
//전체 레이아웃 구성 끝//	

//스킵 메뉴 마우스 오버/아웃시 시작//
	if(skipMenuChk != 0){
		document.getElementById('skipMenuList').focus();
		$("#skipMenuList ul li").addClass('blind');
		$("#skipMenuList li").bind('mouseenter keyup', function() { // 스킵 메뉴바의 각 메뉴들에 마우스를 올리거나 키보드로 이동하면,
			if($(this).index() == 0){
				$("#skipMenuList ul").css("height", infoMenuHeight+"px");
			}
			$(this).removeClass('blind');
		});
		$("#skipMenuList li").bind('mouseleave keydown', function() { // 스킵 메뉴바의 각 메뉴들에 마우스를 올리거나 키보드로 이동하면,
			$(this).addClass('blind');
			if($(this).index() == $("#skipMenuList li").size()-1){
				$("#skipMenuList ul").css("height","0px");
			}
		});
		$("#sub, #navigation, #leftMenu, #footer").focus(function(){
			$("#skipMenuList ul").css("height","0px");
		});
	};	
//스킵 메뉴 마우스 오버/아웃시 끝//

//다국어 버튼 변환시작//
$.extend({
	is_language : function(language){
		var butFirstIndex = $("#headerInner .infoMenu li.langFirst").index();// 언어 처음 시작 인덱스 번호
		var currentSrc = "_"+"kr"//language;//커런트 언어 구별 문자
		var currentIndex = $("#headerInner .infoMenu li > a > img[src*='"+currentSrc+"']").parent().parent().index();//커런트 메뉴 인덱스 번호
		var butCurrentSrcUrl = $("#headerInner .infoMenu li:eq("+currentIndex+") a img").attr("src");//이미지 SRC 문자열 저장
		var butCurrentSrc = butCurrentSrcUrl.substring(0, 23);//해당 언어 이미지 src
		var langCnt = 3;// 변환 언어 갯수	
		$.changeLangulage(butFirstIndex, currentIndex, butCurrentSrcUrl, butCurrentSrc, langCnt);
	}
});
//다국어 버튼 변환끝//

//메인 메뉴들 각메뉴의 폭지정 시작//
	if(menuWidthChk == 0){
		//메인 메뉴들 각메뉴를 일정비율 폭지정 시작//	
		for(i=0; i< menuCnt; i++){
			menuWidthRatio = 100 / menuCnt;
			$("ul#navigation > li:eq("+i+")").css("width", menuWidthRatio+"%");
		}
		//메인 메뉴들 각메뉴의 일정비율 폭지정 폭지정 끝//
	}else{
		//메인 메뉴들 각메뉴의 폭비율 폭지정 시작//
		var menuWidthSum = 0;
		for(i=0; i< menuCnt; i++){
			menuWidthSum = menuWidthSum + $("ul#navigation > li:eq("+i+")").width();
		};
   		var menuMargin = ($("ul#navigation").width() - menuWidthSum)/menuCnt -1;
		for(i=0; i< menuCnt; i++){
			$("ul#navigation > li:eq("+i+")").css("width", $("ul#navigation > li:eq("+i+")").width() + menuMargin + "px");
		};
		//메인 메뉴들 각메뉴의 폭비율 폭지정 끝//
	};
//메인 메뉴들 각메뉴의 폭지정 끝//

	$("ul#navigation > li > ul").addClass('blind');//2차메뉴 감춤
	$("ul#navigation > li:first").addClass('first');//1차메뉴 첫번째 메뉴 백그라운드 메뉴 세로라인 없앰

//메인 메뉴 마우스 오버/아웃시 시작//
	var activeIndex = 0;
	$("ul#navigation > li").bind('mouseenter keyup', function() { // 1차 메뉴바의 각 메뉴들에 마우스를 올리거나 키보드로 이동하면,
		$("ul#navigation > li:eq("+firstCnt+") > ul").addClass('blind');//활성화된 커런트 메뉴 없앰	
		menuActive($(this).index());
		
		//메인 메뉴 백그라운드 색 및 이미지 지정시 세로 구분라인 처리 시작//
		if(menuGubunLineChk == 0){
			$("ul#navigation > li:eq("+($(this).index()+1)+")").addClass("lineOff");//현재 메뉴 다음메뉴의 백그라운드 없앰		
			if(firstCnt != $(this).index(), $(this).width()){
				$("ul#navigation > li:eq("+(firstCnt+1)+")").removeClass("lineOff");//현재 커런트 메뉴 다음메뉴의 백그라운드 없앰
			}
		};
		//메인 메뉴 백그라운드 색 및 이미지 지정시 세로 구분라인 처리 끝//

		//2차메뉴 활성화 및 위치지정 시작//
		if(submenuShow != 0 && !/iphone/.test(mobileChk) && !/android/.test(mobileChk) && !/opera/.test(mobileChk) && !/bada/.test(mobileChk)){
			naviSubLocation($(this).index())
		}
				
		if($(this).index() != firstCnt){
			activeIndex = $("ul#navigation > li:eq("+firstCnt+")").index();
			menuActiveNone(activeIndex);
		}else{
			activeIndex = $("ul#navigation > li:eq("+firstCnt+")").index();
			menuActive(activeIndex);
		}
		//2차메뉴 활성화 및 위치지정 끝//
		
	});
	
	$("ul#navigation > li").bind('mouseleave keydown', function() { // 1차 메뉴바의 각 메뉴들에 마우스를 올리거나 키보드로 이동하면,
		
		//메인 메뉴 백그라운드 색 및 이미지 지정시 세로 구분라인 처리 시작//
		if(menuGubunLineChk == 0){
			$("ul#navigation > li:eq("+($(this).index()+1)+")").removeClass("lineOff");
			$("ul#navigation > li:eq("+(firstCnt+1)+")").addClass("lineOff");
		};
		//메인 메뉴 백그라운드 색 및 이미지 지정시 세로 구분라인 처리 끝//
		
		if(firstCnt != $(this).index()){// 커런트 메뉴를 제외한 해당 메뉴 비활성화
			menuActiveNone($(this).index());
		}
		
		if(submenuShow != 0){
			$("ul", this).addClass('blind');
			if(firstCnt != 100){//인덱스페이지가 아닐경우에만 실행
				menuActive(firstCnt)//커런트 메뉴 활성화
				naviSubLocation(firstCnt);//서브메뉴 위치결정 함수 호출
			};
		};
		
	});
//메인 메뉴 마우스 오버/아웃시 끝//

	$("ul#navigation > li > ul > li:first-child").addClass("first");//2차 메뉴 첫번째 메뉴 백그라운드 없앰

//2차 메뉴 마우스 오버/아웃시 시작//
	if(submenuShow != 0){
		$("ul#navigation > li > ul > li:first-child").addClass("first");//2차 메뉴 첫번째 메뉴 백그라운드 없앰
		$("ul#navigation > li > ul > li").bind('mouseenter keyup', function() { // 2차 메뉴바의 각 메뉴들에 마우스를 올리거나 키보드로 이동하면,
			if($(this).index() != secondCnt){
				$("ul#navigation > li:eq("+firstCnt+") > ul > li:eq("+secondCnt+")").removeClass('on')
			}else{
				$("ul#navigation > li:eq("+firstCnt+") > ul > li:eq("+secondCnt+")").addClass('on')
			}
			$(this).addClass('on').siblings().removeClass('on');
		});
	
		$("ul#navigation > li > ul > li").bind('mouseleave keydown', function() { // 1차 메뉴바의 각 메뉴들에 마우스를 올리거나 키보드로 이동하면,
			if(secondCnt != $(this).index()){
				$(this).removeClass('on'); // 해당 메뉴에 클래스 제거합니다.
			}
			$("ul#navigation > li:eq("+firstCnt+") > ul > li:eq("+secondCnt+")").addClass('on');//2차 메뉴 활성화		
		});
		
		//2차 메뉴 0페이지가 있을경우 시작//
		if(secondCnt < 0){
			$("ul#navigation > li:eq("+firstCnt+") > ul > li:eq("+secondCnt+")").removeClass("on");
		};
		//2차 메뉴 0페이지가 있을경우 끝//
	};
//2차 메뉴 마우스 오버/아웃시 끝//
 
//1차/2차 커런트 메뉴 활성화 시작//
	if(firstCnt != 100 && !/iphone/.test(mobileChk) && !/android/.test(mobileChk) && !/opera/.test(mobileChk) && !/bada/.test(mobileChk)){//인덱스페이지나 모바일이 아닐경우에만 실행
		menuActive(firstCnt)
		if(submenuShow != 0){
			naviSubLocation(firstCnt);//naviSub 위치 구하는 함수호출
			$("ul#navigation > li:eq("+firstCnt+") > ul > li:eq("+secondCnt+")").addClass('on');
		}
	
		//메인 메뉴 백그라운드 색 및 이미지 지정시 세로 구분라인 처리 시작//
		if(menuGubunLineChk == 0){
			$("ul#navigation > li:eq("+(firstCnt+1)+")").addClass("lineOff");
		}
		//메인 메뉴 백그라운드 색 및 이미지 지정시 세로 구분라인 처리 끝//
	}
//1차/2차 커런트 메뉴 활성화 끝//
	
// 팝업존 슬라이드 오픈 애니메이션 시작//
	if(firstCnt == 100){
		popupWrapSlideOpenAni();
	};
	function popupWrapSlideOpenAni(){
		$("#popupWrap:not(:animated)").animate({
			marginTop : "0"			 
		},"slow", "swing",
		function(){
			$(this).css("margin-top", "0px");
		});
	};
// 팝업존 슬라이드 오픈 애니메이션 끝//

// 팝업존 슬라이드 클로즈 애니메이션 시작//
	$("#popupWrap .popupCloseInner p.closeBut").click(function(){
		popupWrapSlideCloseAni();
	});
	function popupWrapSlideCloseAni(){
		$("#popupWrap:not(:animated)").animate({
			marginTop : -popupHeight + "px"
		},"slow", "swing",
		function(){
			
		});
	};
// 팝업존 슬라이드 클로즈 애니메이션 끝//

//메뉴 활성화함수 시작//
	function menuActive(activeVar) {
		if(activeVar != 0 && activeVar != menuCnt-1){
			$("ul#navigation > li:eq("+activeVar+")").addClass('on') // 해당 메뉴에 클래스 on을 추가하고, 다른 메뉴의 클래스를 제거합니다.
		}else{
			if(activeVar == 0){
				$("ul#navigation > li:eq("+activeVar+")").addClass('onFirst');
			}else{
				$("ul#navigation > li:eq("+activeVar+")").addClass('onLast');
			}
		};
	};
//메뉴 활성화함수 끝//

//메뉴 비활성화함수 시작//
	function menuActiveNone(activeVar) {
		if(activeVar != 0 && activeVar != menuCnt-1){
			$("ul#navigation > li:eq("+activeVar+")").removeClass('on') // 해당 메뉴에 클래스 on을 추가하고, 다른 메뉴의 클래스를 제거합니다.
		}else{
			if(activeVar == 0){
				$("ul#navigation > li:eq("+activeVar+")").removeClass('onFirst');
			}else{
				$("ul#navigation > li:eq("+activeVar+")").removeClass('onLast');
			}
		};
	};
//메뉴 비활성화함수 끝//

//2차 메뉴 위치 결정함수 시작//
	function naviSubLocation(firstCnt) {
		if(firstCnt < menuCnt){
		    var naviSubX ="ul#navigation > li:eq("+firstCnt+")";
		
			$(naviSubX+" > ul").removeClass('blind');
			var subMenuEWidthSum = 0;
			for(i=0; i < $(naviSubX+" > ul li").size(); i++){
				subMenuEWidthSum = subMenuEWidthSum + $(naviSubX+" > ul li:eq("+i+")").width();
			}
			$(naviSubX+" > ul").css("left", $(naviSubX).offset().left+"px");//해당 메인메뉴 좌측을 기준으로 정렬
			if($(naviSubX).offset().left + subMenuEWidthSum > $("ul#navigation").offset().left + $("ul#navigation").width()){//메뉴를 벗어날 경우
				$(naviSubX+" > ul").css("left", ($(naviSubX).offset().left-22) - (($(naviSubX).offset().left + subMenuEWidthSum)-($("ul#navigation").offset().left + $("ul#navigation").width()))+"px");				
			};
			$(naviSubX+" > ul").css("min-width", $("ul#navigation > li:eq(0)").width()-subMenuLRpadding*2);
			if($(naviSubX+" > ul li").size() == 1){
				$(naviSubX+" > ul li a").css({width: $(naviSubX).width()-21+"px", textAlign: "center", paddingLeft: 0, paddingRight: 0});
			}
			$(window).resize(function(){
				$(naviSubX+" > ul").css("left", $(naviSubX).offset().left+"px");//해당 메인메뉴 좌측을 기준으로 정렬
				if($(naviSubX).offset().left + subMenuEWidthSum > $("ul#navigation").offset().left + $("ul#navigation").width()){//메뉴를 벗어날 경우
					$(naviSubX+" > ul").css("left", ($(naviSubX).offset().left-22) - (($(naviSubX).offset().left + subMenuEWidthSum)-($("ul#navigation").offset().left + $("ul#navigation").width()))+"px");
				};
				$(naviSubX+" > ul").css("min-width", $("ul#navigation > li:eq(0)").width()-subMenuLRpadding*2);
				if($(naviSubX+" > ul li").size() == 1){
					$(naviSubX+" > ul li").css({width: "100%", textAlign: "center", paddingLeft: "0px"});
					$(naviSubX+" > ul li a").css({paddingLeft: "0px"});
				}
			});
			
		};
	};
//2차 메뉴 위치 결정함수 끝//
		
	}
});
//Header end

//left_menu config
var leftMenuChk = 1;//"0"이면 2차메뉴 아래쪽에 3차메뉴 디스플레이, "0"이 아니면 2차메뉴 옆에 3차메뉴 디스플레이
var therdMenuChk = 1;//모든 3차메뉴 숨김 "0", "1"이면 해당 3차메뉴만 노출, "0", "1" 이아닌 나머지 모든 3차메뉴 노출
var menuTitleChk = 1;//텍스트 "0", "0"이아닌 값 이미지
//left_menu  start
$.extend({
	left_menu : function(first,second,therd,ssid){
	var firstCnt = first;//메인메뉴 번호
	var secondCnt = second;//2차 서브메뉴 번호
	var therdCnt = therd;//3차 서브메뉴 번호
	var menuLength = $("ul#navigation > li:eq("+firstCnt+") ul > li").size();//해당 메인메뉴의 서브메뉴 갯수
		
		if(menuTitleChk != 0){
			$("h2.leftMenuTitle").attr("src","user_img/menu_left_img"+firstCnt+".png");//타이틀이 이미지일 경우 혹은 메인메뉴에따라 왼쪽 메뉴이미지가 변경되는 경우
		}else{
			var menuTitle = $("ul#navigation > li:eq("+firstCnt+") > a").text();//왼족 메뉴 타이틀
		}
	
		if(therdMenuChk == 0 || therdMenuChk == 1){
			$("ul#menuList > li ul").addClass("blind");
		}
	
		$("ul#menuList > li:eq("+secondCnt+")").addClass("on on2");//2차 메뉴 활성화
	
		if(therdMenuChk != 0 && leftMenuChk == 0){
			$("ul#menuList > li:eq("+secondCnt+") > ul").removeClass("blind");//커런트 3차 메뉴 보임
		}
	
		$("ul#menuList > li").bind('mouseenter keyup', function(){// 2차 메뉴 마우스 오버시
			if($(this).index() != secondCnt || leftMenuChk != 0){//현재 커런트 메뉴 외의 메뉴에 마우스 오버시 현재 메뉴 비활성화
				$("ul#menuList > li:eq("+secondCnt+")").removeClass("on");// 2차 커런트 메뉴 비활성화
				if(therdMenuChk == 1){//3차메뉴 유무 체크
					$("ul#menuList > li:eq("+secondCnt+") > ul").addClass("blind");//3차 커런트 메뉴 비활성화
					$("ul",this).removeClass('blind');
					if(leftMenuChk != 0){//"0"이 아닐경우 2차메뉴 우측에 3차메뉴 표시
						therdMenuLocation($(this).index())// 3차메뉴 위치함수 호출
					}
				};
			}
			$(this).addClass("on").siblings().removeClass('on');// 마우스 오버된 메뉴 활성화
		});
		$("ul#menuList > li").bind('mouseleave keydown', function(){// 2차메뉴 마우스 아웃시
			if($(this).index() != secondCnt){
				$("ul#menuList > li:eq("+secondCnt+")").addClass("on");// 2차 커런트 메뉴 활성화
				if(therdMenuChk == 1){//3차메뉴 유무 체크					
					if(leftMenuChk == 0){
						$("ul#menuList > li:eq("+secondCnt+") > ul").removeClass("blind");//3차 커런트 메뉴 비활성화
					}
					$("ul#menuList > li:eq("+secondCnt+") > ul > li:eq("+therdCnt+")").addClass("on");//3차 커런트 메뉴 활성화
					$("ul",this).addClass('blind');
				};
				$(this).removeClass("on");
			}else{
				if(leftMenuChk != 0){
					$("ul#menuList > li:eq("+$(this).index()+") > ul").addClass("blind");//3차 커런트 메뉴 비활성화
				}
			}
		});
	
		if(therdMenuChk == 1 && leftMenuChk == 0){//3차메뉴 유무 체크
			if(leftMenuChk != 0){//"0"이 아닐경우 2차메뉴 우측에 3차메뉴 표시
				therdMenuLocation(secondCnt)// 3차메뉴 위치함수 호출
			}
			
			$("ul#menuList > li:eq("+secondCnt+") > ul > li:eq("+therdCnt+")").addClass("on");//3차 메뉴 활성화
		
			$("ul#menuList > li > ul > li").bind('mouseenter keyup', function(){// 3차 서브 메뉴 마우스 오버시
				var parentCnt = $($(this).parent()).parent().index();//현재 마우스 오버된 메뉴의 상위메뉴의 index값 저장
	
				if($(this).index() != therdCnt || parentCnt != secondCnt){//현재 활성화된 커런트 메뉴 외의 메뉴에 마우스 오버시 현재 컨런트 메뉴 비활성화
					$("ul#menuList > li:eq("+secondCnt+") > ul > li:eq("+therdCnt+")").removeClass("on");// 3차 커런트 메뉴 비활성화
				}
				$(this).addClass("on").siblings().removeClass('on');// 마우스 오버된 메뉴 활성화
			});
			$("ul#menuList > li > ul > li").bind('mouseleave keydown', function(){// 3차 서브 메뉴 마우스 아웃시
				$(this).removeClass("on");// 마우스 아웃된 메뉴 비활성화
				$("ul#menuList > li:eq("+secondCnt+") > ul > li:eq("+therdCnt+")").addClass("on");// 3차 커런트 메뉴 활성화
			});
		};
	
		$("ul#menuList > li:first-child").addClass("first");
		$("ul#menuList > li:last-child").addClass("last");
	
		$("#sub").css("min-height", $("#leftMenu").height()+"px");//sub의 최소 높이를 왼쪽 메뉴 높이로 설정

//3차 메뉴 위치 결정함수 시작//
		function therdMenuLocation(secondCnt) {
			var therdMenuGap = 0;
			var therdMenuWidth = 150;
			var therdMenuTop = $("ul#menuList > li:eq("+secondCnt+")").offset().top - $("#leftMenu").offset().top;
			var therdMenuLeft = leftMenuWidth + therdMenuGap;
			//alert($("ul#menuList > li:eq("+secondCnt+")").offset().top + " : " + $("#leftMenu").offset().top)
			$("ul#menuList > li:eq("+secondCnt+") > ul").css({
				position: "absolute",
				top: therdMenuTop+"px",
				left: therdMenuLeft+"px",
				width: therdMenuWidth+"px",
				border: "1px solid #ccc",
				zIndex: 9999
			});
		};
//3차 메뉴 위치 결정함수 끝//
			
	}
});
// left_menu endt

// title_location start
$.extend({
	title_loaction : function(first,second,therd){
		var firstCnt = first;
		var secondCnt = second;
		var firstTitle = $("ul#navigation > li:eq("+firstCnt+") > a span.menuName").text();
		var contentsTitle = $("ul#navigation > li:eq("+firstCnt+") > ul > li:eq("+secondCnt+") > a").text();
		$("h1.contentsTitle span.korTitle").append(contentsTitle);
		$("p.location span.upLevel").append(firstTitle+" > ");
		$("p.location span.now").append(contentsTitle);

		if(second < 0){//0페이지가 있을경우
			$("h1.contentsTitle span.korTitle").text($("ul#navigation > li:eq("+firstCnt+") > a").text());
		}
	}
});
//title_loaction end

// 글자확대축소(아이프레임적용)
defsize = 9;
function zoom_it(n) {
	defsize += n;
	if(defsize < 15 && defsize > 5) {
		objs = document.getElementById("contentsInner") ;
		objs.style.fontSize = defsize + "pt";
		try{
			var iframe = document.getElementById('main') ;
			var doc = ( !! iframe.contentWindow ? iframe.contentWindow : iframe.contentDocument ).document ;
			var fontSize = doc.getElementById('contentsInner') ;
			contentsInner.style.fontSize = (defsize+2) + "pt";
		}catch(E){}
	} else {
		defsize += -n;
	}
}

// 사이트 폭에 맞도록 LI 균등배열 시작(라운드포함)//
$.liDivisionRound = function(selectName, liCntOfLine, liMargin, liRound, ulWidth){	
	var liCnt = $(selectName +" li").size();
	var ulRoundHeightCnt = 0;
	$(selectName).css({width: ulWidth+"%"}) 
	var liWidth = ($(selectName).width()+(liMargin*2) - liMargin * liCntOfLine * 2) / liCntOfLine-0.5;
	
	if(liCnt%liCntOfLine == 0){
		ulRoundHeightCnt = parseInt(liCnt/liCntOfLine);
	}else {
		ulRoundHeightCnt = parseInt(liCnt/liCntOfLine)+1;
	}	
				
	$(selectName + " li").css({width: liWidth+"px"});
	
	if($(selectName +" li img").length > 0){
		var imgResize = $(selectName + " li img");
		if($.browserChk() != 'Internet Explorer' && !(navigator.userAgent.indexOf('Trident/7.0') >= 0)){
			imgResize.load(function() {
			var liTotalHeight = imgResize.height() + ($(selectName +" li").height() - imgResize.height());
			$(selectName).css({height: (liTotalHeight*ulRoundHeightCnt)+(liMargin*ulRoundHeightCnt*2)+"px"});
			imgResize.css("visibility","visible");
		  });
	  }else{
			$(selectName).css({height: ($(selectName +" li").height()*ulRoundHeightCnt)+(liMargin*ulRoundHeightCnt*2)+"px"}) 
		};	
	}else{
		$(selectName).css({height: ($(selectName +" li").height()*ulRoundHeightCnt)+(liMargin*ulRoundHeightCnt*2)+"px"}) 
		$(selectName + " li img").css("visibility","visible");
	};

	$(selectName + " li").css({margin: liMargin+"px"});
	
	for(i=0; i<liCnt; i++){
		if(i%liCntOfLine == 0){
			$(selectName + " li:eq("+i+")").css({marginLeft: "0px"});
		}
		if(i%liCntOfLine == liCntOfLine-1){
			$(selectName + " li:eq("+i+")").css({marginRight: "0px"});
		}
	}
	
	$(selectName + "> li > a > span"+", " + selectName + "> li > button > span").corner("round "+liRound+"px");
}
// 사이트 폭에 맞도록 LI 균등배열 끝(라운드포함)//

// 사이트 폭에 맞도록 LI 균등배열 시작//
$.extend({
	liDivision : function(selectName, liCntOfLine, liMargin, ulWidth){
	var liCnt = $(selectName +" li").size();
	var ulRoundHeightCnt = 0;
	$(selectName).css({width: ulWidth+"%"}) 
	var liWidth = ($(selectName).width()+(liMargin*2) - liMargin * liCntOfLine * 2) / liCntOfLine-0.5;
	var liheight=0;
  
	if(liCnt%liCntOfLine == 0){
		ulRoundHeightCnt = parseInt(liCnt/liCntOfLine);
	}else {
		ulRoundHeightCnt = parseInt(liCnt/liCntOfLine)+1;
	}			
	
	$(selectName + " li").css({width: liWidth+"px"});

	if($(selectName +" li img").length > 0){
		var imgResize = $(selectName + " li img");
		var liTotalHeight = 0;
		if($.browserChk() != 'Internet Explorer' && !(navigator.userAgent.indexOf('Trident/7.0') >= 0)){
			imgResize.load(function(){
				liTotalHeight = imgResize.height() + ($(selectName +" li").height() - imgResize.height());
				$(selectName).css({height: (liTotalHeight*ulRoundHeightCnt)+(liMargin*ulRoundHeightCnt*2)+"px"});
			});
	  	}else{
			$(selectName).css({height: ($(selectName +" li").height()*ulRoundHeightCnt)+(liMargin*ulRoundHeightCnt*2)+"px"}) 
		};		
	}else{
		$(selectName).css({height: ($(selectName +" li").height()*ulRoundHeightCnt)+(liMargin*ulRoundHeightCnt*2)+"px"})
	};

	$(selectName + " li").css({margin: liMargin+"px"});

	for(i=0; i<liCnt; i++){
		if(i%liCntOfLine == 0){
			$(selectName + " li:eq("+i+")").css({marginLeft: "0px"});
		}
		if(i%liCntOfLine == liCntOfLine-1){
			$(selectName + " li:eq("+i+")").css({marginRight: "0px"});
		}
	}
	
	
}
});
// 사이트 폭에 맞도록 LI 균등배열 끝//

// 사이트 폭에 맞도록 LI 균등배열(정사각형이미지) 시작//
$.liDivisionRect = function(selectName, liCntOfLine, liMargin, ulWidth){
	var liCnt = $(selectName +" li").size();
	var ulRoundHeightCnt = 0;
	$(selectName).css({width: ulWidth+"%"}) 
	var liWidth = ($(selectName).width()+(liMargin*2) - liMargin * liCntOfLine * 2) / liCntOfLine-0.5;

	if(liCnt%liCntOfLine == 0){
		ulRoundHeightCnt = parseInt(liCnt/liCntOfLine);
	}else {
		ulRoundHeightCnt = parseInt(liCnt/liCntOfLine)+1;
	}			
	
	$(selectName + " li").css({width: liWidth+"px"});
	$(selectName + " li span.img img").css({height: $(selectName + " li span.img img").width()+"px"});
	$(selectName + " li").css({margin: liMargin+"px"});

	for(i=0; i<liCnt; i++){
		if(i%liCntOfLine == 0){
			$(selectName + " li:eq("+i+")").css({marginLeft: "0px"});
		}
		if(i%liCntOfLine == liCntOfLine-1){
			$(selectName + " li:eq("+i+")").css({marginRight: "0px"});
		}
	}
	
	$(selectName).css({height: ($(selectName +" li").height()*ulRoundHeightCnt)+(liMargin*ulRoundHeightCnt*2)+"px"}) 
}

// 사이트 폭에 맞도록 LI 균등배열(정사각형 이미지) 끝//

// TOP 스크롤 시작//
$.scrollContents = function(selectName){
	$(selectName).hide(); // 탑 버튼 숨김
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) { // 스크롤 내릴 표시
			$(selectName).fadeIn();
		} else {
			$(selectName).fadeOut();
		}
	});
	$(selectName).click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);  // 탑 이동 스크롤 속도
		return false;
	});
}
// TOP 스크롤 끝//

// INPUT FOCUS 시작//
$.inputFocus = function(selectName, selectValue){
	//var selectValue = $(selectName).val();
	$(selectName).val(selectValue).css({color: "#ccc"}).one("focus",function(){
		$(this).val("").css({color: "#666"});
	}).blur(function(){
		if($(selectName).val() == ""){
			$(selectName).val($(selectName).attr('default')).css({color: "#ccc"}).one("focus",function(){
				$(selectName).val("").css({color: "#666"});
			});
		};
	});
}
// INPUT FOCUS 시작//

// 전체 메뉴 시작 //
$.totalMenu = function(selectName, liCntOfLine, liMargin){
	var liCnt = $(selectName +" > li").size();
	var ulRoundHeightCnt = 0;
	var liWidth = ($(selectName).width() - liMargin * liCntOfLine * 2) / liCntOfLine;
	var liBestHeight = 0;
	var liBestHeight2 = 0;
	
	if(liCnt%liCntOfLine == 0){
		ulRoundHeightCnt = parseInt(liCnt/liCntOfLine);
	}else {
		ulRoundHeightCnt = parseInt(liCnt/liCntOfLine)+1;
	}			
	
	$(selectName + " > li").css({width: liWidth+"px"});
	
	for(i=0; i < liCnt-liCntOfLine; i++){
		if(liBestHeight < $(selectName +" > li:eq("+i+")").height()) {
			liBestHeight = $(selectName +" > li:eq("+i+")").height()
		};
	};
	liBestHeight = liBestHeight +10;
	for(i=0; i < liCnt-liCntOfLine; i++){
		$(selectName + " > li:eq("+i+") ul").css({height: liBestHeight-$(selectName + " > li a").height()+"px"});
	}
	
	for(i=liCntOfLine; i < liCnt; i++){
		if(liBestHeight2 < $(selectName +" > li:eq("+i+")").height()) {
			liBestHeight2 = $(selectName +" > li:eq("+i+")").height()
		};
	};
	liBestHeight2 = liBestHeight2 +10;
	for(i=liCntOfLine; i < liCnt; i++){
		$(selectName + " > li:eq("+i+") ul").css({height: liBestHeight2-$(selectName + " > li a").height()+"px"});
	}
	
	$(selectName + " > li").css({margin: liMargin+"px"});
	$(selectName).css({height: (liBestHeight+liBestHeight2)+(liMargin*ulRoundHeightCnt*2)+"px"}) 
}
// 사이트 폭에 맞도록 LI 균등배열 및 각 LI 높이틀릴 경우 높이계산 끝 //

// 즐겨찿기 시작//
$(document).ready(function(){
    // add a "rel" attrib if Opera 7+
    if(window.opera) {
        if ($("a.iplan_bookmark").attr("rel") != ""){ // don't overwrite the rel attrib if already set
            $("a.iplan_bookmark").attr("rel","sidebar");
        }
    }
 
    $("a.iplan_bookmark").click(function(event){
        event.preventDefault(); // prevent the anchor tag from sending the user off to the link
        var url = this.href;
        var title = this.title;
		var browser=navigator.userAgent.toLowerCase();
		
        // Mozilla, Firefox, Netscape
   		if (window.sidebar) {
        	//window.sidebar.addPanel(title,url,"");
			alert('사용하고 계시는 브라우저에서는 이 버튼으로 즐겨찾기를 추가할 수 없습니다. 수동으로 링크를 추가해주세요.')
    	}
   		// IE or chrome
    	else if( window.external) {
        // IE
        	if (browser.indexOf('chrome')==-1){
            	window.external.AddFavorite( url, title);
        	} else {
        	// chrome
            	alert('CTRL+D 또는 Command+D를 눌러 즐겨찾기에 추가해주세요.');
        	}
    	}
    	// Opera - automatically adds to sidebar if rel=sidebar in the tag
    	else if(window.opera && window.print) {
        	return true;
    	}
    	// Konqueror
    	else if (browser.indexOf('konqueror')!=-1) {
        	alert('CTRL+B를 눌러 즐겨찾기에 추가해주세요.');
    	}
    	// safari
    	else if (browser.indexOf('webkit')!=-1){
        	alert('CTRL+B 또는 Command+B를 눌러 즐겨찾기에 추가해주세요.');
    	} else {
        	alert('사용하고 계시는 브라우저에서는 이 버튼으로 즐겨찾기를 추가할 수 없습니다. 수동으로 링크를 추가해주세요.')
    	}
 
    });
}); //end ready
// 즐겨찿기 끝//

//브라우져 체크 시작//
$.browserChk = function(){
	var agt=navigator.userAgent.toLowerCase();
	if (agt.indexOf("chrome") != -1) return 'Chrome'; 
	if (agt.indexOf("opera") != -1) return 'Opera'; 
	if (agt.indexOf("staroffice") != -1) return 'Star Office'; 
	if (agt.indexOf("webtv") != -1) return 'WebTV'; 
	if (agt.indexOf("beonex") != -1) return 'Beonex'; 
	if (agt.indexOf("chimera") != -1) return 'Chimera'; 
	if (agt.indexOf("netpositive") != -1) return 'NetPositive'; 
	if (agt.indexOf("phoenix") != -1) return 'Phoenix'; 
	if (agt.indexOf("firefox") != -1) return 'Firefox'; 
	if (agt.indexOf("safari") != -1) return 'Safari'; 
	if (agt.indexOf("skipstone") != -1) return 'SkipStone'; 
	if (agt.indexOf("msie") != -1) return 'Internet Explorer'; 
	if (agt.indexOf("netscape") != -1) return 'Netscape'; 
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
}
//브라우져 체크 끝//

/*[IE8.0], [IE9.0], [IE10.0]을 사용하는 사람이 [호환성 보기 기능]을 사용한다면 정확한 IE 버전을 체크하기 힘들더군요

확인해 보니.. IE8.0 이상 부터는 유저 정보에 Trident 라는게 붙습니다.

그리고 뒤에는 버전이 출력되지요. 브라우저 별로 보면 아래와 같이 나옵니다.

 IE6.0 = null
 IE7.0 = null
 IE8.0 = Trident/4.0
 IE9.0 = Trident/5.0
IE10.0 = Trident/6.0

아래와 같이 처리를 하면 해당 브라우저의 버전을 체크 할 수 있습니다.

if(navigator.userAgent.match(/Trident\/(\d.\d)/i)[1] == '6.0'){

  alert('IE10 입니다.');

} else{

  alert('IE9 이하 입니다.');

}

이렇게 처리할 경우 다른 문제점이 하나 더 있습니다.

IE7.0 이하일 경우에는 해당 내용이 없기 때문에 null이 발생됩니다.

그래서 아래와 같이 하면 정상적으로 처리가 됩니다.
var trident = navigator.userAgent.match(/Trident\/(\d.\d)/i);
if(trident != null && trident[1] == "6.0"){
  alert('IE10 입니다.');
} else{
  alert('IE9 이하 입니다.');
}*/

//ie 브라우져 버전체크 시작//
function ieVersion() {
	var rv = -1; // Return value assumes failure.    
    if (navigator.appName == 'Microsoft Internet Explorer') {        
    	var ua = navigator.userAgent;        
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
        if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
	}
	return rv;
} 
//ie 브라우져 버전체크 끝//

//ie 브라우져 trident체크 시작//
$.tridentChk = function(){
	var trident = navigator.userAgent.match(/Trident\/(\d.\d)/i);
	if(trident != null && trident[1] > "5.0"){
    	return 1;
	} else{
    	return 0;
	}
};
//ie 브라우져 trident체크 끝//

//다국어 변환 시작//
$.changeLangulage = function(butFirstIndexF, currentIndexF, butCurrentSrcUrlF, butCurrentSrcF, langCntF){
	var butSrcUrl="";
	var butSrc="";
	for (i=butFirstIndexF; i< butFirstIndexF+langCntF; i++){
		$("#headerInner .infoMenu li:eq("+i+")").bind('mouseenter keyup', function() {
			if(currentIndexF != $(this).index()){
				butSrcUrl = $("a img",this).attr("src");
				butSrc = butSrcUrl.substring(0, 23);//해당 언어 이미지 src
				$("a img",this).attr("src", butSrc+"_o.jpg");
				$("#headerInner .infoMenu li:eq("+currentIndexF+") a img").attr("src", butCurrentSrcF+".jpg");
			}
		});
		$("#headerInner .infoMenu li:eq("+i+")").bind('mouseleave keydown', function() {
			
			if(currentIndexF != $(this).index()){
				$("a img",this).attr("src", butSrc+".jpg");
				$("#headerInner .infoMenu li:eq("+currentIndexF+") a img").attr("src", butCurrentSrcF+"_o.jpg");
			}
		});
	};
	
	$("#headerInner .infoMenu li:eq("+currentIndexF+") a img").attr("src", butCurrentSrcF+"_o.jpg");// 커런트 언어
};
//다국어 변환 끝//

/*$(document).ready(function(e) {
  $(".btn_default").button();
});*/