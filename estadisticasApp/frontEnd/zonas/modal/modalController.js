(function() {
  'use strict';

  angular
    .module('zonas')
    .controller('modalController', modalController);

  modalController.$inject = ['zonasService'];

  function modalController(zonasService) {
    var modalController = this;

    modalController.map;


    modalController.initMap = function() {
      modalController.map = new google.maps.Map(document.getElementById('modalMap'), {
        center: {
          lat: -32.926395,
          lng: -68.850676
        },
        zoom: 14

      });

      modalController.map.addListener('mousemove', function() {
        modalController.map = new google.maps.Map(document.getElementById('modalMap'), {
          center: {
            lat: -32.926395,
            lng: -68.850676
          },
          zoom: 14

        });

        var drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.MARKER,
          drawingControl: true,
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
        drawingManager.setMap(modalController.map);


      })


    }
  }
})();
