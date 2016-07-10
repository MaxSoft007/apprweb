
/************************************
 *审批信息修改模块
 *@author zhaoyl
 *@date 2016-07-06
 *@describe
 *WebUpdate.close(); //关闭窗口
 *WebUpdate.update({...}); //更新操作
 *WebUpdate.ajax_submit(); //提交表单
 ************************************/
var WebUpdate = function(){

	var is_first = true;//单次加载开关
	var des_e = $("body");
	var parent_id = 'display_update_window';

	return {
		update:function(options){
			
			//开始对参数进行初始化
			if((typeof(options.billstate)=='undefined'||($.trim(options.billstate)!='提交'&&$.trim(options.billstate)!='审批进行中'))){
				$.messager.alert("警告","您没有权限编辑此单据！","warning");
				return;
			}
			if(typeof(options.id)=='undefined'){
				options.id = parent_id;
			}else{
				parent_id = options.id;
			}

			if(typeof(options.title)=='undefined' || $.trim(options.title).length==0){
				options.title = '更新信息';
			}

			if(typeof(options.width)=='undefined'){
				options.width = 800;
			}

			if(typeof(options.height)=='undefined'){
				options.height = 400;
			}

			if(is_first){
				
				//开始添加更新界面
				//$("body").append("<div id='"+parent_id+"'></div>");
				$('#'+parent_id).hide();
				$("#"+parent_id).html( "<form id='form_"+parent_id+"' >"
								+ "<div class='PAD1'>"
								+ "	<div class='ViewArea'>"
								+ "		<table width='100%' cellspacing='0' align='center'>"
								+ "			<tr>"
								+ "				<th style='text-align:center;'>任职部门</th><td><div id='dept'></div></td>"
								+ "				<th style='text-align:center;'>任职岗位</th><td><div id='post'></div></td>"
								+ "			</tr>"
								+ "			<tr>"
								+ "				<th style='text-align:center;'>岗位等级</th><td><div id='post_level'></div></td>"
								+ "				<th style='text-align:center;'>领导职务</th><td><div id='jobname'></div></td>"
								+ "			</tr>"
								+ "			<tr>"
								+ "				<th style='text-align:center;'>负责部门</th><td><div id='fz_dept'></div></td>"
								+ "				<th></th><td></td>"
								+ "			</tr>"
								+ "		</table>"
								+ "	</div>"
								+ "</div>"
								+ "</form>"
								+ "	<div align='center' style='text-align:center;position:absolute;bottom:0;padding-bottom:20px;left:35%;right:35%;'>"
								+ "		<a href ='javascript:WebUpdate.ajax_submit();' class='Bu1'><b><i class='icon i_Save_2'></i>保存</b></a>"
								+ "		<span style='margin-left:25px;'></span>"
								+ "		<a href='javascript:WebUpdate.close();' class='Bu1' ><b><i class='icon i_Return_2'></i>取消</b></a>"
								+ "	</div>"
								);

				Refer.init({id:'dept',name:'dept',title:'任职部门参照',url:'http://www.maxsoft.com/dept?',timeout:100});
				Refer.init({id:'post',name:'post',title:'任职岗位参照',url:'http://www.maxsoft.com/post?',timeout:1000});
				Refer.init({id:'post_level',name:'post_level',title:'岗位等级参照',url:'http://www.maxsoft.com/post_level?',timeout:2000});
				Refer.init({id:'jobname',name:'jobname',title:'领导职务参照',url:'http://www.maxsoft.com/jobname?',timeout:3000});
				Refer.init({id:'fz_dept',name:'fz_dept',title:'负责部门参照',url:'http://www.maxsoft.com/fz_dept?',timeout:4000});
				is_first = false;
			}
			//开始弹出界面
			$('#'+parent_id).show();
			$('#'+parent_id).window({
				title:options.title,
				width:options.width,
				height:options.height,
				modal:true,
				collapsible:false,
				minimizable:false,
				maximizable:false,
				resizable:false,
				draggable:false
			});
			
			

		},
		close:function(){
			$("#"+parent_id).window("close");
		},
		ajax_submit:function(){

			var data = $("#form_"+parent_id).serializeArray();
			
			alert(JSON.stringify(data));

			$.messager.progress({text:'操作正在进行...'});
			
			$.ajax({url:"http://www.maxsoft.com",
					async: true,
					cache: false,
					data: data,
					type: "post",
					timeout:5000,
					success: function(msg){
						$.messager.progress('close');
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						$.messager.progress('close');
					
					},
					complete: function(XMLHttpRequest, textStatus) {
						this; // 调用本次AJAX请求时传递的options参数
					}
				});
		}
	}
}();

var Refer = function(){
	var map = new HashMap();//创建一个DataGrid锁Map确保在弹出参照框只执行一次
	return {
		init:function(options){
			if(typeof(options.name)=='undefined'){
				console.error("name值不能为空！请检查...");
			}
			if(typeof(options.id)=='undefined'){
				console.error("id值不能为空！请检查...");
			}
			if(typeof(options.title)=='undefined'){
				options.title = "参照信息";
			}

			//alert(options.url)
			//pdiv_+options.id --> 目标ID
			//pdiv_show_+options.id --> 显示信息域ID
			//pdiv_pk_+options.id --> 隐藏信息ID
			//refer_model+options.id --> 参照实体域ID
			
			var d_input = "<div class='refer_div' id='pdiv_"+options.id+"' tabindex='9999' title='"+options.title+"' url='"+options.url+"' onclick='Refer.model(this);'>"
						+ "	<span id='pdiv_show_"+options.id+"'>AA</span>"
						+ "	<input type='hidden' id='pdiv_pk_"+options.id+"' name='"+options.name+"' value='BB'/>"
						+ "	<a href='javascript:void(0);' onclick='$(this).parent()[0].focus();'>"
						+ "	<img src='resources/common/images/search.png' class='refer_icon' id='pkCorpNameIcon' />"
						+ "	</a>"
						+ "</div>"
						+ "<div id='refer_model_"+options.id+"' align='center'>"
						+ "<div id='refer_datagrid_"+options.id+"'></div>"
						+ "</div>";
						
			$("#"+options.id).html(d_input);
			map.put(options.id,true);
		},
		model:function(obj){
			var id = obj.id.substr(5);
			var url = obj.getAttribute('url');//获取自定义属性ajax地址
			var timeout = obj.getAttribute('timeout');//获取超时时间
			if(map.get(id)){
				$('#refer_datagrid_'+id).datagrid({
					url:url,
					timeout:timeout,
					fitColumns:true,
					frozenColumns:[[
						{field:'code',title:'编码',width:150},
						{field:'name',title:'名称',width:400}
					]],
					idField:'pk',
					fit:true,
					singleSelect:true,
					pagination:true,
					pageSize: 10, 
					pageList: [10,50,100],
					rownumbers:true,
					queryParams:{},
					onDblClickRow:function(index,row){
						//将选中行的数据赋值给指定元素
			 			$("#pdiv_pk_"+id).attr('value', row.pk);
						document.getElementById("pdiv_show_"+id).innerHTML = row.name;
						$('#refer_model_'+id).window('close');
			 		},
				});
				map.put(id,false);
			}
			var jsdata = '{"total":2,"rows":[{"pk":"K9-DL-01","name":"一","code":"one"},{"pk":"K9-DL-02","name":"二","code":"second"},{"pk":"K9-DL-03","name":"三","code":"three"},{"pk":"K9-DL-04","name":"四","code":"four"},{"pk":"K9-DL-05","name":"五","code":"Five"}]}'
			var data = $.parseJSON(jsdata);  
			$('#refer_datagrid_'+id).datagrid("loadData",data);
			$("#refer_model_"+id).window({
				title:obj.title,
				width:600,
				height:300,
				modal:true,
				collapsible:false,
				minimizable:false,
				maximizable:false,
				resizable:false,
				draggable:true,
			});
			
		}
	}
}();