(function() {
  angular
    .module('mtg-price', [
      'ionic',
      'ionic.utils',

      'jett.ionic.filter.bar',

      'mtg-price.search',
      'mtg-price.favorites',
      'mtg-price.card-detail'
    ])
    .run(run);

  run.$inject = ['$ionicPlatform'];

  function run($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }
})();
