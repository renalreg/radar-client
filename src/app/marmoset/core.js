import fieldTemplateUrl from './field.html';

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

/** Return the widget directive for the given field. */
Registry.prototype.getWidget = function(field) {
  var name = field.widget.name;

  // No explicit widget in the field definition so we'll use
  // the default widget for this type of field.
  if (!name) {
    var type = field.type;
    var formula = field.formula !== null;
    var select = field.options !== null;

    if (formula) {
      name = this.defaultFormulaWidgets[type];
    } else if (select) {
      name = this.defaultSelectWidget || this.defaultWidgets[type];
    } else {
      name = this.defaultWidgets[type];
    }
  }

  var directive = this.widgets[name];

  if (directive === undefined) {
    throw 'No widget directive for: ' + name;
  }

  return directive;
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

/** Return the view directive for the given field. */
Registry.prototype.getView = function(field) {
  var name = field.value.name;

  // No explicit view in the field definition so we'll use
  // the default view for this type of field.
  if (!name) {
    var type = field.type;
    name = this.defaultViews[type];
  }

  var directive = this.views[name];

  if (directive === undefined) {
    throw 'No view directive for: ' + name;
  }

  return directive;
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
registry.addWidget('string', 'marmoset-select-widget');
registry.addWidget('date', 'marmoset-date-widget');
registry.addWidget('int', 'marmoset-int-widget');
registry.addWidget('float', 'marmoset-float-widget');
registry.addWidget('select', 'marmoset-select-widget');
registry.addWidget('radio', 'marmoset-radio-widget');
registry.addWidget('yesNoRadio', 'marmoset-yes-no-radio-widget');
registry.addWidget('checkboxes', 'marmoset-checkboxes-widget');
registry.addWidget('static', 'marmoset-static-widget');

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
registry.addView('basic', 'marmoset-basic-view');

// Set default views
registry.setDefaultView('int', 'basic');
registry.setDefaultView('float', 'basic');
registry.setDefaultView('string', 'basic');
registry.setDefaultView('boolean', 'basic');
registry.setDefaultView('date', 'basic');
registry.setDefaultView('datetime', 'basic');

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

/** A form schema. */
function Schema(registry, data) {
  this.registry = registry;

  this.columns = data.columns === undefined ? [] : data.columns;
  this.sortBy = data.sortBy === undefined ? null : data.sortBy;
  this.reverse = data.reverse === undefined ? false : data.reverse;
  this.fields = [];

  for (var i = 0; i < data.fields.length; i++) {
    var field = new Field(this, data.fields[i]);
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
  self.help = data.help || null;
  self.options = (data.options && data.options.length) ? data.options : null;
  self.widget = data.widget || {};
  self.view = data.view || {};
  self.column = data.column === undefined ? false : data.column;

  var registry = schema.registry;

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

  var formula = data.formula;

  if (formula === undefined) {
    self.formula = null;
  } else {
    self.formula = registry.getFormula(formula.name)(self, formula);
  }
}

Field.prototype.getWidget = function() {
  return this.schema.registry.getWidget(this);
};

Field.prototype.getView = function() {
  return this.schema.registry.getView(this);
};

function builder(scope, element, transclude) {
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
    };

    return wrapped;
  }

  var last = element;

  return function append(index, field) {
    // Wrap the field so it has access to its data
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
  };
}

function marmosetColumns() {
  return {
    scope: {
      schema: '=marmosetColumns',
      data: '=?'
    },
    transclude: 'element',
    link: function(scope, element, attr, ctrl, transclude) {
      if (scope.data === undefined) {
        scope.data = {};
      }

      var append = builder(scope, element, transclude);
      var fields = scope.schema.fields;
      var nameIndex = {};
      var columns = scope.schema.columns;

      for (var i = 0; i < fields.length; i++) {
        nameIndex[fields[i].name] = fields[i];
      }

      for (var j = 0; j < columns.length; j++) {
        var field = nameIndex[columns[j]];

        if (field !== undefined) {
          append(j, field);
        }
      }
    }
  };
}

function marmosetList() {
  return {
    scope: {
      schema: '=marmosetList',
      data: '=?'
    },
    transclude: 'element',
    link: function(scope, element, attr, ctrl, transclude) {
      if (scope.data === undefined) {
        scope.data = {};
      }

      var append = builder(scope, element, transclude);
      var fields = scope.schema.fields;

      // Loop through the fields in the schema
      for (var i = 0; i < fields.length; i++) {
        append(i, fields[i]);
      }
    }
  };
}

// Directive to render a form
function marmosetForm($compile) {
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
      if (field.formula) {
        field.formula(wrapped);
      }
    };

    return wrapped;
  }

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

      var errors = {};

      scope.$watch('errors', function(value) {
        angular.copy(value || {}, errors);
      }, true);

      // Note: add the container to the DOM here so we can $compile in the for loop
      var container = angular.element('<div></div>');
      element.append(container);

      // Loop through the fields in the schema
      for (var i = 0; i < scope.schema.fields.length; i++) {
        var field = scope.schema.fields[i];
        var wrapped = wrapField(field, scope.data, errors);

        var fieldScope = scope.$new();
        fieldScope.field = wrapped;

        // Note: important that the element is compiled after being added to the DOM
        var fieldElement = angular.element('<div marmoset-field="field"></div>');
        container.append(fieldElement);
        $compile(fieldElement)(fieldScope);
      }
    }
  };
}

marmosetForm.$inject = ['$compile'];

// Directive to render a field
function marmosetField($compile) {
  return {
    require: '?^form',
    scope: {
      field: '=marmosetField'
    },
    templateUrl: fieldTemplateUrl,
    link: function(scope, element, attr, formCtrl) {
      scope.form = formCtrl;

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

        // True if the field is dirty (i.e. the user has interacted with
        // the control) and there is an error
        return modelCtrl.$dirty && !!modelCtrl.$error[name];
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
}

marmosetField.$inject = ['$compile'];

function createSchema() {
  return function(data) {
    return new Schema(registry, data);
  };
}

export {
  marmosetColumns,
  marmosetList,
  marmosetForm,
  marmosetField,
  createSchema
};
