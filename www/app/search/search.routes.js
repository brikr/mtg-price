(function() {
  angular
    .module('mtg-price.search')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.search', {
        url: '/search',
        controller: 'SearchController',
        templateUrl: 'app/search/search.tpl.html'
      });
  }
})();
