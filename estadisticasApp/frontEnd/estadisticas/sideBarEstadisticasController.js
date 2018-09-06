(function() {
    'use strict';

    angular
        .module('estadisticas')
        .controller('sideBarEstadisticasController', sideBarEstadisticasController);

    sideBarEstadisticasController.$inject = ['empleadosService', '$state', 'claimsService'];

    function sideBarEstadisticasController(empleadosService, $state, claimsService) {
        var sideBarEstadisticasController = this;

        sideBarEstadisticasController.personas = empleadosService.operarios;

        sideBarEstadisticasController.PersonaSelected = {};
        sideBarEstadisticasController.cambiarEstado = cambiarEstado;

        //FILTRAR POR ORDEN ALFABETICO

        sideBarEstadisticasController.reverse = true;
        sideBarEstadisticasController.propertyName = '';

        sideBarEstadisticasController.sortBy = function(propertyName) {
            sideBarEstadisticasController.reverse = (sideBarEstadisticasController.propertyName === propertyName) ? !sideBarEstadisticasController.reverse : false;
            sideBarEstadisticasController.propertyName = propertyName;
        };


        function cambiarEstado(){

          if(sideBarEstadisticasController.personaSelected){

          var employee = JSON.parse(sideBarEstadisticasController.personaSelected);
          var dateFrom = sideBarEstadisticasController.dateFrom.valueOf();
          var dateTo = sideBarEstadisticasController.dateTo.valueOf();
          claimsService.setSelectedDate(dateFrom, dateTo);
          
          empleadosService.setSelected(employee);

          $state.go('seguimiento.estadisticas.estadisticasPersona', {reload: true})
        }else{
          var dateFrom = sideBarEstadisticasController.dateFrom.valueOf();
          var dateTo = sideBarEstadisticasController.dateTo.valueOf();
          claimsService.setSelectedDate(dateFrom, dateTo);

          $state.go('seguimiento.estadisticas.generales');
        }
      }
    }
})();
