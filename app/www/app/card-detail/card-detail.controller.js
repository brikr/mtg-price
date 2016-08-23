(function() {
  angular
    .module('mtg-price.card-detail')
    .controller('CardDetailController', CardDetailController);

  CardDetailController.$inject = ['$scope', '$state', '$stateParams', 'MtgPriceService'];

  function CardDetailController($scope, $state, $stateParams, MtgPriceService) {
    $scope.multiverseid = $stateParams.multiverseid;

    MtgPriceService.getCard($scope.multiverseid).then(
      function successCallback(response) {
        $scope.card = response.data;
      },
      function errorCallback(response) {
        $scope.card = {}
      }
    );
  }
})();