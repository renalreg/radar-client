import _ from 'lodash';

function toRadioView() {
  return function toRadioView(modelValue) {
    if (angular.isObject(modelValue)) {
      return modelValue.id;
    } else {
      return modelValue;
    }
  };
}

function toRadioModel() {
  return function toRadioModel(options, viewValue) {
    for (var i = 0; i < options.length; i++) {
      var option = options[i];

      if (angular.isObject(option)) {
        if (option.id === viewValue) {
          return option;
        }
      } else {
        if (option === viewValue) {
          return option;
        }
      }
    }

    return null;
  };
}

function wrapRadioOptions() {
  return function wrapRadioOptions(options) {
    if (options && options.length) {
      // Convert array of primitives (e.g. ['Foo', 'Bar']) into option objects
      // (e.g. [{label: 'Foo', id: 'Foo'}, ...])
      if (!angular.isObject(options[0])) {
        options = _.map(options, function(x) {
          return {
            label: x,
            id: x
          };
        });
      }
    }

    return options;
  };
}

function toSelectModel() {
  return function toSelectModel(option) {
    if (option === null || option === undefined) {
      return null;
    } else {
      return option.value;
    }
  };
}

function toSelectView($parse) {
  return function toSelectView(option, idExpression, labelExpression) {
    if (option === null || option === undefined) {
      option = null;
    } else if (angular.isObject(option)) {
      if (idExpression === undefined) {
        idExpression = 'id';
      }

      if (labelExpression === undefined) {
        labelExpression = 'label';
      }

      var idGetter = $parse(idExpression);
      var labelGetter = $parse(labelExpression);

      option = {
        id: idGetter(option),
        label: labelGetter(option),
        value: option
      };
    } else {
      option = {
        id: option,
        label: option,
        value: option
      };
    }

    return option;
  };
}

toSelectView.$inject = ['$parse'];

function wrapSelectOptions(toSelectView) {
  return function wrapSelectOptions(options, idPath, labelPath) {
    if (options && options.length) {
      // Convert array (e.g. ['Foo', 'Bar']) into option objects
      // (e.g. [{id: 'Foo', label: 'Foo', value: 'Foo'}, ...])
      options = _.map(options, function(option) {
        return toSelectView(option, idPath, labelPath);
      });
    }

    return options;
  };
}

wrapSelectOptions.$inject = ['toSelectView'];

export {
  toRadioView,
  toRadioModel,
  wrapRadioOptions,
  toSelectModel,
  toSelectView,
  wrapSelectOptions
};
