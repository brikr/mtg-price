(function() {
  angular
    .module('mtg-price')
    .factory('MtgPriceService', MtgPriceService);

  MtgPriceService.$inject = ['$http'];

  function MtgPriceService($http) {
    var url = 'http://localhost:8081'

    return {
      getAutoComplete: getAutoComplete
    }

    function getAutoComplete(str) {
      return $http.get(url + '/query/' + str);
    }
  }
})();
