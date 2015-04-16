// KT编辑器
// 用法示例：<div kt-editor ng-model="content" width="500" height="300"><div>
// 
angular.module('KTPLAY').directive('ktEditor',[function(){
	return {
		require: '?ngModel',
		restrict: 'AE',
		scope: {
			ktEditor: '@',
			width: '@', 
			height: '@'
		},
		link: function(scope, element, attrs, ctrl) {
			seajs.use(['/vender/xheditor/1.2.1/xheditor-1.2.1.min.js'], function(){
			seajs.use(['/vender/xheditor/1.2.1/xheditor_lang/zh-cn.js'], function(){
				var editor=$(element).xheditor({
					// tools:'full',
					width:scope.width||'100%',
					height:scope.height||240,
					skin:'default', 
					upBtnText:'上传',
					upImgUrl: '/api/upload',//接口返回格式 {"err":"","msg":"http://www.xx.com/200906030521128703.gif"}
					upImgExt:'jpg,jpeg,png',
					html5Upload:false, 
					blur: function(){
						var value = editor.getSource();
						scope.$apply(function(){
							ctrl.$setViewValue(value);
						});
					}
				});
				// editor.focus();
				// editor.setSource('str')
				// sHtml=editor.getSource()
				// editor.appendHTML('<p>aaa</p>')
				// editor.pasteHTML('<p>aaa</p>')
				// editor.pasteText('str')
				// sHtml=editor.formatXHTML('<b>aaa</b>')
				// editor.toggleSource()
				// editor.toggleFullscreen()
				// alert(editor.settings.upImgExt);
				// editor.settings.upImgExt='txt,doc';
			});});
		}
	};
}]);