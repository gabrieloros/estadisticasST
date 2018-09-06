(function() {
  'use strict';

  angular
    .module('zonas')
    .controller('zonasController', zonasController);

  zonasController.$inject = ['$uibModal', 'zonasService', 'claimsService', '$state'];



  function zonasController($uibModal, zonasService, claimsService, $state) {
    var zonasController = this;

    zonasController.changeState = changeState;
  
    function changeState(){
      var dateFrom = zonasController.dateFrom.valueOf();
      var dateTo = zonasController.dateTo.valueOf();

      claimsService.setSelectedDate(dateFrom, dateTo);

      $state.go('seguimiento.zonas.map');
    }

  //  zonasController.openModal = function() {

  //    var modalInstance = $uibModal.open({
  //      animation: zonasController.animationsEnabled,
  //      templateUrl: 'estadisticasApp/frontEnd/zonas/modal/mapModal.html',
  //      controller: 'modalController as modalController',
  //     size: 'lg'
  //    });
  //  };

  }
})();
