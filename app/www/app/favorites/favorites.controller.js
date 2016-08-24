(function() {
  angular
    .module('mtg-price.favorites')
    .controller('FavoritesController', FavoritesController);

  FavoritesController.$inject = ['$scope', 'MtgPriceService', 'FavoritesService']

  function FavoritesController($scope, MtgPriceService, FavoritesService) {
    $scope.cards = []

    $scope.$on('$ionicView.beforeEnter', function() {
      Promise.all(_.map(FavoritesService.getFavorites(), function(id) {
        return MtgPriceService.getCard(id);
      })).then(function(cards) {
        $scope.cards = _.map(cards, function(c) {
          return c.data;
        });
      });
    });
  }
})();
