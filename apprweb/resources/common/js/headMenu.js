var menuIDArry = menuTimeArry = "";
function showHideMenu(obj,bool){
	var n = lv2 = null,s = obj.attr("id");
	clearTimeout(menuTimeArry);
	if(s.indexOf("menu_lv1_") >= 0){
		n = s.replace("menu_lv1_","");
		lv2 = $("#menu_lv2_"+n);
		if(bool){
			obj.addClass("move");
			if(lv2.children("li").length>0){
				//执行二级菜单显示，提示：可放到另一个函数里执行，但对象要对
				lv2.slideDown('fast').show();
				lv2.css({left:obj.offset().left+"px", top:obj.offset().top+40+"px", display:"block"});
				if(lv2.width()==800){
					lv2.css({width:"160px"});
					//设置二级菜单总宽
					//var w=0;
					lv2.children("li").each(function(){
						//w += $(this).outerWidth(true);
						//有子菜单就加箭头
						if($(this).children("ul.lv3").length>0){ $(this).addClass("jt"); }
					});
					//lv2.css({width:w+"px"});
					//设置二级菜单悬浮动作
					lv2.hover(function(e){ clearTimeout(menuTimeArry); },function(e){ allTowMenuHide(); });
					//设置三级菜单滑动
					lv2.children("li").hover(
						function(e){
							$(this).children(".lv3").slideDown('fast').show();
						},function(e){
							$(this).children(".lv3").hide();
							//$(this).children(".lv3").slideUp('fast');
						}
					);
				}
				if(lv2.offset().left+lv2.width() > getBodyVal().width){
					var l = lv2.offset().left - (lv2.offset().left+lv2.width() - getBodyVal().width);
						l = l <= 0 ? 0 : l;
					lv2.css({left:l+"px"});
				}
				//end
			}else{
				//当没有载入二级菜单时显示loading
				//lv2.css({width:"100px", left:obj.offset().left+"px", top:obj.offset().top+31+"px", display:"block"});
				lv2.css({left:obj.offset().left+"px", top:obj.offset().top+31+"px", display:"block"});
				lv2.html('<li><a href="#"><b><i>菜单二级菜单二级</i></b></a><ul class="lv3"><li class="up"></li><li><a href="#"><b><i>菜单三级</i></b></a></li><li class="cur"><a href="#"><b><i>菜单三级</i></b></a></li><li><a href="#"><b><i>菜单三级</i></b></a></li><li class="bottom"></li></ul></li><li><a href="#"><b><i>菜单二级</i></b></a></li><li class="bottom"></li>');
				//lv2.css({width:"3000px"});
				showHideMenu(obj,bool);
			}
		}else{
			obj.removeClass("move");
			lv2.slideUp('fast');
			//lv2.css({left:"", top:"", display:""});
		}
	}
}
function allTowMenuHide(){
	$(".menu_lv2_Obj .lv2").each(function(){
		//隐藏显示的二级菜单
		if($(this).is(':visible')){
			var n = lv1 = null, s = $(this).attr("id");
			if(s.indexOf("menu_lv2_") >= 0){
				n = s.replace("menu_lv2_","");
				lv1 = $("#menu_lv1_"+n);
				lv1.removeClass("move");
			}
			//$(this).slideUp('fast');
			$(this).css({left:"", top:"", display:""});
		}
	});
}
function WrapMenuFun(){
	//菜单
	$(".menu_lv1_Obj .lv1").each(function(){
		//设置一级菜单总宽
		var w=j=0;
		$(this).children("li").each(function(){
			if($(this).attr("id")!="" && $(this).attr("id")!=null && $(this).attr("id")!="unbefined"){ $(this).addClass("jt"); }
			w += $(this).outerWidth(true);
			j++;
		});
		$(this).css({width:w+"px"});
		menuIDArry = new Array(j);
	});
	$(".menu_lv1_Obj .lv1 li").hover(
		function(e){
			allTowMenuHide();
			showHideMenu($(this),true);
		},function(e){
			//设置微秒后执行隐藏
			var n=null,s = $(this).attr("id");
			if(s.indexOf("menu_lv1_") >= 0){
				n = s.replace("menu_lv1_","");
				menuIDArry[parseInt(n)] = $(this);
				menuTimeArry = setTimeout(function(){ showHideMenu(menuIDArry[n],false); },1);
			}
		}
	);
}