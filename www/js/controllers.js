angular.module('starter.controllers', ['ngCordovaBeacon'])

.controller('DashCtrl', function($scope, $rootScope, $ionicPlatform, $cordovaBeacon) {
  $scope.demo = "asdasd";
  $scope.beacons = {};

  $ionicPlatform.ready(function() {
    $cordovaBeacon.requestWhenInUseAuthorization();

    $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
      var uniqueBeaconKey;

      for(var i = 0; i < pluginResult.beacons.length; i++) {
          uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
          $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
      }

      $scope.event = event;

      var myKey;
      for (var key in $scope.beacons) {
          myKey = key;
          break;
      }

      $scope.firstBeacon = $scope.beacons[myKey];

      var ratio = $scope.beacons[myKey].rssi*1.0/$scope.beacons[myKey].tx;
      $scope.accuracy = 0;
      if (ratio < 1.0) {
        $scope.accuracy = Math.pow(ratio,10);
      }
      else {
        var accuracy =  (0.89976)*Math.pow(ratio,7.7095) + 0.111;
        $scope.accuracy = accuracy;
      }

      $scope.$apply();
    });

    $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "01122334-4556-6778-899a-abbccddeeff0"));
  
  });
})

.controller('ChatsCtrl', function($scope, Chats) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };

  var deploy = new Ionic.Deploy();

  // Update app code with new release from Ionic Deploy
  $scope.doUpdate = function() {
    deploy.update().then(function(res) {
      console.log('Ionic Deploy: Update Success! ', res);
    }, function(err) {
      console.log('Ionic Deploy: Update error! ', err);
    }, function(prog) {
      console.log('Ionic Deploy: Progress... ', prog);
    });
  };

  // Check Ionic Deploy for new code
  $scope.checkForUpdates = function() {
    console.log('Ionic Deploy: Checking for updates');
    deploy.check().then(function(hasUpdate) {
      console.log('Ionic Deploy: Update available: ' + hasUpdate);
      $scope.hasUpdate = hasUpdate;
    }, function(err) {
      console.error('Ionic Deploy: Unable to check for updates', err);
    });
  };
});
