(function() {
  'use strict';

  angular
    .module('estadisticasApp', [
      'ui.router',
      'ui.bootstrap',
      'ui.bootstrap.datetimepicker',
      'estadisticas',
      'materiales',
      'zonas',
      'ui.date',
      'angular-loading-bar'
    ])
    .constant('SERVER_URL',
'http://godoycruz.gestionyservicios.com.ar:8080/Estadisticas_Rest/rest/')
    .config(function config($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('seguimiento', {
          url: '/',
          views: {
            'sideBar': {
              templateUrl: 'estadisticasApp/frontEnd/seguimiento/templates/sideBarSeguimiento-tmpl.html',
              controller: 'seguimientoController as seguimientoController',
              resolve: {
                operarios: function(empleadosService) {
                  return empleadosService.getOperarios().then(function(result) {
                    empleadosService.operarios = result.data.data;
                  })
                }
              }
            },
            'map': {
              templateUrl: 'estadisticasApp/frontEnd/map/map-tmpl.html',
              controller: 'seguimientoMapController as seguimientoMapController',
              resolve: {
                claims: function(claimsService) {
                 // claimsService.claims = [];
                  return claimsService.getClaims().then(function(result) {
                    _.each(result.data.data, function(claim) {
                      claim['latLng'] = new google.maps.LatLng(claim.latitude, claim.longitude);
                      claimsService.claims.push(claim);
                    });
                  });
                }
              }
            }
          }
        })
        .state('seguimiento.persona', {
          url: 'persona',
          views: {
            'sideBar@': {
              templateUrl: 'estadisticasApp/frontEnd/seguimiento/templates/seguimientoPersona-tmpl.html',
              controller: 'sideBarSegPersonaController as sideBarSegPersonaController'
            },
            'map@': {
              templateUrl: 'estadisticasApp/frontEnd/map/seguimiento/seguimientoEmpleado/mapSeguimientoEmpleado-tmpl.html',
              controller: 'mapSeguimientoEmpleadoCtrl as mapSeguimientoEmpleadoCtrl',
              resolve: {
	        operarios: function(empleadosService) {
                  return
empleadosService.getOperarios().then(function(result) {
                    empleadosService.operarios = result.data.data;
                  })
                },
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
      $urlRouterProvider.otherwise('/');
    })
})();
