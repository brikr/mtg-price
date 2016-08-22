(function() {
  angular
    .module('mtg-price.search')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['$scope', '$state', 'MtgPriceService'];

  function SearchController($scope, $state, MtgPriceService) {
    $scope.cards = [];
  }
})();
