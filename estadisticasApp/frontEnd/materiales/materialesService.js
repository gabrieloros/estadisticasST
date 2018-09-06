(function() {
  'use strict';

  angular
    .module('materiales')
    .factory('materialesService', materialesService);

  materialesService.$inject = ['$http', '$q', 'empleadosService', 'SERVER_URL'];

  function materialesService($http, $q, empleadosService, SERVER_URL) {
    var service = {
      materiales: {},
      materialesByDate: {},
      selectedDate : {},
      materialesOrdered: {},
      setSelectedDate: setSelectedDate,
      getSelectedDate: getSelectedDate,
      getMateriales: getMateriales,
      getMaterialesByDate: getMaterialesByDate,
      getMaterialsOrderedDate: getMaterialsOrderedDate
    };

    return service;

    function getMaterialsOrderedDate(){


      _.each(service.materialesByDate, function(material){
        
        var day = new Date(material.closedate)
        day = day.toLocaleDateString();
        service.materialesOrdered[day] = []

      })

        _.uniq(service.materialesOrdered);

      _.each(service.materialesOrdered, function(day, key){
        _.each(service.materialesByDate, function(material){
          var date = new Date(material.closedate);
          date = date.toLocaleDateString();

          if(date == key){
            
            service.materialesOrdered[key].push(material);            

          }
        })
      })


      return service.materialesOrdered;

    }

    function setSelectedDate(dateFrom, dateTo){
      service.selectedDate['dateFrom'] = dateFrom;
      service.selectedDate['dateTo'] = dateTo;
    }

    function getSelectedDate(){
      return service.selectedDate;
    }

    function getMaterialesByDate(){

      var from = service.selectedDate.dateFrom;
      var to = service.selectedDate.dateTo;
      
      var config = {
        url: SERVER_URL + 'materials/getMaterialsByDate/'+from+'/'+to,
        method: 'POST'

      }

      var deferred = $q.defer();

      $http(config).then(function(result){
        deferred.resolve(result);
      })

      return deferred.promise;
    }

    function getMateriales() {

      //toISOString().split('T')[0]);

      var currentDate = new Date();
      var fromTime = currentDate.getTime() - 518400000;
      var from = JSON.stringify(fromTime);
      var to = JSON.stringify(currentDate.getTime());

      var config = {
        url: SERVER_URL + 'materials/getMaterialsByDate/'+from+'/'+to,
        method: 'POST'
      }

      var deferred = $q.defer();

      $http(config).then(function(result) {
        deferred.resolve(result);

      })
      return deferred.promise;

    }



  }
})();
