(function() {
  angular
    .module('mtg-price')
    .factory('MtgPriceService', MtgPriceService);

  MtgPriceService.$inject = ['$http'];

  function MtgPriceService($http) {
    var url = 'https://api.deckbrew.com/mtg'

    return {
      getAutoComplete: getAutoComplete
    }

    function getAutoComplete(str) {
      return $http.get(url + '/cards/typeahead?q=' + str);
    }
  }
})();
