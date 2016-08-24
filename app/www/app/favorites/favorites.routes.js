(function() {
  angular
    .module('mtg-price.favorites')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.favorites', {
        url: '/favorites',
        views: {
          favorites: {
            controller: 'FavoritesController',
            templateUrl: 'app/favorites/favorites.tpl.html'
          }
        }
      })
      .state('app.favorites-card-detail', {
        url: '/favorites/card-detail/:multiverseid',
        views: {
          favorites: {
            controller: 'CardDetailController',
            templateUrl: 'app/card-detail/card-detail.tpl.html'
          }
        }
      });
  }
})();
