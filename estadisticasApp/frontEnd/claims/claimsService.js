(function() {
  'use strict';

  angular
    .module('estadisticasApp')
    .factory('claimsService', claimsService);

  claimsService.$inject = ['$http', '$q', 'empleadosService',
'SERVER_URL'];

  function claimsService($http, $q, empleadosService, SERVER_URL) {
    var service = {
      getClaims: getClaims,
      zoneClaims: [],
      getHistoricalClaimsByDate: getHistoricalClaimsByDate,
      getClaimsByEmployeeId: getClaimsByEmployeeId,
      getClaimsByZone: getClaimsByZone,
      getClaimsByDate: getClaimsByDate,
      selectedDate: {},
      getClaimsByUserIdAndDate: getClaimsByUserIdAndDate,
      getTareasEnTerminoFueraTerminoByEmployee: getTareasEnTerminoFueraTerminoByEmployee,
      tareasAsignadasRealizadasByEmployee: {
        asignadas: [],
        realizadas: [],
        days: []
      },
      tareasEnTerminoFueraTerminoByEmployee: {
        days: []
      },
      TareasEnTerminoFueraTermino: {
        enTermino: 0,
        fueraTermino: 0
      },
      tareasAsignadasRealizadas: {
        asignadas: 0,
        realizadas: 0
      },
      // TareasEnTerminoFueraTermino: {
      //   enTermino: 0,
      //   fueraTermino: 0
      // },
      tareasNuevasRealizadas: {
        nuevas: 0,
        realizadas: 0
      },
      setZoneClaims: setZoneClaims,
      getZoneClaims: getZoneClaims,
      getTareasAsignadasRealizadas: getTareasAsignadasRealizadas,
      getTareasAsignadasRealizadasByEmployee: getTareasAsignadasRealizadasByEmployee,
      getTareasEnTerminoFueraTermino: getTareasEnTerminoFueraTermino,
      getTareasNuevasRealizadas: getTareasNuevasRealizadas,
      setSelectedDate: setSelectedDate,
      getSelectedDate: getSelectedDate,
      getTiempoPorTarea: getTiempoPorTarea,
      getTiempoEntreTareas: getTiempoEntreTareas,
      claims: [],
      employeeClaims: []
    };

    return service;

    function getTiempoEntreTareas(){

      var claims = _.filter(service.employeeClaims, 'timeOut');
      var aux = null;
      var result = {tiempos: []};

      //recorreremos todos los elementos hasta n-1
     for(var i=0;i<(claims.length-1);i++){
      //recorreremos todos los elementos hasta n-i, tomar en cuenta los ultimos no tiene caso ya que ya estan acomodados.
      for(var j=0;j<(claims.length-1);j++){
         
          if(!(isNaN(new Date(claims[j].timeOut).getTime()))){
            var dia = new Date(claims[j].timeOut).getTime();
          //comparamos
          if(dia > (new Date(claims[j+1].timeOut).getTime())){
                //guardamos el numero mayor en el auxiliar
                var aux= claims[j];
                //guardamos el numero menor en el lugar correspondiente
                claims[j]=claims[j+1];
                //asignamos el auxiliar en el lugar correspondiente
                claims[j+1]=aux;
          }
        }
 
     }
}

      _.each(claims, function(claim){
        //si es la primera vuelta del loop, guardar reclamo en auxiliar para comparación
        if(aux == null){
          aux = claim;
        } else {
        // tiempo = diferencia de tiempo entre salida 
        // al reclamo anterior y entrada la proximo
          var tiempo = claim.timein - aux.timeOut;
          
          tiempo = new Date(tiempo);
          var horas = tiempo / 3600000;

        if(horas < 1){
          horas = 0;
          var resto = tiempo.getTime() - (horas * 3600000);
          var minutos = parseInt(resto / 60000);
          if(minutos < 0){
            minutos = "00";
          }
          else if(minutos < 10 && minutos > 0){ minutos = '0'+minutos}
          resto = tiempo.getTime() - ((horas * 3600000) + (minutos * 60000))
          var segundos = parseInt(resto / 1000);
          if(segundos < 0){
            minutos = "00";
          }
          if(segundos < 10 && segundos > 0){ segundos = '0'+segundos}
          aux.tiempoEntreReclamo = tiempo;
          aux.formatedTime = horas +':'+minutos+':'+segundos;
        }else{
          horas = parseInt(horas);
          if(horas < 10 && horas > 0){ horas = '0'+horas}
          var resto = tiempo.getTime() - (horas * 3600000);
          var minutos = parseInt(resto / 60000);
          if(minutos < 0){
            minutos = "00";
          }
          else if(minutos < 10 && minutos > 0){ minutos = '0'+minutos}
          resto = tiempo.getTime() - ((horas * 3600000) + (minutos * 60000))
          var segundos = parseInt(resto / 1000);
          if(segundos < 0){
            minutos = "00";
          }
          else if(segundos < 10 && segundos > 0){ segundos = '0'+segundos}
          aux.formatedTime = tiempo;
          aux.formatedTime = horas +':'+minutos+':'+segundos;
        }
          result.tiempos.push(aux.formatedTime);
          aux = claim;
        }

      })



    }

    function getTiempoPorTarea(){
      var claims = _.filter(service.employeeClaims, 'timeOut');

      _.each(claims, function(claim){
        var tiempo = 0;
        tiempo = claim.timeOut - claim.timein;

        var tiempo = new Date(tiempo);
        var horas = tiempo / 3600000;

        if(horas < 1){
          horas = 0;
          var resto = tiempo.getTime() - (horas * 3600000);
          var minutos = parseInt(resto / 60000);
          if(minutos < 10){ minutos = '0'+minutos}
          resto = tiempo.getTime() - ((horas * 3600000) + (minutos * 60000))
          var segundos = parseInt(resto / 1000);
          if(segundos < 10){ segundos = '0'+segundos}
          claim.tiempoPorReclamo = claim.timeOut - claim.timein;
          claim.formatedTime = horas +':'+minutos+':'+segundos;
        }else{
          horas = parseInt(horas);
          if(horas < 10){ horas = '0'+horas}
          var resto = tiempo.getTime() - (horas * 3600000);
          var minutos = parseInt(resto / 60000);
          if(minutos < 10){ minutos = '0'+minutos}
          resto = tiempo.getTime() - ((horas * 3600000) + (minutos * 60000))
          var segundos = parseInt(resto / 1000);
          if(segundos < 10){ segundos = '0'+segundos}
          claim.tiempoPorReclamo = claim.timeOut - claim.timein;
          claim.formatedTime = horas +':'+minutos+':'+segundos;
        }
      })

      var chartClaims = {labels: [], series: []};

      _.each(claims, function (claim){
        var chartClaim = {};

        chartClaims.labels.push(claim.claim.code);

        //chartClaim.y = claim.tiempoPorReclamo;
        //chartClaim.drilldown = claim.formatedTime;

        chartClaims.series.push([claim.formatedTime, claim.tiempoPorReclamo]);
      })

      return chartClaims;

    }


    function getZoneClaims(){
      return service.zoneClaims;
    }

    function setZoneClaims(claims){
      service.zoneClaims = claims;
    }

    function getTareasNuevasRealizadas(){
      _.each(service.claims, function(claim){
        if(claim.closedate != null){
          service.tareasNuevasRealizadas.realizadas+=1;
          service.tareasNuevasRealizadas.nuevas+=1;
        }else{
          service.tareasNuevasRealizadas.nuevas+=1;
        }
      })
    }

    function getTareasEnTerminoFueraTerminoByEmployee(){


      var result = {};
      var days = [];

      _.each(service.employeeClaims, function(claim){
          if(claim.claim.closedate != null && claim.substateid == 3){
              var datereporting = new Date(claim.claim.closedate);
           days.push(datereporting);

          }
        })


        //recorreremos todos los elementos hasta n-1
     for(var i=0;i<(days.length-1);i++){
      //recorreremos todos los elementos hasta n-i, tomar en cuenta los ultimos no tiene caso ya que ya estan acomodados.
      for(var j=0;j<(days.length-1);j++){
         
          if(!(isNaN(days[j].getTime()))){
            var dia = days[j].getTime();
          //comparamos
          if(dia >days[j+1].getTime()){
                //guardamos el numero mayor en el auxiliar
                var aux= new Date(dia);
                //guardamos el numero menor en el lugar correspondiente
                days[j]=days[j+1];
                //asignamos el auxiliar en el lugar correspondiente
                days[j+1]=aux;
          }
        }
 
     }
}
          var dias = [];
          _.each(days, function(day){
            dias.push(day.toLocaleDateString());
          })
                
                    
          dias = _.pull(dias, "Invalid Date");
          days = _.uniq(dias);
          
          service.tareasEnTerminoFueraTerminoByEmployee.days = days;
   

      _.each(service.tareasEnTerminoFueraTerminoByEmployee.days, function(day){ 

         result[day] = {};
         result[day].enTermino = 0; 
         result[day].fueraTermino = 0;

         _.each(service.employeeClaims, function(claim) {
            var entryDate = new Date(claim.claim.entrydate);
             entryDate.toString('yyyy-MM-dd');

            if (claim.claim.closedate != null) {
              var closeDate = new Date(claim.claim.closedate);
                closeDate.toDateString('yyyy-MM-dd');

              if(closeDate.toLocaleDateString() == day){
              var inTermsTime =  closeDate.getTime() - 172800000;

              if (claim.claim.systemuserid == empleadosService.getSelected().id){
                  if(entryDate.getTime() >= inTermsTime) {
                    result[day].enTermino += 1;
                
                 }else {

                  result[day].fueraTermino += 1;

              }

              } 

          }
        }
      });

      })



      return result;
    }

    function getClaimsByUserIdAndDate() {

      var from = JSON.stringify(service.selectedDate.dateFrom);
      var to = JSON.stringify(service.selectedDate.dateTo);
      var userId = JSON.stringify(empleadosService.selected.id);

      var config = {
        method: 'POST',
        url: SERVER_URL + 'claims/getClaimsByDateAndUserId/' + userId + '/' + from + '/' + to
      }
      var deferred = $q.defer();

      $http(config).then(function(result) {

        deferred.resolve(result);
      })

      return deferred.promise;


    }

    function getTareasAsignadasRealizadas() {
      _.each(service.claims, function(claim) {
        if (claim.state == "closed" || (claim.state == "closed" && claim.systemuseradrid != 0)) {
          service.tareasAsignadasRealizadas.realizadas += 1;
          service.tareasAsignadasRealizadas.asignadas +=1;
        } else {
          service.tareasAsignadasRealizadas.asignadas += 1;
        }
      })
      return service.tareasAsignadasRealizadas;
    }

    function getTareasAsignadasRealizadasByEmployee() {

        service.tareasAsignadasRealizadasByEmployee = {
          asignadas: [],
          realizadas: [],
          days: []
        }
        var days = [];
        var result = {};

        _.each(service.employeeClaims, function(claim){

              if(claim.claim.closedate != null && claim.substateid == 3){
            var datereporting = new Date(claim.claim.closedate);

            days.push(datereporting);
          }

        })

        //recorreremos todos los elementos hasta n-1
     for(var i=0;i<(days.length-1);i++){
      //recorreremos todos los elementos hasta n-i, tomar en cuenta los ultimos no tiene caso ya que ya estan acomodados.
      for(var j=0;j<(days.length-1);j++){
         
          if(!(isNaN(days[j].getTime()))){
            var dia = days[j].getTime();
          //comparamos
          if(dia >days[j+1].getTime()){
                //guardamos el numero mayor en el auxiliar
                var aux= new Date(dia);
                //guardamos el numero menor en el lugar correspondiente
                days[j]=days[j+1];
                //asignamos el auxiliar en el lugar correspondiente
                days[j+1]=aux;
          }
        }
 
     }
}
          var dias = [];
          _.each(days, function(day){
            dias.push(day.toLocaleDateString());
          })
                
                    
          dias = _.pull(dias, "Invalid Date");
          days = _.uniq(dias);
          
          service.tareasAsignadasRealizadasByEmployee.days = days;

      

         _.each(service.tareasAsignadasRealizadasByEmployee.days, function(dia){

            result[dia] = {};
            result[dia].asignadas = 0;
            result[dia].realizadas = 0;

             _.each(service.employeeClaims, function(claim){
                
                var closedate = new Date(claim.claim.closedate);
                var formatedCloseTime = closedate.toLocaleDateString();
          

                if(formatedCloseTime == dia){
            

                 if(closedate.getTime() >= service.getSelectedDate().dateFrom
                   && closedate.getTime() < service.getSelectedDate().dateTo
                   && claim.claim.systemuserid == empleadosService.getSelected().id){
                      result[dia].asignadas += 1;
                      result[dia].realizadas += 1;
                 }else{
                      result[dia].asignadas += 1;
                 } 
          
                }
              
             })

        })
      
        return result;

   
    }

    function getTareasEnTerminoFueraTermino() {
      service.TareasEnTerminoFueraTermino.enTermino = 0;
      service.TareasEnTerminoFueraTermino.fueraTermino = 0;

      _.each(service.claims, function(claim) {
        var entryDate = new Date(claim.entrydate);

        if (claim.closedate != null) {
          var closeDate = new Date(claim.closedate);
          var inTermsTime =  closeDate.getTime() - 172800000;

                if (entryDate.getTime() >= inTermsTime) {
                  service.TareasEnTerminoFueraTermino.enTermino += 1;

                } else {
                  service.TareasEnTerminoFueraTermino.fueraTermino += 1;

                }

          }
      });

      return service.TareasEnTerminoFueraTermino;
    }

    function setSelectedDate(dateFrom, dateTo) {
      service.selectedDate['dateFrom'] = dateFrom;
      service.selectedDate['dateTo'] = dateTo;
    }

    function getSelectedDate() {
      return service.selectedDate;
    }

    function getClaimsByZone(from, to, lat, lng) {
      var data = {
        from: from,
        to: to,
        lat: lat,
        lng: lng
      }

      var config = {
        url: SERVER_URL + 'claims/getClaimsByZone',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

    }

    function getClaimsByEmployeeId() {
      var employee = empleadosService.getSelected();
      employee['reclamos'] = _.filter(service.claims, {
        'userId': employee.id
      })
      return service.employeeClaims = employee;
    }



    function getClaims() {

      var currentDate = new Date();
      var fromTime = currentDate.getTime() - 86400000;
      var from = JSON.stringify(fromTime);
      var to = JSON.stringify(currentDate.getTime());


      var config = {

        url: SERVER_URL + 'claims/getClaimsByDate/' + from + '/' + to,
        method: 'POST',
      }

      var deferred = $q.defer();

      $http(config).then(function(result) {
        deferred.resolve(result);

      })
      return deferred.promise;
    }

    function getClaimsByDate(){
      var from = JSON.stringify(service.selectedDate.dateFrom);
      var to = JSON.stringify(service.selectedDate.dateTo);

      var config = {

        url: SERVER_URL + 'claims/getClaimsByDate/' + from + '/' + to,
        method: 'POST',
      }

      var deferred = $q.defer();

      $http(config).then(function(result) {
        deferred.resolve(result);

      })
      return deferred.promise;
    }

    function getHistoricalClaimsByDate(){
      var from = JSON.stringify(service.selectedDate.dateFrom);
      var to = JSON.stringify(service.selectedDate.dateTo);

      var config = {
        method: 'POST',
        url: SERVER_URL + 'claims/getHistoricalClaimsByDate/' + from + '/' + to
      }
      var deferred = $q.defer();

      $http(config).then(function(result) {

        deferred.resolve(result);
      })

      return deferred.promise;


    }
  }
})();
