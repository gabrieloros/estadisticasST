(function() {
    'use strict';

    angular
        .module('materiales', [])
        .config(function config($stateProvider){
          $stateProvider
          .state('seguimiento.materiales', {
            url: 'materiales',
            views: {
              'sideBar@':{
                templateUrl: 'estadisticasApp/frontEnd/materiales/templates/sideBarMateriales-tmpl.html',
                controller: 'sideBarMaterialesController as sideBarMaterialesController'
              },
              'map@': {
                templateUrl: 'estadisticasApp/frontEnd/materiales/templates/contentMateriales-tmpl.html',
                controller: 'materialesContentController as materialesContentController',
                resolve: {
                  materiales: function(materialesService){
                    materialesService.materiales = {};
                    return materialesService.getMateriales().then(function(result){
                      materialesService.materiales = result.data.data;
                    });
                  }
                }
              }

            }
          })
          .state('seguimiento.materiales.seguimientoMateriales', {
            url: '/seguimientoMateriales',
            views:{
              'map@': {
                templateUrl: 'estadisticasApp/frontEnd/materiales/templates/contentSeguimientoMateriales-tmpl.html',
                controller: 'seguimientoMaterialesController as seguimientoMaterialesController',
                resolve: {
                  materiales: function(materialesService){
                    materialesService.materialesByDate = {};
                    return materialesService.getMaterialesByDate().then(function(result){
                      materialesService.materialesByDate = result.data.data;
                    })
                  }
                }
              }
            }
          })
        })
})();
