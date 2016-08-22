(function() {
  angular
    .module('mtg-price')
    .factory('MtgPriceService', MtgPriceService);

  MtgPriceService.$inject = ['$http'];

  function MtgPriceService($http) {
    return {
      getAutoComplete: getAutoComplete
    }

    function getAutoComplete(str) {
      return ['Tarmogoyf'];
    }
  }
})();
