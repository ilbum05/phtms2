// 데모 :http://swip.codylindley.com/popupWindowDemo.html
// <span val="add_sub_category.php?st=PCategory1|popupWindow|200|500" class="popup_window btn_default" />추가</span>
// <a href="../member/jusoPopup_utf8.php" val="|popupWindow|570|420" class="popup_window btn_default" onClick="return false;">우편번호검색</a>
$(document).ready(function(e) {
	$('.popup_window').click(function(){
		var myArray = $(this).attr('val').split('|');
		$(this).popupWindow({
			centerScreen:1,
			centerBrowser:1,
			width:myArray[2],
			height:myArray[3],
			location:0,
			resizable:1,
			scrollbars:1,
			windowURL:myArray[0],
			windowName:myArray[1]
		});
	});

	$('.popup_window_left').click(function(){
		var myArray = $(this).attr('val').split('|');
		$(this).popupWindow({
			centerScreen:0,
			centerBrowser:0,
			width:myArray[2],
			height:myArray[3],
			location:0,
			resizable:1,
			scrollbars:1,
			windowURL:myArray[0],
			windowName:myArray[1]
		});
	});

});

(function($){ 		  
	$.fn.popupWindow = function(instanceSettings){
		
		return this.each(function(){
		
//		$(this).click(function(){
		
		$.fn.popupWindow.defaultSettings = {
			centerBrowser:0, // center window over browser window? {1 (YES) or 0 (NO)}. overrides top and left
			centerScreen:0, // center window over entire screen? {1 (YES) or 0 (NO)}. overrides top and left
			height:500, // sets the height in pixels of the window.
			width:500, // sets the width in pixels of the window.
			top:0, // top position when the window appears.
			left:0, // left position when the window appears.
			location:0, // determines whether the address bar is displayed {1 (YES) or 0 (NO)}.
			toolbar:0, // determines whether a toolbar (includes the forward and back buttons) is displayed {1 (YES) or 0 (NO)}.
			menubar:0, // determines whether the menu bar is displayed {1 (YES) or 0 (NO)}.
			resizable:0, // whether the window can be resized {1 (YES) or 0 (NO)}. Can also be overloaded using resizable.
			scrollbars:0, // determines whether scrollbars appear on the window {1 (YES) or 0 (NO)}.
			status:0, // whether a status line appears at the bottom of the window {1 (YES) or 0 (NO)}.
			windowName:null, // name of window set from the name attribute of the element that invokes the click
			windowURL:null // url used for the popup
		};
		
		settings = $.extend({}, $.fn.popupWindow.defaultSettings, instanceSettings || {});
		
		var windowFeatures =    'height=' + settings.height +
								',width=' + settings.width +
								',toolbar=' + settings.toolbar +
								',scrollbars=' + settings.scrollbars +
								',status=' + settings.status + 
								',resizable=' + settings.resizable +
								',location=' + settings.location +
								',menuBar=' + settings.menubar;

				settings.windowName = this.name || settings.windowName;
				settings.windowURL = this.href || settings.windowURL;
				var centeredY,centeredX;
			
				if(settings.centerBrowser){
					centeredY = window.screenY + (((window.outerHeight/2) - (settings.height/2)));
					centeredX = window.screenX + (((window.outerWidth/2) - (settings.width/2)));
					window.open(settings.windowURL, settings.windowName, windowFeatures+',left=' + centeredX +',top=' + centeredY).focus();
				}else if(settings.centerScreen){
					centeredY = (screen.height - settings.height)/2;
					centeredX = (screen.width - settings.width)/2;
					window.open(settings.windowURL, settings.windowName, windowFeatures+',left=' + centeredX +',top=' + centeredY).focus();
				}else{
					window.open(settings.windowURL, settings.windowName, windowFeatures+',left=' + settings.left +',top=' + settings.top).focus();	
				}
				return false;
			});
			
//		});	
	};
})(jQuery);
