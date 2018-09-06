(function() {
  'use strict';

  angular
    .module('materiales')
    .controller('sideBarMaterialesController', sideBarMaterialesController);

  sideBarMaterialesController.$inject = ['$uibModal', 'materialesService', '$state'];

  function sideBarMaterialesController($uibModal, materialesService, $state) {
    var sideBarMaterialesController = this;

    sideBarMaterialesController.searchByDate = searchByDate;
    sideBarMaterialesController.personaSelected = {};

    sideBarMaterialesController.openModal = function() {

      var modalInstance = $uibModal.open({
        animation: sideBarMaterialesController.animationsEnabled,
        templateUrl: 'estadisticasApp/frontEnd/materiales/modal/mapModal.html',
        controller: 'modalController as modalController',
        size: 'lg'
      });
    };

    function searchByDate() {

        var dateFrom = sideBarMaterialesController.dateFrom.valueOf();
        var dateTo = sideBarMaterialesController.dateTo.valueOf();

        materialesService.setSelectedDate(dateFrom, dateTo);

        $state.go('seguimiento.materiales.seguimientoMateriales');

    }

  }
})();
