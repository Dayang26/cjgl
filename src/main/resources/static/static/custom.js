/**
 * 
 */
(function($){
	$.fn.serializeObject = function(){
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};

	$.extend({
		dialog:{
			'me':function(btn){
				var dialog=$(btn).closest('div.window').children('div.window-body');
				return dialog;
			},
			'form':function(btn){
				var dialog=$.dialog.me(btn);
				return dialog.find('form');
			},
			'grid':function(btn){
				var dialog=$.dialog.me(btn);
				var options=dialog.dialog('options');
				return options.grid;
			},
			'buttons':{
				'save':{
					iconCls:'icon-save',
					text:'保存',
					handler:function(){
						var self=$(this);
						var dialog=$.dialog.me(this);
						var grid=$.dialog.grid(this);
						var saveUrl=dialog.dialog('options').action;
						var form=$.dialog.form(this);
						var params=new FormData(form[0]);
						self.linkbutton('disable');
						$.ajax({
							url:saveUrl,
							type:'post',
							cache:false,
							data:params,
							processData: false,  // 不处理数据  
							contentType: false,   // 不设置内容类型
							success:function(result){
								if(result.success){
									$.messager.show({title:'提示',msg:result.msg});
									grid.datagrid('reload');
									dialog.dialog('close');
								}else{
									$.messager.alert('提示',result.msg,'warning');
									self.linkbutton('enable');
								}
							},
							error:function(){
								$.messager.alert('提示','网络连接失败...','error');
								self.linkbutton('enable');
							}
						})
					}
				},
				'reset': {
					iconCls:'icon-reload',
					text:'重置',
					handler:function(){
						var form=$.dialog.form(this);
						form.form('reset');
					}
				},
				'close':{
					iconCls:'icon-cancel',
					text:'关闭',
					handler:function(){
						var dialog=$.dialog.me(this);
						dialog.dialog('close');
					}
				},
				'search':{
					iconCls:'icon-search',
					text:'查询',
					handler:function(){
						var dialog=$.dialog.me(this);
						var form=$.dialog.form(this);
						var grid=$.dialog.grid(this);
						var params=form.serializeObject();
						grid.datagrid('load',params);
						dialog.dialog('close');
					}
				},
				'clear':{
					iconCls:'icon-clear',
					text:'清除条件',
					handler:function(){
						//var dialog=$.dialog.me(this);
						var form=$.dialog.form(this);
						var grid=$.dialog.grid(this);
						form.form('clear');
						grid.datagrid('load',{});
					}
				}
			}
		}
	});
	$.extend({
		crudgrid:{
			'grid':function(btn){
				var grid=$(btn).closest('div.datagrid-wrap').children('div.datagrid-view').children('table.datagrid-f');
				return grid;
			},
			'defaults':{
				fit:true,
				singleSelect:true,
				fitColumns:true,
				autoRowHeight:true,
				//striped:true,
				idField:'id',
				sortName:'id',
				sortOrder:'asc',
				pagination:true,
				'dialog':{
					'add':{
						title:'新增',
						width:400,
						height:300,
						modal:true,
						cache:false,
						buttons:[$.dialog.buttons.save,$.dialog.buttons.reset,$.dialog.buttons.close]	
					},
					'edit':{
						title:'修改',
						width:400,
						height:300,
						modal:true,
						cache:false,
						buttons:[$.dialog.buttons.save,$.dialog.buttons.reset,$.dialog.buttons.close]	
					},
					'search':{
						title:'查询',
						width:400,
						height:300,
						model:true,
						cache:false,
						buttons:[$.dialog.buttons.search,$.dialog.buttons.clear,$.dialog.buttons.close]
					}
				}
			},
			'buttons':{
				'add':{
					iconCls:'icon-add',
					text:'新增',
					handler:function(){
						var grid=$.crudgrid.grid(this);
						grid.datagrid('dialog.create','add');
					}
				},
				'edit':{
					iconCls:'icon-edit',
					text:'修改',
					handler:function(){
						var grid=$.crudgrid.grid(this);
						var row=grid.datagrid('getSelected');
						if(!row){
							$.messager.alert('提示','请先选择一行，再进行此操作...','info');
							return;
						}
						var params={id:row.id};
						grid.datagrid('dialog.create',{dialogName:'edit',queryParams:params});
					}		
				},
				'remove':{
					iconCls:'icon-cancel',
					text:'删除',
					handler:function(){
						var grid=$.crudgrid.grid(this);
						var row=grid.datagrid('getSelected');
						if(!row){
							$.messager.alert('提示','请先选择一行，再进行此操作...','info');
							return;
						}
						var options=grid.datagrid('options');
						var url=options.dialog.remove.url;
						var msg=options.dialog.remove.msg;
						$.messager.confirm('提示',msg,function(r){
							if(r){
								$.post(url,{id:row.id},function(result){
									if(result.success){
										$.messager.show({title:'提示',msg:result.msg});
										grid.datagrid('reload');
									}else{
										$.messager.alert('提示',result.msg,'warning');
									}
								})
							}
						})
					}
				},
				'search':{
					iconCls:'icon-search',
					text:'查询',
					handler:function(){
						var grid=$.crudgrid.grid(this);
						var queryParams=grid.datagrid('options').queryParams;
						grid.datagrid('dialog.create',{dialogName:'search',queryParams:queryParams});
					}
				},
				'refresh':{
					iconCls:'icon-reload',
					text:'刷新',
					handler:function(){
						var grid=$.crudgrid.grid(this);
						grid.datagrid('clearSelections');
						grid.datagrid('reload');
					}
				}
				
			}
		}
	})
	
	$.extend($.fn.datagrid.methods,{
		'dialog.create':function(jq,param){
			jq.each(function(){
				var grid=$(this);
				var dialogName="add";
				var queryParams={};
				if(typeof param=='string'){
					dialogName=param;
				}else{
					dialogName=param.dialogName;
					queryParams=param.queryParams?param.queryParams:{};
				}
				var dialog=$('<div/>');
				dialog.appendTo(grid.parent());
				var gridOptions=grid.datagrid('options');
				var options=gridOptions.dialog[dialogName];
				var opts=$.extend({},$.crudgrid.defaults.dialog[dialogName]||{},{
					grid:grid,
					queryParams : queryParams,
					onClose:function(){
						dialog.dialog('destroy');
						dialog.remove();
					}
				},options);
				dialog.dialog(opts);
			})
		}
	})
})($);