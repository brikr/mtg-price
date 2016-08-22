(function() {
  angular
    .module('mtg-price.card-list')
    .directive('cardList', cardList);

  function cardList() {
    return {
      restrict: 'E',
      scope: {
        list: '='
      },
      controller: controller,
      templateUrl: 'app/card-list/card-list.tpl.html'
    }
  }

  controller.$inject = ['$scope', '$state'];

  function controller($scope, $state) {
    $scope.click = click;

    $scope.$watchCollection('list', function(newVal) {
      $scope.cards = newVal;
    });

    function click(multiverseID) {
      $state.go('app.card-detail', { multiverseID: multiverseID });
    }
  }
})();
