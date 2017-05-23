/************************
des: 上传附件指令2
date: 2017/02/28
auth: mike
************************/
import ngApp from '../../components/app';

var _timer;
ngApp.directive('dropzonefile',['questfactory','dialogService',function(questfactory,dialogService) {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {
            var config = {
                url: '/upload-file',
                maxFilesize: 50,
                maxThumbnailFilesize: 10,
                parallelUploads: 1,
                autoProcessQueue: true
            };

            var eventHandlers = {
                'addedfile': function(file) {
                },

                'success': function (file, response) {

                },

                'error' : function (file,response) {

                }

            };

            var dropzone = new Dropzone(element[0], config);

            angular.forEach(eventHandlers, function(handler, event) {
                dropzone.on(event, handler);
            });

            scope.processDropzone = function() {
                dropzone.processQueue();
            };

            scope.resetDropzone = function() {
                dropzone.removeAllFiles();
            };

        }
    }
}]);
            