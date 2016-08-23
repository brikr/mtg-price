(function() {
  angular
    .module('mtg-price')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        controller: 'TabsController',
        templateUrl: 'app/tabs/tabs.tpl.html'
      });
  }
})();
