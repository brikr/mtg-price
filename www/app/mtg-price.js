(function() {
  angular
    .module('mtg-price', [
      'ionic',

      'jett.ionic.filter.bar',

      'mtg-price.search'
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
