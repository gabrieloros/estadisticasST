(function() {
    'use strict';

    angular
        .module('estadisticasApp')
        .controller('seguimientoController', seguimientoController);

        seguimientoController.$inject = ['$state', '$http', 'empleadosService', 'claimsService']

    function seguimientoController($state, $http, empleadosService, claimsService) {
        var seguimientoController = this;

        seguimientoController.cambiarEstado = cambiarEstado;
        seguimientoController.personaSelected = {};
        seguimientoController.personas = empleadosService.operarios;

        //FILTRAR POR ORDEN ALFABETICO

        seguimientoController.reverse = true;
        seguimientoController.propertyName = '';

        seguimientoController.sortBy = function(propertyName) {
            seguimientoController.reverse = (seguimientoController.propertyName === propertyName) ? !seguimientoController.reverse : false;
            seguimientoController.propertyName = propertyName;
        };


        function cambiarEstado(){

          var dateFrom = seguimientoController.dateFrom.valueOf();
          var dateTo = seguimientoController.dateTo.valueOf();
          empleadosService.setSelected(JSON.parse(seguimientoController.personaSelected));

          claimsService.setSelectedDate(dateFrom, dateTo);
          
          $state.go('seguimiento.persona');
        }
    }
})();
