(function() {
  angular
    .module('mtg-price.favorites')
    .factory('FavoritesService', FavoritesService);

  FavoritesService.$inject = ['localStorage'];

  function FavoritesService(localStorage) {
    return {
      getFavorites: getFavorites,
      addToFavorites: addToFavorites,
      removeFromFavorites: removeFromFavorites
    };

    function getFavorites() {
      return localStorage.getArray('favorites');
    }

    function addToFavorites(multiverseid) {
      var favorites = localStorage.getArray('favorites');
      favorites.push(multiverseid);
      localStorage.setArray('favorites', favorites);
    }

    function removeFromFavorites(multiverseid) {
      var favorites = localStorage.getArray('favorites');
      favorites = _.reject(favorites, function(id) {
        return multiverseid == id;
      });
      localStorage.setArray('favorites', favorites);
    }
  }
})();
