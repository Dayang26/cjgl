/**
 *
 */

/***
 * bootbox的默认参数
 */

bootbox.setDefaults({
	locale:'zh_CN',
	size: 'small',
	title:'提示'
});

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


	$.fn.form=function(option,params){
		if(typeof option=='string'){
			method=$.fn.form.methods[option];
			return method(this,params);
		}
		return;
	};

	$.fn.form.methods={
		'clear':function(jq){
			jq.find('input.combobox').each(function(){
				$(this).combobox('setNull');
			})
			jq.find('input').val('');
		},
		'reset':function(jq){
			jq[0].reset();
			jq.find('input.combobox').each(function(){
				$(this).combobox('setValue',$(this).val());
			})
		},
		'getParams':function(jq){
			return jq.serializeObject();
		}
	}

	$.extend({
		'createBtn':function(options){
			var btn=$('<button type="button" class="btn btn-default" />');
			if(options.iconCls){
				var icon=$('<span class="'+options.iconCls+'"aria-hidden="true"></span>');
				btn.append(icon);
				btn.append('&nbsp;')
			}
			if(options.text){
				btn.append(options.text);
			}
			if(options.handler){
				btn.click(options.handler);
			}
			if(options.btnCls){
				btn.attr('class',options.btnCls);
			}
			if(options.isCloseBtn){
				btn.attr('data-dismiss','modal');
			}
			return btn;
		},
		/*  'createDialog':function(){
            var dialog=$('<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"/>');
             dialog.appendTo($('body'));
             var modal_dialog=$('<div class="modal-dialog" role="document"/>');
             modal_dialog.appendTo(dialog);
             var modal_content=$('<div class="modal-content"/>')
             modal_conten.appendTo(modal_dialog);
             var modal_header=$('<div class=""modal-header><button type')
             if(options.title){
                 modal_hander.find('h4').text(options.title);
             }
             modal_hander.appendTo(modal_content);
             var model_body=$('<div class="modal-body"/>');

          }


        })*/
		'createDialog':function(options){
			var dialog=$('<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" />');
			dialog.appendTo($('body'));
			var modal_dialog=$('<div class="modal-dialog" role="document" />');
			modal_dialog.appendTo(dialog);
			var modal_content=$('<div class="modal-content"/>');
			modal_content.appendTo(modal_dialog);
			var modal_header=$('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">对话框</h4></div>');
			if(options.title){
				modal_header.find('h4').text(options.title);
			}
			modal_header.appendTo(modal_content);
			var modal_body=$('<div class="modal-body" />');
			modal_body.appendTo(modal_content);
			var modal_footer=$('<div class="modal-footer" />');
			modal_footer.appendTo(modal_content);
			if(options.url){
				modal_body.load(options.url);
			}
			if(options.buttons){
				for(var i=0;i<options.buttons,length;i++){
					options.buttons[i].appendTo(modal_footer);
				}
			}
			return dialong.modal({
				show:false
			});
		}
	})



	/* 扩展combobox */
	function createUl(jq, data, options) {
		var ul = $('<ul class="dropdown-menu"/>');
		var val = options.val;
		for (var i = 0; i < data.length; i++) {
			var opt = data[i];
			var li = $('<li/>').val(opt.value).append($('<a/>').text(opt.text));
			if (val == opt.value) {
				li.addClass('active');
				jq.find('input.form-control').val(opt.text);
			}
			ul.append(li);
		}
		ul.find('li').click(function() {
			var self = $(this);
			var oldSelected = $(self.parent().find('.active'));
			var newVal = self.val();
			var oldVal = null;
			if (oldSelected) {
				oldVal = oldSelected.val();
				oldSelected.removeClass('active');
			}
			self.addClass('active');
			jq.prev().val(self.val());
			ul.prev().val(self.find('a').text());
			var callback = options.onchange;
			options.val = self.val();
			if (oldVal !== newVal) {
				callback(newVal, oldVal);
			}
		})
		ul.appendTo(jq);
	}

	function createCombo(jq) {
		var data = jq.options.data;
		jq.hide();
		var div = $('<div class="dropdown"/>');
		var input = $('<input readonly class="dropdown-toggle form-control" data-toggle="dropdown"/>');
		input.appendTo(div);
		jq.after(div);
		if (data) {
			createUl(div, data, jq.options);
		} else {
			var valueField = jq.options.valueField;
			var textField = jq.options.textField;
			var url = jq.options.url;
			$.get(url, function(result) {
				data = [];
				for (var i = 0; i < result.length; i++) {
					var obj1 = result[i];
					var obj2 = {};
					obj2.value = obj1[valueField];
					obj2.text = obj1[textField];
					data.push(obj2);
				}
				jq.options.data = data;
				createUl(div, data, jq.options);
			})
		}
	}

	$.extend($.fn, {
		combobox: function(options, params) {
			if (typeof options == 'string') {
				var self = $(this);
				var method = $.fn.combobox.methods[options];
				return method(self, params);
			}
			options = options || {};

			$(this).each(function() {
				var self = $(this);
				var opts = self.data('combobox');
				if (opts) {
					options = $.extend({}, opts, options);
					$.fn.combobox.methods.destroy(self);
				}
				var optionsStr = '{' + this.dataset['options'] + '}';
				var val = self.val();
				var data_options = eval('(' + optionsStr + ')');
				self.options = $.extend({}, $.fn.combobox.defaults, data_options, options);
				self.options.val = val;
				self.data('combobox', {
					self: self
				});
				createCombo(self);
			})
		}
	})

	$.fn.combobox.defaults = {
		textField: 'text',
		valueField: 'value',
		data: null,
		url: '',
		onchange: function(newVal, oldVal) {

		}
	};

	$.fn.combobox.setDefaults = function(options) {
		$.extend($.fn.combobox.defaults, options);
	};

	$.fn.combobox.methods = {
		'options': function(jq) {
			var self = jq.data('combobox').self;
			return self.options;
		},
		'getValue': function(jq) {
			var self = jq.data('combobox').self;
			var val = self.options.val;
			return val;
		},
		'setValue': function(jq, val) {
			var self = jq.data('combobox').self;
			var data = self.options.data;
			var i;
			for (i = 0; i < data.length; i++) {
				if (data[i].value == val) {
					break;
				}
			}
			if (i < data.length) {
				self.options.val = val;
				jq.val(val);
				var div = jq.siblings('div.dropdown');
				div.find('input.form-control').val(data[i].text);
				div.find('ul>li').removeClass('active');
				$(div.find('ul>li')[i]).addClass('active');
			} else {
				$.fn.combobox.methods.setNull(jq);
			}
		},
		'setNull': function(jq) {
			var self = jq.data('combobox').self;
			self.options.val = '';
			jq.val('');
			var div = jq.siblings('div.dropdown');
			div.find('input.form-control').val('');
			div.find('ul>li').removeClass('active');
		},
		'destroy': function(jq) {
			jq.siblings('div.dropdown').remove();
			jq.show();
		}
	};

	$.parser = {
		'plugins': ['combobox'],
		'parse': function(context) {
			for (var i = 0; i < $.parser.plugins.length; i++) {
				(function() {
					// 控件名
					var name = $.parser.plugins[i];
					// 查找class为easyui-控件名的jq对象，例如，easyui-layout
					var r = $('.' + name, context);

					if (r.length) {
						// 如果有这个对象，那么判断它有没有初始化函数
						if (r[name]) {
							// 如果有直接调用
							r[name]();
						}
					}
				})();
			}
		}
	}
	$(function() {
		$.parser.parse();
	})
})($);