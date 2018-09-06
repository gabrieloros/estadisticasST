(function() {
    'use strict';

    angular
        .module('estadisticas')
        .controller('seguimientoMapController', seguimientoMapController);

    seguimientoMapController.$inject = ['claimsService', 'empleadosService'];

    function seguimientoMapController(claimsService, empleadosService) {
        var seguimientoMapController = this;

        seguimientoMapController.map = initMap();
        seguimientoMapController.polygonCoords = [];
        seguimientoMapController.claims = [];
        seguimientoMapController.empleados = empleadosService.operarios;
        seguimientoMapController.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -32.926395, lng: -68.850676},
            zoom: 12
          });
        seguimientoMapController.mapa = initMap();

        function initMap() {
            

          seguimientoMapController.claims = claimsService.claims;

          seguimientoMapController.markers = markers();
          function markers(){
            var image = 'estadisticasApp/frontEnd/common/images/map-seguimiento/map_ok.png'
            _.each(seguimientoMapController.claims, function(claim){

              var currentDate = new Date();
              var closeDate = new Date(claim.closedate);
              var minDate = currentDate.getTime() - 86400000;
              minDate = new Date(minDate).toLocaleDateString();
              if(closeDate.toLocaleDateString() == minDate && closeDate.getTime() < currentDate){

              var marker = new google.maps.Marker({
                position: claim.latLng,
                icon: image
              })

              _.each(seguimientoMapController.empleados, function(empleado){
                if(claim.systemuserid == empleado.id){
                  claim.operario = empleado.userLogin;
                }
              })

              var timeIn = new Date(claim.timein).toLocaleString();
              var timeOut = new Date(claim.timeOut).toLocaleString();
              var infoWindow = new google.maps.InfoWindow({
          content: '<div id="infoWindow">' + 
                      '<ul id="infoWindow">' +
                        '<li id="infoWindow">Id: ' + claim.code + '</li>' +
                        '<li id="infoWindow">Dirección: ' + claim.claimaddress + '</li>' +
                        '<li id="infoWindow">Fecha de entrada ' + claim.entrydate + '</li>' +
                        '<li id="infoWindow">Fecha de cierre: ' + claim.closedate + '</li>' +
                        '<li id="infoWindow">Asignado al operario: ' + claim.operario + '</li>' +
                      '</ul>' +
                    '</div>'
          });

          marker.addListener('click', function() {
              infoWindow.open(seguimientoMapController.map, marker);
              
          });

              marker.setMap(seguimientoMapController.map)
              }

            })

          }
    }

      seguimientoMapController.polygon = new google.maps.Polygon({
        paths: seguimientoMapController.polygonCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      });

        seguimientoMapController.polygon.setMap(seguimientoMapController.map);
    }
})();
