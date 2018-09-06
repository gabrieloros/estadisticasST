(function() {
    'use strict';

    angular
        .module('estadisticasApp')
        .factory('recorridosService', recorridosService);

    recorridosService.$inject = ['$http', '$q', 'empleadosService', 'claimsService', 'SERVER_URL'];

    function recorridosService($http, $q, empleadosService, claimsService, SERVER_URL) {
        var service = {
            getRecorridos: getRecorridos,
            getRecorridosByEmployeeId: getRecorridosByEmployeeId,
            employeeRecorridos: [],
            recorridos: []
        };

        return service;

        function getRecorridosByEmployeeId(){
          var employee = empleadosService.getSelected();
          employee['recorridos'] = _.filter(service.recorridos, {
            'userId': employee.id
          })
          return service.employeeRecorridos = employee;
        }

        function getRecorridos() {

          var from = JSON.stringify(claimsService.selectedDate.dateFrom);
          var to = JSON.stringify(claimsService.selectedDate.dateTo);
          var id = JSON.stringify(empleadosService.selected.id);

          var config = {
            url: SERVER_URL + 'recorridos/getTourByDateAndUserId/'+id+'/'+from+'/'+to,
            method: 'POST'
          }

          var deferred = $q.defer();


          $http(config).then(function(result){
            deferred.resolve(result)

          })
          return deferred.promise;
        }
    }
})();
