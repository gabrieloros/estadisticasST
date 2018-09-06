(function() {
    'use strict';

    angular
        .module('estadisticasApp')
        .factory('empleadosService', empleadosService);

    empleadosService.$inject = ['$http', '$q', 'SERVER_URL'];

    function empleadosService($http, $q, SERVER_URL) {
        var service = {
            operarios: {},
            selected: {},
            setSelected: setSelected,
            getSelected: getSelected,
            getOperarios: getOperarios,
            exportar: exportar
        };

        return service;

        function exportar(data){
          //var datos = JSON.stringify(data);
          var datos = [];
          datos[0] = [data[0]];
          datos[1] = [data[1]];
          datos[2] = [data[2]];
          datos[3] = [data[3]];
          datos[4] = [data[4]];
          datos[5] = [data[5]];
          datos[6] = [data[6]];
          datos[7] = [data[7]];
          datos[8] = [data[8]];

          var config = {
            url: SERVER_URL + 'exportacion/exportar/'+datos[0]+'/'+
            datos[1]+'/'+
            datos[2]+'/'+
            datos[3]+'/'+
            datos[4]+'/'+
            datos[5]+'/'+
            datos[6]+'/'+
            datos[7]+'/'+
            datos[8],
            method: 'POST'
       //     data: "list="+datos,
            
          }
          

          $http(config);
        }

        function getOperarios(){
          var config = {
            url: SERVER_URL + 'operarios/getOperarios',
            method: 'POST'
          }
          var deferred = $q.defer();

          $http(config).then(function (result){
            service.operarios = result.data.data;
            deferred.resolve(result);
          })

          return deferred.promise;
        }

        function setSelected(empleado) {
          service.selected = empleado;
        }

        function getSelected(){
          return service.selected;
        }
    }
})();
