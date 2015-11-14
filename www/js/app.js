(function(){
  var app = angular.module('starter', ['ionic','ionic.service.core', 'ionic.service.analytics','starter.controllers', 'starter.services']);

  app.run(function($ionicPlatform, $ionicAnalytics, $timeout) {
    $ionicPlatform.ready(function() {

      $ionicAnalytics.register();

      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      var io = Ionic.io();
      var push = new Ionic.Push({
        "onNotification": function(notification) {
          alert('Received push notification!', notification);
        },
        "pluginConfig": {
          "android": {
            "iconColor": "#0000FF"
          }
        }
      });

      var user = Ionic.User.current();

      if (!user.id) {
        user.id = Ionic.User.anonymousId();
      }

      user.set('name', 'Simwqeqweo');
      user.set('bio', 'This iqwes my little bio');
      // user.save();

      var callback = function(data) {
        push.addTokenToUser(user);
        user.save();
      };
      push.register(callback);

    });
  });

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })


    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    });

    $urlRouterProvider.otherwise('/tab/dash');

  });
})();
