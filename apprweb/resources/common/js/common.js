function $getObj(id){return document.getElementById(id);}
function CommonTab(sum,obj,objG,objT,ps){
	var g = document.getElementById(obj);
	var gG = g.getElementsByTagName(objG);
	for(var i=ps;i<gG.length;i++){
		if(i==sum || gG[i]==sum){
			with(gG[i]){className = "down";style.cursor = "";}
			gG[i].onclick = function(){return false};
			gG[i].onmousemove = function(){return false};
			gG[i].onmouseout = function(){return false};
			if(objT!=null){document.getElementById(objT+i).style.display = "block";}
		}else{
			with(gG[i]){className = "";style.cursor = "pointer";}
			gG[i].onclick = function(){CommonTab(this,obj,objG,objT,ps);};
			gG[i].onmousemove = function(){this.className = "move";};
			gG[i].onmouseout = function(){this.className = "";};
			if(objT!=null){document.getElementById(objT+i).style.display = "none";}
		}
	}
}
function CommonTabMove(sum,obj,objG,cursor,objT,objTG){
	var cf = (cursor==0) ? "pointer" : "";
	var g = document.getElementById(obj);
	var gG = g.getElementsByTagName(objG);
	if(objT!=null && objTG!=null){
		var gT = document.getElementById(objT);
		var gTG = gT.getElementsByTagName(objTG);
	}
	for(var i=0;i<gG.length;i++){
		if(i==sum || gG[i]==sum){
			with(gG[i]){className = "down";style.cursor = cf;}
			gG[i].onmousemove = function(){return false};
			if(objT!=null){if(objTG==null){document.getElementById(objT+i).style.display = "block";}else{gTG[i].style.display = "block";}}
		}else{
			with(gG[i]){className = "";style.cursor = cf;}
			gG[i].onmousemove = function(){CommonTabMove(this,obj,objG,cursor,objT,objTG)};
			if(objT!=null){if(objTG==null){document.getElementById(objT+i).style.display = "none";}else{gTG[i].style.display = "none";}}
		}
	}
}
function getBodyVal(str){
	//获取滚动条值, body实际宽高
	var t,l,h,w, html = $("html");
	t = html.scrollTop() == 0 ? document.body.scrollTop : html.scrollTop();
	l = html.scrollLeft() == 0 ? document.body.scrollLeft : html.scrollLeft();
	if($.browser.msie){ h = html.height(); }else{ h = $(document).height(); }
	w = document.body.clientWidth > html.width() ? document.body.clientWidth : html.width();
	w = document.body.clientHeight > html.height() ? document.body.clientWidth : w ;
	return { top:t, left:l, height:h, width:w };
}
function objCenter(obj){
	//对象居中
	var left = $(obj).width() < $("html").width() ? -$(obj).width()/2+getBodyVal().left : -$(obj).width()/2;
	var top = $(obj).height() < $("html").height() ? -$(obj).height()/2+getBodyVal().top : -$(obj).height()/2;
	$(obj).css({marginLeft:left+"px",marginTop:top+"px"});
}
function NoticeViewerFun(t,g,tit){
	//左下提示信息
	var obj = $(g), em = $(t+" a em"), sp = $(t+" a span");
	if(obj.is(':visible')){
		obj.slideUp(350);
		sp.html("点击展开"+tit);
		em.removeClass("Arrow1Down");
	}else{
		obj.slideDown(350).show();
		sp.html("点击收缩"+tit);
		em.addClass("Arrow1Down");
	}
}
function NoticeViewerFun_rt(t,g){
	//右上提示信息
	var obj = $(g), em = $(t);
	if(obj.is(':visible')){
		em.css({display:"block"});
		obj.slideUp(350);
	}else{
		em.css({display:"none"});
		obj.slideDown(350).show();
	}
}
function StretchShrink(obj){
	//遍历所有伸展收缩
	$(obj).each(function(i){
		var g = $(this).children(".Shrink_G");
		if($(this).children(".Shrink_T").attr("class").indexOf("show")>0){ $(this).children(".Shrink_G").css({display:"block"}); }
		$(this).children(".Shrink_T").click(function(){
			if(g.is(':visible')){
				g.slideUp('fast');
				$(this).removeClass("Shrink_T_show");
			}else{
				g.slideDown('fast').show();
				$(this).addClass("Shrink_T_show");
			}
		});
	});
}
function dialogWinFun(obj,tit,w,h,c,sty){
	//obj对象,tit标题,w宽,h高,c另加关闭按钮对象,sty风格
	var clan = "DialogBox";
	if(sty=="win"){ clan="LayerWindow"; }
	$(obj).attr("title", tit);
	$(obj).hide();
	$(obj).dialogWin({
		resizable: false, modal: true,width:w,height:h, className:clan,
		closeBut:c/*给需要用到的关闭按钮设置关闭操作*/
	});
}
function pageFun(){
	//滚动与放大缩小窗口触发此处函数
	if($(".leftMenuID").length>0){
		$(".leftMenuID").css({height:getBodyVal().height-$(".WrapHead").height()-$(".Footer").height()+"px"});
	}
	if($(".goTopBut").length>0){
		if(getBodyVal().top>20){
			$(".goTopBut").css({display:"block"});
			if($(".Footer").length>0){ $(".goTopBut").css({bottom:$(".Footer").outerHeight()+"px"}); }
		}else{ $(".goTopBut").css({display:"none"}); }
	}
	/*
	if($(".Head .bgRight").length>0){
		//动态固定头部右块
		$(".Head .bgRight").css({marginLeft:getBodyVal().left+"px"});
	}
	*/
}
$(function(){
	pageFun();/*加载初始*/
	window.onresize = function(){ pageFun(); };
	window.onscroll = function(){ pageFun(); };

	//设置最小宽度
	if($(".WrapHead").length>0){
		$("html").css({minWidth:"1000px"});
		$(".WrapHead_height").css({height:$(".WrapHead").outerHeight()+"px"});
	}
	//菜单
	if($(".WrapMenu").length>0){
		WrapMenuFun();
		var headMenuFun = new SellerScroll("#headMenuObj");
	}else{
		$("body").addClass("Popup");
		$("body").append("<a class='goTopBut' href='javascript:;' onclick='$(\"html\").scrollTop(0);$(\"body\").scrollTop(0);'></a>");
	}
	//公告提示
	if($(".NoticeGongG_T").length>0){
		function NoticeLink_Fun(){ clearTimeout(NoticeLink_Time);NoticeViewerFun(".NoticeGongG_T",".NoticeGongG_G","公告"); }
		NoticeLink_Fun();
		$(".NoticeGongG_T a").click(function(){ NoticeLink_Fun(); });
		var NoticeLink_Time = setTimeout(function(){ NoticeLink_Fun(); },4000);
	}
	//错误提示
	if($(".NoticeError_T").length>0){
		function NoticeError_T_Fun(){ NoticeViewerFun(".NoticeError_T",".NoticeError_G","错误提醒"); }
		NoticeError_T_Fun();
		$(".NoticeError_T a").click(function(){ NoticeError_T_Fun(); });
		$(".NoticeError_G .m b a").click(function(){ NoticeError_T_Fun(); });
	}
	//错误提示_右上
	if($(".NoticeError_T_rt").length>0){
		function NoticeError_T_Fun_rt(){ NoticeViewerFun_rt(".NoticeError_T_rt",".NoticeError_G_rt"); }
		NoticeError_T_Fun_rt();
		$(".NoticeError_T_rt").click(function(){ NoticeError_T_Fun_rt(); });
		$(".NoticeError_G_rt .m b a").click(function(){ NoticeError_T_Fun_rt(); });
		$(".NoticeError_G_rt .up").click(function(){ NoticeError_T_Fun_rt(); });
	}
	//左侧菜单显示隐藏
	if($(".DragBar").length>0){
		$(".DragBar").click(function(){
			if($(".WrapMiddle_L").is(':visible')){
				$(".WrapMiddle_L").slideUp('fast');
				$(this).attr({title:"展开左侧菜单"});
				$(".DragBar b").addClass("toRight");
			}else{
				$(".WrapMiddle_L").slideDown('fast').show();
				$(this).attr({title:"收缩左侧菜单"});
				$(".DragBar b").removeClass("toRight");
			}
		});
	}
	//输入框提示
	if($(".txtPoint").length>0){
		$(".txtPoint").each(function(i){
			$(this).attr({value:$(this).attr("alt")});
			$(this).focus(function(){ $(this).removeClass("txtPoint");if(this.value==this.alt){this.value='';} });
			$(this).blur(function(){ if(this.value==''){this.value=this.alt;$(this).addClass("txtPoint");} });
		});
	}
	//内页标签切换
	//if($("#tabT_obj").length>0){ new CommonTab(0,"tabT_obj","li","tabG_obj_",0); }
	if($("#tabs").length>0){ $("#tabs").tabs(); }

	if($(".GRID").length>0){
		$(".GRID tr").each(function(i){
			if(i%2==0 && i!=0){ $(this).addClass("color"); }
			if($(this).attr("class")!="none"){
				$(this).hover(
					function(e){
						$(this).addClass("move");
					},function(e){
						$(this).removeClass("move");
					}
				);
			}
		});
	}

	//收缩内容
	if($(".ShrinkObj").length>0){ StretchShrink(".ShrinkObj"); }

	if($.browser.msie && $.browser.version.substr(0,1)=="6"){
		$("body").supersleight({shim: "style/images/transparent.gif"});
		$("input[type=text]").addClass("inputTxt");
		$(".Search input[type=text]").addClass("SearInputTxt");
		//$(".Footer").css({marginTop:getBodyVal().top+"px"});
	}
});
