(function() {
    'use strict';

    angular
        .module('zonas', [])
        .config(function config($stateProvider){
          $stateProvider
          .state('seguimiento.zonas', {
            url: 'zonas',
            views: {
              'sideBar@':{
                templateUrl: 'estadisticasApp/frontEnd/zonas/templates/sideBarZonas-tmpl.html',
                controller: 'zonasController as zonasController'
            },

              'map@':{
                templateUrl: 'estadisticasApp/frontEnd/zonas/templates/zonas-tmpl.html',
                controller: 'zonasController as zonasController',
              }
            }
          })
         .state('seguimiento.zonas.map', {
           url: '/map-zonas',
           views: {
              'sideBar@':{
                templateUrl: 'estadisticasApp/frontEnd/zonas/templates/sideBarZonas-tmpl.html',
                controller: 'zonasController as zonasController'
              },
             'map@': {
                templateUrl: 'estadisticasApp/frontEnd/zonas/templates/mapZonas-tmpl.html',
                controller: 'mapZonasController as mapZonasController',
                resolve: {
                  claims: function(claimsService){
                    claimsService.claims = [];
                    return claimsService.getHistoricalClaimsByDate().then(function(result) {
                      _.each(result.data, function(claim) {
                        claim['latLng'] = new google.maps.LatLng(claim.claim.latitude, claim.claim.longitude);
                        claimsService.claims.push(claim);
                      });
                    });
                  }
                }
              }
            }
          })
        .state('seguimiento.zonas.map.estadisticas', {
          url: '/estadisticas-zona',
          views: {
            'map@':{
                 templateUrl: 'estadisticasApp/frontEnd/zonas/templates/estadisticasZonas-tmpl.html',
                 controller: 'estadisticasZonasController as estadisticasZonasController'
            }
          }
        })
        })
})();
