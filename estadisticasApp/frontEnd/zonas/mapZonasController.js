(function(){
	'use strict';

	angular
	.module('zonas')
	.controller('mapZonasController', mapZonasController);

	mapZonasController.$inject = ['claimsService', '$state'];

	function mapZonasController(claimsService, $state){
		var mapZonasController = this;
		mapZonasController.map = initMap();
    mapZonasController.zone = [];
    mapZonasController.zoneClaims = [];

		function initMap() {
            mapZonasController.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -32.926395, lng: -68.850676},
            zoom: 12
          });

          mapZonasController.claims = claimsService.claims;

          

          mapZonasController.markers = markers();
          function markers(){
            _.each(mapZonasController.claims, function(claim){
              var marker = new google.maps.Marker({
                position: claim.latLng,
              })
              marker.setMap(mapZonasController.map)
            })

          }

        var drawingManager = new google.maps.drawing.DrawingManager({
         // drawingMode: google.maps.drawing.OverlayType.MARKER,
         //W drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.POLYGON]
          },
          circleOptions: {
            fillColor: '#ffff',
            fillOpacity: 1,
            strokeWeight: 3,
            clickable: true,
            editable: false,
            zIndex: 1
          }
        });
        drawingManager.setMap(mapZonasController.map);

        google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon){

              mapZonasController.zone.push(polygon.getPath().getArray());
            
              var zone = new google.maps.Polygon({
                 paths: mapZonasController.zone,
                 strokeColor: '#FF0000',
                 strokeOpacity: 0.8,
                 strokeWeight: 3,
                 fillColor: '#FF0000',
                 fillOpacity: 0.35
              });

              _.each(mapZonasController.claims, function(claim){
                if(google.maps.geometry.poly.containsLocation(claim.latLng, zone)){
                  mapZonasController.zoneClaims.push(claim);
                }
              })

              claimsService.setZoneClaims(mapZonasController.zoneClaims);

              $state.go('seguimiento.zonas.map.estadisticas');
        })

        
        
      

    	}

      
	}
})();