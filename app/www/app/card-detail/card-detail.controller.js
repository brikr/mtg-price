(function() {
  angular
    .module('mtg-price.card-detail')
    .controller('CardDetailController', CardDetailController);

  CardDetailController.$inject = ['$scope', '$state', '$stateParams', 'MtgPriceService', 'FavoritesService'];

  function CardDetailController($scope, $state, $stateParams, MtgPriceService, FavoritesService) {
    $scope.multiverseid = $stateParams.multiverseid;
    $scope.favoriteToggle = favoriteToggle;

    var favorites = FavoritesService.getFavorites();
    $scope.isFavorite = favorites.includes($scope.multiverseid)

    MtgPriceService.getCard($scope.multiverseid).then(
      function successCallback(response) {
        $scope.card = response.data;
      },
      function errorCallback(response) {
        $scope.card = {}
      }
    );

    function favoriteToggle() {
      if($scope.isFavorite) {
        FavoritesService.removeFromFavorites($scope.multiverseid);
      } else {
        FavoritesService.addToFavorites($scope.multiverseid);
      }
      $scope.isFavorite = !$scope.isFavorite;
    }
  }
})();
