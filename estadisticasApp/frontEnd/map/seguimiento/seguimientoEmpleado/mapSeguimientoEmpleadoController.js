(function() {
  'use strict';
  angular
    .module('estadisticasApp')
    .controller('mapSeguimientoEmpleadoCtrl', mapSeguimientoEmpleadoCtrl);

  mapSeguimientoEmpleadoCtrl.$inject = ['claimsService',
'recorridosService', 'empleadosService'];

  function mapSeguimientoEmpleadoCtrl(claimsService, recorridosService,
empleadosService) {
    var mapSeguimientoEmpleadoCtrl = this;

    mapSeguimientoEmpleadoCtrl.employeeClaims = claimsService.employeeClaims;
    mapSeguimientoEmpleadoCtrl.puntosRecorrido = recorridosService.recorridos;
    mapSeguimientoEmpleadoCtrl.recorridos = ordenarRecorrido();
    mapSeguimientoEmpleadoCtrl.personas = empleadosService.operarios;
    mapSeguimientoEmpleadoCtrl.asingarOperario = asignarOperario();
    mapSeguimientoEmpleadoCtrl.findClaim = findClaim;
    mapSeguimientoEmpleadoCtrl.mapa = new
google.maps.Map(document.getElementById('mapChild'), {
        center: {
          lat: -32.926395,
          lng: -68.850676
        },
        zoom: 14
      })

    function findClaim(code){
       var auxClaim ;
      _.each(mapSeguimientoEmpleadoCtrl.employeeClaims, function(claim){
        if(claim.claim.code == code){
          auxClaim = claim;
        }
      })

        /*  var lat = code.claim.latitude;
          var long = code.claim.longitude;

          var latLong = new google.maps.LatLng(lat,long);*/

          mapSeguimientoEmpleadoCtrl.mapa.setCenter(auxClaim.claim.latLng);
          mapSeguimientoEmpleadoCtrl.mapa.setZoom(17);
    }

    function asignarOperario(){
      _.each(mapSeguimientoEmpleadoCtrl.employeeClaims, function(claim){
        _.each(mapSeguimientoEmpleadoCtrl.personas, function(persona){
          if(claim.claim.systemuserid == persona.id){
            claim.claim.operario = persona.userLogin;
          }
        })
      })
    }

    function ordenarRecorrido(){
      
      var recorrido = mapSeguimientoEmpleadoCtrl.puntosRecorrido
         //recorreremos todos los elementos hasta n-1
        for(var i=0;i<(recorrido.length-1);i++){
          //recorreremos todos los elementos hasta n-i, tomar en
//cuenta los ultimos no tiene caso ya que ya estan acomodados.
          for(var j=0;j<(recorrido.length-1);j++){
           
            if(!(isNaN(new Date(recorrido[j].time)))){
              var time = new Date(recorrido[j].time);
              //comparamos
              if(time > (new Date(recorrido[j+1].time))){
                  //guardamos el numero mayor en el auxiliar
                  var aux= recorrido[j];
                  //guardamos el numero menor en el lugar
//correspondiente
                  recorrido[j]=recorrido[j+1];
                  //asignamos el auxiliar en el lugar
//correspondiente
                  recorrido[j+1]=aux;
              }
            }
      
        }
      }

      return recorrido;
    }


    mapSeguimientoEmpleadoCtrl.map = initMap();

    function initMap() {
      

      mapSeguimientoEmpleadoCtrl.reclamosMarkers = reclamosMarkers();

      function reclamosMarkers() {

        _.each(mapSeguimientoEmpleadoCtrl.employeeClaims, function(claim) {
	  var closeDate = new Date(claim.claim.closedate);
          if(claim.claim.stateid == 3){
          var image = 'estadisticasApp/frontEnd/common/images/map-seguimiento/map_baja.png'
          var reclamoMarker = new google.maps.Marker({
            position: claim.claim.latLng,
            icon: image,
	    zInded: 9999,
            center: claim.claim.latLng

          })
          }else if(closeDate.getTime() >= claimsService.getSelectedDate().dateFrom
            && closeDate.getTime() < claimsService.getSelectedDate().dateTo
              && claim.claim.systemuserid == empleadosService.getSelected().id) {

            var image = 'estadisticasApp/frontEnd/common/images/map-seguimiento/map_ok.png'
            var reclamoMarker = new google.maps.Marker({
            position: claim.claim.latLng,
            icon: image,
            center: claim.claim.latLng
          })
          }else if(claim.substateid == 0){
            var image = 'estadisticasApp/frontEnd/common/images/map-seguimiento/map_sinver.png'
            var reclamoMarker = new google.maps.Marker({
            position: claim.claim.latLng,
            icon: image,
            center: claim.claim.latLng
          })
          }else{
            var image = 'estadisticasApp/frontEnd/common/images/map-seguimiento/map_visto.png'
            var reclamoMarker = new google.maps.Marker({
            position: claim.claim.latLng,
            icon: image,
            center: claim.claim.latLng
          })

          }
	  var timeIn = new Date(claim.timein).toLocaleString();
          var timeOut = new Date(claim.timeOut).toLocaleString();
          var infoWindow = new google.maps.InfoWindow({
          content: '<div id="infoWindow">' + 
                      '<ul id="infoWindow">' +
                        '<li id="infoWindow">Id: ' + claim.claim.code + '</li>' +
                        '<li id="infoWindow">Dirección: ' + claim.claim.claimaddress + '</li>' +
                        '<li id="infoWindow">Fecha de entrada ' + claim.claim.entrydate + '</li>' +
                        '<li id="infoWindow">Fecha de cierre: ' + claim.claim.closedate + '</li>' +
                        '<li id="infoWindow">Asignado al operario: ' + claim.claim.operario + '</li>' +
                         '<li id="infoWindow">Hora de entrada: ' + timeIn + '</li>' +
                        '<li id="infoWindow">Hora de Salida: ' + timeOut + '</li>' +
                      '</ul>' +
                    '</div>'
          });

          reclamoMarker.addListener('click', function() {
              infoWindow.open(mapSeguimientoEmpleadoCtrl.mapa, reclamoMarker);
              
          });

          reclamoMarker.setMap(mapSeguimientoEmpleadoCtrl.mapa);
   
        })

      }

      //Pruevo con canvas
      mapSeguimientoEmpleadoCtrl.canvas = addComplexMarker();


      function addComplexMarker(time, map, position, label, callback) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext("2d");
        var imageObj = new Image();
        imageObj.src = "estadisticasApp/frontEnd/common/images/seguimiento_icon.png";
        imageObj.onload = function() {
          context.drawImage(imageObj, 41, 35);

          //Adjustable parameters
          context.font = "13px Arial";
          context.fillStyle = 'white';
          context.fillText(label, 50, 55);
          //End

          var image = {
            url: canvas.toDataURL(),
            size: new google.maps.Size(80, 104),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(40, 50)
          };
          // the clickable region of the icon.
          var shape = {
            coords: [1, 1, 1, 104, 80, 104, 80, 1],
            type: 'poly'
          };
          var marker = new google.maps.Marker({
            position: position,
	    title: new Date(time).toLocaleString(),
            map: map,
            labelAnchor: new google.maps.Point(3, 30),
            icon: image,
            shape: shape,
            zIndex: 10
          });
          callback && callback(marker)
        };
      };

      mapSeguimientoEmpleadoCtrl.recorridosMarkers = recorridosMarkers();

      function recorridosMarkers() {
        var image = 'estadisticasApp/frontEnd/common/images/recorridoMarker.png';
        var i = 0;
        _.each(mapSeguimientoEmpleadoCtrl.recorridos, function(points) {
          var recorridoMarker = new google.maps.Marker({
            position: points.latLng,
            icon: image,
            center: points.latLng
          })
          i++;
          addComplexMarker(points.time, mapSeguimientoEmpleadoCtrl.mapa, points.latLng, i);
          //  recorridoMarker.setMap(mapSeguimientoEmpleadoCtrl.map);
        })

      }



      var recorridoCoords = coordsRecorrido();

      function coordsRecorrido() {
        var coords = [];
        _.each(mapSeguimientoEmpleadoCtrl.recorridos, function(point) {
          coords.push(point.latLng)
        })
        return coords;
      }

      var LineaRecorrido = new google.maps.Polyline({
        path: recorridoCoords,
        geodesic: true,
        strokeColor: "#E7C900",
        strokeOpacity: 1.0,
        strokeWeight: 4
      });

      LineaRecorrido.setMap(mapSeguimientoEmpleadoCtrl.mapa);

    }

  }

})();
