(function() {
  angular
    .module('mtg-price.search')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.search', {
        url: '/search',
        views: {
          search: {
            controller: 'SearchController',
            templateUrl: 'app/search/search.tpl.html'
          }
        }
      })
      .state('app.search-card-detail', {
        url: '/search/card-detail/:multiverseid',
        views: {
          search: {
            controller: 'CardDetailController',
            templateUrl: 'app/card-detail/card-detail.tpl.html'
          }
        }
      });
  }
})();
