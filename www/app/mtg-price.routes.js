(function() {
  angular
    .module('mtg-price')
    .config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/app/search');
  }
})();
