import Quill from 'quill';

import templateUrl from './text-editor.html';

function textEditor() {
  return {
    restrict: 'A',
    require: 'ngModel',
    templateUrl: templateUrl,
    link: function (scope, element, attrs, ngModel) {
      var container = element.find('.text-editor').get(0);
      var toolbar = element.find('.text-editor-toolbar').get(0);

      var quill = new Quill(container, {
        modules: {
          toolbar: toolbar
        },
        theme: 'snow'
      });

      ngModel.$render = function () {
        quill.root.innerHTML = ngModel.$viewValue || '';
      };

      quill.on('text-change', function () {
        scope.$apply(function () {
          var html = quill.root.innerHTML;
          ngModel.$setViewValue(html);
        });
      });
    }
  };
}

export default textEditor;
