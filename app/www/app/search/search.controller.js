(function() {
  angular
    .module('mtg-price.search')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['$scope', '$state', '$ionicFilterBar', 'MtgPriceService'];

  function SearchController($scope, $state, $ionicFilterBar, MtgPriceService) {
    $scope.cards = [];

    $scope.showFilterBar = function() {
      $ionicFilterBar.show({
        delay: 100,
        update: update
      });
    }

    update = function(filteredItems, filterText) {
      if(filterText) {
        MtgPriceService.getAutoComplete(filterText).then(
          function successCallback(response) {
            $scope.cards = response.data;
          },
          function errorCallback(response) {
            $scope.cards = [{
              name: 'send help'
            }];
          }
        );
        console.log($scope.cards);
      }
    }
  }
})();
