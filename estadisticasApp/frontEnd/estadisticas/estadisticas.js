(function() {
    'use strict';

    angular
        .module('estadisticas', [])
        .config(function config($stateProvider){
          $stateProvider
          .state('seguimiento.estadisticas', {
            url: 'estadisticas',
            views: {
              'map@': {
                templateUrl: 'estadisticasApp/frontEnd/estadisticas/templates/estadisticas-tmpl.html',
                controller: 'estadisticasGeneralesController as estadisticasGeneralesCtrl',
                resolve: {
                  tareasTermino: function(claimsService){
                    return claimsService.getTareasEnTerminoFueraTermino();
                  },
                   TareasAsignadasRealizadas: function(claimsService){
                     return claimsService.getTareasAsignadasRealizadas();
                  },
                   tareasNuevasRealizadas: function(claimsService){
                    return claimsService.getTareasNuevasRealizadas();
                   }
                }
              },
              'sideBar@':{
                templateUrl: 'estadisticasApp/frontEnd/estadisticas/templates/sideBarEstadisticas-tmpl.html',
                controller: 'sideBarEstadisticasController as sideBarEstadisticasController'
              }
            }
          })
          .state('seguimiento.estadisticas.generales', {
            url: '/estadisticas-por-fecha',
            views: {
              'map@': {
                templateUrl: 'estadisticasApp/frontEnd/estadisticas/templates/rangedEstadisticasGenerales-tmpl.html',
                controller: 'rangedEstadisticasController as rangedEstadisticasController',
                resolve: {
                  claims: function(claimsService){
                    claimsService.claims = [];
                    return claimsService.getHistoricalClaimsByDate().then(function(result) {
                      claimsService.claims = result.data;
                    });
                  }
                }
              },
              'sideBar@':{
                templateUrl: 'estadisticasApp/frontEnd/estadisticas/templates/sideBarEstadisticas-tmpl.html',
                controller: 'sideBarEstadisticasController as sideBarEstadisticasController'
              }
            }
          })
          .state('seguimiento.estadisticas.estadisticasPersona',{
            url: '/operario',
            views: {
              'map@': {
                templateUrl: 'estadisticasApp/frontEnd/estadisticas/templates/estadisticasOperario-tmpl.html',
                controller: 'estadisticasOperarioController as estadisticasOperarioController',
                resolve: {
                  recorridos: function(recorridosService) {
                    return recorridosService.getRecorridos().then(function(result) {
                      recorridosService.recorridos = [];
                      _.each(result.data.data, function(recorrido) {
                        recorrido['latLng'] = new google.maps.LatLng(recorrido.latitude, recorrido.longitude);
                        recorridosService.recorridos.push(recorrido);
                      });
                    });
                  },
                  employeeClaims: function(claimsService) {
                  return claimsService.getClaimsByUserIdAndDate().then(function(result) {
                    claimsService.employeeClaims = [];
                    _.each(result.data, function(historicalClaim) {
                        historicalClaim.claim['latLng'] = new google.maps.LatLng(historicalClaim.claim.latitude, historicalClaim.claim.longitude);
                        claimsService.employeeClaims.push(historicalClaim);
                    })
                  });
                }
                }
              }
            }
          })
        })
})();
