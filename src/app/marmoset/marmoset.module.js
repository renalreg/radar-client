(function() {
  'use strict';

  var app = angular.module('radar.marmoset', []);

  app.directive('checkboxes', function() {
    return {
      require: '?ngModel',
      scope: {
        options: '='
      },
      template: function(element, attrs) {
        if (attrs.inline === 'true') {
          return '<label ng-repeat="option in options" class="checkbox-inline"><input type="checkbox" ng-model="states[$index]" ng-change="update($index)" /> {{option.label}}</label>';
        } else {
          return '<div ng-repeat="option in options" class="checkbox"><label><input type="checkbox" ng-model="states[$index]" ng-change="update($index)" /> {{option.label}}</label></div>';
        }
      },
      link: function(scope, element, attr, ngModel) {
        if (!ngModel) {
          return;
        }

        function updateState() {
          var value = ngModel.$viewValue;
          var options = scope.options || [];

          for (var i = 0; i < options.length; i++) {
            scope.states[i] = options[i].value === value;
          }
        }

        scope.update = function(index) {
          var value = scope.states[index] ? scope.options[index].value : null;
          ngModel.$setViewValue(value);
          updateState();
        };

        scope.states = {};

        scope.$watch('options', updateState);
        ngModel.$render = updateState;
      }
    }
  });

  function intWidget(scope, field) {
    var element = angular.element('<input />');
    element.attr('class', 'form-control');
    element.attr('integer-validator', '');
    element.attr('name', field.name);
    element.attr('type', 'text');
    element.attr('ng-model', 'field.data[field.name]');
    element.attr('ng-required', 'field.required()');
    return element;
  }

  function floatWidget(scope, field) {
    var element = angular.element('<input />');
    element.attr('class', 'form-control');
    element.attr('number-validator', '');
    element.attr('name', field.name);
    element.attr('type', 'text');
    element.attr('ng-model', 'field.data[field.name]');
    element.attr('ng-required', 'field.required()');
    return element;
  }

  function stringWidget(scope, field) {
    return angular.element('<input class="form-control" type="text" ng-model="field.data[field.name]" />');
  }

  function dateWidget(scope, field) {
    var element = angular.element('<input />');
    element.attr('class', 'form-control');
    element.attr('date-validator', '');
    element.attr('frm-date-picker', '');
    element.attr('name', field.name);
    element.attr('ng-model', 'field.data[field.name]');
    element.attr('ng-required', 'field.required()');
    return element;
  }

  function selectWidget(scope, field) {
    // TODO add option for null

    var element = angular.element('<select></select>');
    element.attr('class', 'form-control');
    element.attr('name', field.name);
    element.attr('ng-model', 'field.data[field.name]');
    element.attr('ng-options', 'x.value as x.label for x in field.options');
    element.attr('ng-required', 'field.required()');
    return element;
  }

  function radioWidget(scope, field, data) {
    // TODO add radio for null

    var labelElement = angular.element('<label></label>');

    var inputElement = angular.element('<input />');
    inputElement.attr('name', field.name);
    inputElement.attr('type', 'radio');
    inputElement.attr('ng-value', 'option.value');
    inputElement.attr('ng-model', 'field.data[field.name]');
    inputElement.attr('ng-required', 'field.required()');
    labelElement.append(inputElement);

    labelElement.append('{{option.label}}');

    var rootElement;

    if (data.inline) {
      labelElement.attr('class', 'radio-inline');
      labelElement.attr('ng-repeat', 'option in field.options');
      rootElement = labelElement;
    } else {
      var divElement = angular.element('<div></div>');
      divElement.attr('class', 'radio');
      divElement.attr('ng-repeat', 'option in field.options');
      divElement.append(labelElement);
      rootElement = divElement;
    }

    return rootElement;
  }

  function yesNoRadioWidget(scope, field) {
    scope.options = [
      {value: true, label: 'Yes'},
      {value: false, label: 'No'},
      {value: null, label: 'Not Answered'}
    ];

    var divElement = angular.element('<div></div>');
    divElement.attr('class', 'radio');
    divElement.attr('ng-repeat', 'option in options');

    var labelElement = angular.element('<label></label>');
    divElement.append(labelElement);

    var inputElement = angular.element('<input />');
    inputElement.attr('name', field.name);
    inputElement.attr('type', 'radio');
    inputElement.attr('ng-value', 'option.value');
    inputElement.attr('ng-model', 'field.data[field.name]');
    inputElement.attr('ng-required', 'field.required()');
    labelElement.append(inputElement);

    labelElement.append('{{option.label}}');

    return divElement;
  }

  function checkboxesWidget(scope, field, data) {
    var element = angular.element('<div></div>')
    element.attr('checkboxes', '');
    element.attr('ng-model', 'field.data[field.name]');
    element.attr('ng-required', 'field.required()');
    element.attr('options', 'field.options');
    element.attr('inline', data.inline ? 'true' : 'false');
    return element;
  }

  function staticWidget(scope, field) {
    if (field.type === 'date') {
      return angular.element('<p class="form-control-static">{{field.value() | dateFormat}}</p>');
    } else if (field.type === 'datetime') {
      return angular.element('<p class="form-control-static">{{field.value() | dateTimeFormat}}</p>');
    } else if (field.type === 'boolean') {
      return angular.element('<p class="form-control-static"><span tick="field.value()"></span></p>');
    } else {
      return angular.element('<p class="form-control-static">{{field.value() | missing}}</p>');
    }
  }

  function valueView(scope, field) {
    if (field.options) {
      return angular.element('<span>{{field.display() | missing}}</span>');
    } else if (field.type === 'date') {
      return angular.element('<span>{{field.value() | dateFormat}}</span>');
    } else if (field.type === 'datetime') {
      return angular.element('<span>{{field.value() | dateTimeFormat}}</span>');
    } else if (field.type === 'boolean') {
      return angular.element('<span tick="field.value()"></span>');
    } else {
      return angular.element('<span>{{field.value() | missing}}</span>');
    }
  }

  function Registry() {
    this.widgets = {};
    this.defaultWidgets = {};
    this.defaultSelectWidget = null;
    this.defaultFormulaWidgets = {};

    this.views = {};
    this.defaultViews = {};

    this.required = {};
    this.visible = {};
    this.formula = {};
  }

  /** Register a widget factory. */
  Registry.prototype.addWidget = function(name, factory) {
    this.widgets[name] = factory;
  };

  /** Return the widget factory for the given field. */
  Registry.prototype.getWidget = function(field) {
    var name = field.widget === undefined ? null : field.widget.name;

    // No explicit widget in the field definition so we'll use
    // the default widget for this type of field.
    if (!name) {
      var type = field.type;
      var formula = field.formula !== undefined;
      var select = field.options !== undefined;

      if (formula) {
        name = this.defaultFormulaWidgets[type];
      } else if (select) {
        name = this.defaultSelectWidget || this.defaultWidgets[type];
      } else {
        name = this.defaultWidgets[type];
      }
    }

    var factory = this.widgets[name];

    if (factory === undefined) {
      throw 'No widget factory for: ' + name;
    }

    return factory;
  };

  /** Set the default widget for a type. */
  Registry.prototype.setDefaultWidget = function(type, name) {
    this.defaultWidgets[type] = name;
  };

  /** Set the default formula widget for a type. */
  Registry.prototype.setDefaultFormulaWidget = function(type, name) {
    this.defaultFormulaWidgets[type] = name;
  };

  /** Set the default select widget (for fields with options). */
  Registry.prototype.setDefaultSelectWidget = function(name) {
    this.defaultSelectWidget = name;
  };

  /** Register a required function. */
  Registry.prototype.addRequired = function(name, f) {
    this.required[name] = f;
  };

  /** Get a required function. */
  Registry.prototype.getRequired = function(name) {
    var f = this.required[name];

    if (f === undefined) {
      throw 'No required function for: ' + name;
    }

    return f;
  };

  /** Register a visible function. */
  Registry.prototype.addVisible = function(name, f) {
    this.visible[name] = f;
  };

  /** Get a visible function. */
  Registry.prototype.getVisible = function(name) {
    var f = this.visible[name];

    if (f === undefined) {
      throw 'No visible function for: ' + name;
    }

    return f;
  };

  /** Register a formula function. */
  Registry.prototype.addFormula = function(name, f) {
    this.formula[name] = f;
  };

  /** Get a formula function. */
  Registry.prototype.getFormula = function(name) {
    var f = this.formula[name];

    if (f === undefined) {
      throw 'No formula function for: ' + name;
    }

    return f;
  };

  /** Register a view factory. */
  Registry.prototype.addView = function(name, factory) {
    this.views[name] = factory;
  };

  /** Return the view factory for the given field. */
  Registry.prototype.getView = function(field) {
    var name = field.view === undefined ? null : field.view.name;

    // No explicit view in the field definition so we'll use
    // the default view for this type of field.
    if (!name) {
      var type = field.type;
      name = this.defaultViews[type];
    }

    var factory = this.views[name];

    if (factory === undefined) {
      throw 'No view factory for: ' + name;
    }

    return factory;
  };

  /** Set the default view for a type. */
  Registry.prototype.setDefaultView = function(type, name) {
    this.defaultViews[type] = name;
  };

  function jsHandler(field, data) {
    /* jshint evil:true */
    var f = new Function('form', 'path', data.value);

    return function(wrapped) {
      return f(wrapped.data, [wrapped.name]);
    };
  }

  function jsFormula(field, data) {
    /* jshint evil:true */
    var f = new Function('form', 'path', data.value);

    return function(wrapped) {
      var newValue = f(wrapped.data, [wrapped.name]);

      // Update the field's value
      wrapped.value(newValue);
    };
  }

  var registry = new Registry();

  // Register widgets
  registry.addWidget('string', stringWidget);
  registry.addWidget('date', dateWidget);
  registry.addWidget('int', intWidget);
  registry.addWidget('float', floatWidget);
  registry.addWidget('select', selectWidget);
  registry.addWidget('radio', radioWidget);
  registry.addWidget('yesNoRadio', yesNoRadioWidget);
  registry.addWidget('checkboxes', checkboxesWidget);
  registry.addWidget('static', staticWidget);

  // Set default widgets
  registry.setDefaultWidget('int', 'int');
  registry.setDefaultWidget('float', 'float');
  registry.setDefaultWidget('string', 'string');
  registry.setDefaultWidget('boolean', 'yesNoRadio');
  registry.setDefaultWidget('date', 'date');
  registry.setDefaultWidget('datetime', 'string');
  registry.setDefaultFormulaWidget('int', 'static');
  registry.setDefaultFormulaWidget('float', 'static');
  registry.setDefaultFormulaWidget('string', 'static');
  registry.setDefaultFormulaWidget('boolean', 'static');
  registry.setDefaultFormulaWidget('date', 'static');
  registry.setDefaultFormulaWidget('datetime', 'static');
  registry.setDefaultSelectWidget('select');

  // Add views
  registry.addView('value', valueView);

  // Set default views
  registry.setDefaultView('int', 'value');
  registry.setDefaultView('float', 'value');
  registry.setDefaultView('string', 'value');
  registry.setDefaultView('boolean', 'value');
  registry.setDefaultView('date', 'value');
  registry.setDefaultView('datetime', 'value');

  // Register functions
  registry.addRequired('js', jsHandler);
  registry.addVisible('js', jsHandler);
  registry.addFormula('js', jsFormula);

  /** Wrap a value in a function. */
  function wrap(value) {
    return function() {
      return value;
    };
  }

  /** Do nothing. */
  function noop() {
    return;
  }

  /** A form schema. */
  function Schema(registry, data) {
    this.registry = registry;
    this.fields = [];

    for (var i = 0; i < data.length; i++) {
      var field = new Field(this, data[i]);
      this.fields.push(field);
    }
  }

  /** A field in the form schema. */
  function Field(schema, data) {
    var self = this;

    self.schema = schema;
    self.name = data.name;
    self.type = data.type;
    self.label = data.label;
    self.help = data.help;

    var registy = schema.registry;

    var required;

    if (data.formula) {
      // Formula fields are never required
      required = false;
    } else if (data.required === undefined) {
      // Default to required
      required = true;
    } else {
      // Use supplied value
      required = data.required;
    }

    if (required === true) {
      self.required = wrap(true);
    } else if (required === false) {
      self.required = wrap(false);
    } else {
      self.required = registry.getRequired(required.name)(self, required);
    }

    // Default to visible
    var visible = data.visible === undefined ? true : data.visible;

    if (visible === true) {
      self.visible = wrap(true);
    } else if (visible === false) {
      self.visible = wrap(false);
    } else {
      self.visible = registry.getVisible(visible.name)(self, visible);
    }

    self.options = data.options;

    var widgetFactory = registry.getWidget(data);

    // Return a widget element
    self.widget = function(scope) {
      return widgetFactory(scope, self, data.widget || {});
    };

    var viewFactory = registry.getView(data);

    // Return a view element
    self.view = function(scope) {
      return viewFactory(scope, self, data.view || {});
    };

    var formula = data.formula;

    if (formula === undefined) {
      this.update = wrap(noop);
    } else {
      this.update = registry.getFormula(formula.name)(self, formula);
    }
  }

  app.directive('marmosetList', [function() {
    /** Wrap a field so it has access to its value. */
    function wrapField(field, data) {
      var wrapped = Object.create(field);

      wrapped.data = data;
      
      wrapped.visible = function() {
        return field.visible(wrapped); 
      };

      wrapped.value = function() {
        return data[field.name];
      };

      wrapped.display = function() {
        var value = wrapped.value();

        if (value === undefined) {
          return null;
        }

        if (field.options) {
          for (var i = 0; i < field.options.length; i++) {
            if (field.options[i].value === value) {
              return field.options[i].label;
            }
          }

          return null;
        } else {
          return value;
        }
      }

      return wrapped;
    }

    return {
      scope: {
        'schema': '=marmosetList',
        'data': '=?'
      },
      transclude: 'element',
      link: function(scope, element, attr, ctrl, transclude) {
        // Default to empty object
        if (scope.data === undefined) {
          scope.data = {};
        }

        var last = element;

        // Loop through the fields in the schema
        for (var index = 0; index < scope.schema.fields.length; index++) {
          // Wrap each field in a closure
          (function(index) {
            var field = scope.schema.fields[index];
            var wrapped = wrapField(field, scope.data);

            // Create a new scope for each field
            // The field's index is available at $index and the wrapped
            // field at $field.
            var childScope = scope.$new();
            childScope.$field = wrapped;
            childScope.$index = index;

            transclude(childScope, function(clone) {
              // Watch for changes in the field's visibility
              childScope.$watch(function() {
                return childScope.$field.visible();
              }, function(visible) {
                if (visible) {
                  clone.show();
                } else {
                  clone.hide();
                }
              });

              // Add after previous element
              last.after(clone);
              last = clone;
            });
          })(index);
        }
      }
    };
  }]);

  app.directive('marmosetValue', ['$compile', function($compile) {
    return {
      scope: {
        'field': '=marmosetValue'
      },
      link: function(scope, element) {
        var e = scope.field.view();
        element.append(e)
        $compile(e)(scope);
      }
    };
  }]);

  // Directive to render a form
  app.directive('marmosetForm', ['$compile', function($compile) {
    /** Wrap a field so it has access to it's value and any errors. */
    function wrapField(field, data, errors) {
      var wrapped = Object.create(field);

      wrapped.data = data;
      wrapped.errors = errors;

      wrapped.required = function() {
        return field.required(wrapped);
      };

      wrapped.visible = function() {
        return field.visible(wrapped);
      };

      wrapped.valid = function() {
        // Valid if there aren't any errors
        return !errors[field.name];
      };

      wrapped.value = function(value) {
        if (value === undefined) {
          return data[field.name];
        } else {
          data[field.name] = value;
        }
      };

      wrapped.update = function() {
        return field.update(wrapped);
      };

      return wrapped;
    };

    return {
      scope: {
        schema: '=marmosetForm',
        data: '=',
        errors: '='
      },
      link: function(scope, element) {
        // Default to empty object
        if (scope.data === undefined) {
          scope.data = {};
        }

        // Default to no errors :)
        if (scope.errors === undefined) {
          scope.errors = {};
        }

        // Note: add the container to the DOM here so we can $compile in the for loop
        var container = angular.element('<div></div>');
        element.append(container);

        // Loop through the fields in the schema
        for (var i = 0; i < scope.schema.fields.length; i++) {
          var field = scope.schema.fields[i];
          var wrapped = wrapField(field, scope.data, scope.errors);

          var fieldScope = scope.$new();
          fieldScope.field = wrapped;

          // Note: important that the element is compiled after being added to the DOM
          var fieldElement = angular.element('<div marmoset-field="field"></div>');
          container.append(fieldElement);
          $compile(fieldElement)(fieldScope);
        }
      }
    };
  }]);

  // Directive to render a field
  app.directive('marmosetField', ['$compile', '$templateCache', function($compile, $templateCache) {
    return {
      require: '?^form',
      scope: {
        field: '=marmosetField'
      },
      templateUrl: 'app/marmoset/field.html',
      link: function(scope, element, attr, formCtrl) {
        scope.form = formCtrl;

        var targetElement = element.find('[widget]');
        targetElement.removeAttr('widget');

        // Create a new child scope for the widget
        var widgetScope = scope.$new();
        var widgetElement = scope.field.widget(widgetScope);

        // Anything that uses ng-model must be compiled *after* being added
        // to the DOM otherwise it won't be able to find the form controller.
        targetElement.append(widgetElement);
        $compile(widgetElement)(widgetScope);

        // Set the field to null when it is hidden
        scope.$watch(function() {
          return scope.field.visible();
        }, function(visible) {
          // Hidden
          if (!visible) {
            scope.field.data[scope.field.name] = null;
          }
        });

        // Notify the field when other fields change
        scope.$watch('field.data', scope.field.update, true);

        function getModelCtrl() {
          // frmCtrl (FormController) will be null if this directive isn't inside a form
          // modelCtrl (NgModelController) will be undefined on load
          return formCtrl ? (formCtrl[scope.field.name] || null) : null;
        }

        scope.error = function(name) {
          var modelCtrl = getModelCtrl();

          if (!modelCtrl) {
            return false;
          }

          return !!modelCtrl.$error[name];
        };

        // Return true if the field is valid (no client-side or server-side errors)
        scope.valid = function() {
          var modelCtrl = getModelCtrl();

          // If modelCtrl isn't availble yet treat the field as valid and pristine
          var valid = modelCtrl ? modelCtrl.$valid : true;
          var pristine = modelCtrl ? modelCtrl.$pristine : false;

          // Note: we ignore client-side errors if the field is pristine (not-edited)
          return (valid || pristine) && scope.field.valid();
        };
      }
    };
  }]);

  app.factory('createSchema', function() {
    return function(data) {
      return new Schema(registry, data);
    };
  });
})();
