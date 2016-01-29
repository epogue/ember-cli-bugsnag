import Ember from 'ember';
import config from '../config/environment';

export function getContext(router) {
  var infos = router.currentState.routerJsState.handlerInfos;

  var url = router.get('location').getURL();
  var routeName = infos[infos.length - 1].name;

  var firstSegments = routeName.replace(".index", "").replace(/\./g, ' ');
  var prettyRouteName = Ember.String.capitalize(firstSegments);

  return prettyRouteName + " (" + routeName + ", " + url + ")";
}

export function generateError(cause, stack) {
  var error = new Error(cause);
  error.stack = stack;
  return error;
}

export function ignoreError(message) {
  const ignoreErrors = Ember.A((config.bugsnag && config.bugsnag.ignoreErrors) || []);
  return ignoreErrors.some(function(error) {
    return message == error;
  })
}
