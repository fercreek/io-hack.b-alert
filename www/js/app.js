(function(){
  var app = angular.module('starter', ['ionic','starter.controllers', 'starter.services', 'ngCordova', 'ionic.service.core', 'ionic.service.analytics',
    'ionic.service.push', 'ngCordovaBeacon']);

  app.run(function($ionicPlatform, $ionicAnalytics, $state, $ionicPush) {
    $ionicPlatform.ready(function() {

      $ionicAnalytics.register();

      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleLightContent();
      }

      // $ionicPush.register({
      //   canShowAlert: false, //Can pushes show an alert on your screen?
      //   canSetBadge: true, //Can pushes update app icon badges?
      //   canPlaySound: true, //Can notifications play a sound?
      //   canRunActionsOnWake: true, //Can run actions outside the app,
      //   onNotification: function(notification) {
      //     alert('n', notification);
      //     if(notification['$state']) {
      //       //prompt the user to switch
      //       navigator.notification.confirm("You have a new chat - go to it?", function(btn) {
      //         if(btn === 1) {
      //           $state.go(notification["$state"]);
      //         }
      //       },"New Chat!");
      //     }
      //     return true;
      //   }
      // });

      var io = Ionic.io();
      var push = new Ionic.Push({
        "onNotification": function(notification) {
          // alert('n', notification);
          $state.go('tab.chats');
          // if(notification['$state']) {
          //   //prompt the user to switch
          //   navigator.notification.confirm("You have a new chat - go to it?", function(btn) {
          //     if(btn === 1) {
          //       $state.go(notification["$state"]);
          //     }
          //   },"New Chat!");
          // }
          // return true;
          // alert('Received push notification!', notification);
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
