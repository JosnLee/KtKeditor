/**
 * 富文本编辑器指令。
 * 使用：<textarea ng-model="dataObj.content" ng-keditor  ></textarea>
 * 前端config可以覆盖指令的 items，根据自己需求去修改item，默认的话是以下几项
 *
 * 这个指令配置的uploadJson的接口一定要返回{error:"",message:{url:""},code:0}
 * code =0表示成功
 */


angular.module('KTPLAY').directive('ngKeditor',["$parse", function ($parse) {

    var linkFn = function (scope, elm, attr, ctrl) {

        if (typeof KindEditor === 'undefined') {
            console.error('Please import the local resources of kindeditor!');
            return;
        }

        var _config = {
            uploadJson: "api/portal/common/image/xheditor/upload",
            filePostName: "img",
            items: ['source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
                'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
                'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
                'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
                'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image',
                , 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
                'anchor', 'link', 'unlink'],
            allowFileManager: false,
            allowImageUpload: true,
            width: '100%',
            height: '400px',
            autoHeightMode: false,
            afterCreate: function () {
                this.loadPlugin('autoheight');
            }
        };


        var editorId = elm[0],
            editorConfig = scope.config || _config;

        editorConfig.afterChange = function () {
            if (!scope.$$phase) {
                ctrl.$setViewValue(this.html());
                // exception happens here when angular is 1.2.28
                // scope.$apply();
            }
        };
        if (KindEditor) {
          var editor1 = KindEditor.create(editorId, editorConfig);

        }

        ctrl.$parsers.push(function (viewValue) {
            ctrl.$setValidity('keditor', viewValue);
            return viewValue;
        });
        //父变 更新子 监听只绑定一次，否则容易出现一直监听改变，影响效率
        var bindCount=1
        scope.$watch('ngModel', function (newValue, oldValue) {
            if(bindCount>1){
                return false;
            }
            if(newValue){
                editor1.html(newValue);
                bindCount++;
            }
        }, true);
    };

    return {
        require: 'ngModel',
        scope: {config: '=config', ngModel: '=ngModel'},
        link: linkFn
    };
}]);


