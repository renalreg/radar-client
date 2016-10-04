import _ from 'lodash';

function toStateString(state, stateParams) {
  return state + '({' + _.map(stateParams, function(v, k) {
    return k + ': ' + JSON.stringify(v);
  }).join(', ') + '})';
}

export {
  toStateString
};
