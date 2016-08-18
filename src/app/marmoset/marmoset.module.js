(function() {
  'use strict';

  var app = angular.module('radar.marmoset', []);

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

  function radioWidget(scope, field) {
    // TODO add radio for null

    var divElement = angular.element('<div></div>');
    divElement.attr('class', 'radio');
    divElement.attr('ng-repeat', 'option in field.options');

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

  function Registry() {
    this.widgets = {};
    this.defaultWidgets = {};
    this.defaultSelectWidget = null;
    this.required = {};
    this.visible = {};
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
      var select = field.options !== undefined;

      if (select) {
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

  /** Set the default select widget (for fields with options). */
  Registry.prototype.setDefaultSelectWidget = function(name) {
    this.defaultSelectWidget = name;
  };

  /** Register a required function. */
  Registry.prototype.addRequired = function(type, f) {
    this.required[type] = f;
  };

  /** Get a required function. */
  Registry.prototype.getRequired = function(type) {
    var f = this.required[type];

    if (f === undefined) {
      throw 'No required function for: ' + type;
    }

    return f;
  };

  /** Register a visible function. */
  Registry.prototype.addVisible = function(type, f) {
    this.visible[type] = f;
  };

  /** Get a visible function. */
  Registry.prototype.getVisible = function(type) {
    var f = this.visible[type];

    if (f === undefined) {
      throw 'No visible function for: ' + type;
    }

    return f;
  };

  function jsHandler(field, data) {
    /*jshint evil:true */
    var f = new Function('form', 'path', data.value);

    return function(wrapped) {
      return f(wrapped.data, [wrapped.name]);
    };
  }

  var registry = new Registry();

  registry.addWidget('string', stringWidget);
  registry.addWidget('date', dateWidget);
  registry.addWidget('int', intWidget);
  registry.addWidget('float', floatWidget);
  registry.addWidget('select', selectWidget);
  registry.addWidget('radio', radioWidget);
  registry.addWidget('yesNoRadio', yesNoRadioWidget);

  registry.setDefaultWidget('int', 'int');
  registry.setDefaultWidget('float', 'float');
  registry.setDefaultWidget('string', 'string');
  registry.setDefaultWidget('boolean', 'yesNoRadio');
  registry.setDefaultWidget('date', 'date');
  registry.setDefaultWidget('datetime', 'string');

  registry.setDefaultSelectWidget('select');

  registry.addRequired('js', jsHandler);
  registry.addVisible('js', jsHandler);

  /** Wrap a value in a function. */
  function wrap(value) {
    return function() {
      return value;
    };
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
    this.schema = schema;
    this.name = data.name;
    this.type = data.type;
    this.label = data.label;
    this.help = data.help;

    // Default to required
    var required = data.required === undefined ? true : data.required;

    if (required === true) {
      this.required = wrap(true);
    } else if (required === false) {
      this.required = wrap(false);
    } else {
      this.required = this.schema.registry.getRequired(required.type)(this, required);
    }

    /// Default to visible
    var visible = data.visible === undefined ? true : data.visible;

    if (visible === true) {
      this.visible = wrap(true);
    } else if (visible === false) {
      this.visible = wrap(false);
    } else {
      this.visible = this.schema.registry.getVisible(visible.type)(this, visible);
    }

    this.options = data.options;

    // Return a widget element
    this.widget = function(scope) {
      return this.schema.registry.getWidget(this)(scope, this, data.widget);
    };
  }

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

    return wrapped;
  }

  // Directive to render a schema
  app.directive('marmosetSchema', ['$compile', function($compile) {
    return {
      scope: {
        schema: '=marmosetSchema',
        data: '=',
        errors: '='
      },
      link: function(scope, element) {
        // TODO
        if (scope.errors === undefined) {
          scope.errors = {};
        }

        // Note: add the container to the DOM here so we can $compile in the for loop
        var container = angular.element('<div></div>');
        element.append(container);

        // TODO formula fields

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

  // TODO
  app.factory('createSchema', function() {
    return function(data) {
      return new Schema(registry, data);
    };
  });
})();
