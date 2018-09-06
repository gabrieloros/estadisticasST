(function() {
  'use strict';

  angular
    .module('estadisticasApp')
    .controller('sideBarSegPersonaController', sideBarSegPersonaController);

  sideBarSegPersonaController.$inject = ['empleadosService', 'claimsService', '$state'];

  function sideBarSegPersonaController(empleadosService, claimsService, $state) {
    var sideBarSegPersonaController = this;





    sideBarSegPersonaController.empleado = empleadosService.selected;
    sideBarSegPersonaController.employeeClaims = claimsService.employeeClaims;
    sideBarSegPersonaController.date = claimsService.getSelectedDate();
    sideBarSegPersonaController.tareasAsignadas = sideBarSegPersonaController.employeeClaims.length;
    sideBarSegPersonaController.tareasRealizadas = getTareasRealizadas();
    sideBarSegPersonaController.tareasPendientes = getTareasPendientes();
    sideBarSegPersonaController.reclamosRecorridos = getReclamosVisitados();
    sideBarSegPersonaController.reclamosSinVer = getReclamosSinVer();
    sideBarSegPersonaController.enTermino = 0;
    sideBarSegPersonaController.fueraDeTermino = 0;
    sideBarSegPersonaController.tareasTermino = getTareasTermino();
    sideBarSegPersonaController.tareasBaja = getTareasBaja();
    sideBarSegPersonaController.dateFrom = new Date(sideBarSegPersonaController.date.dateFrom).toLocaleString();
    sideBarSegPersonaController.dateTo = new Date(sideBarSegPersonaController.date.dateTo).toLocaleString();
    sideBarSegPersonaController.exportar = exportar;

    // PAGINACION

    sideBarSegPersonaController.pageSize = 5;
    sideBarSegPersonaController.totalItems = sideBarSegPersonaController.employeeClaims.length;
    sideBarSegPersonaController.currentPage = 1;

    //FIN PAGINACION

    function exportar(){
      var data = [
        sideBarSegPersonaController.tareasAsignadas,
        sideBarSegPersonaController.tareasRealizadas,
        sideBarSegPersonaController.enTermino,
        sideBarSegPersonaController.fueraDeTermino,
        sideBarSegPersonaController.tareasBaja,
        sideBarSegPersonaController.tareasPendientes,
        sideBarSegPersonaController.reclamosRecorridos,
        sideBarSegPersonaController.reclamosSinVer,
        sideBarSegPersonaController.empleado.userLogin

      ];

      empleadosService.exportar(data);
      $state.go('seguimiento');
    }

    function getReclamosSinVer(){
      var counter = 0;
      _.each(sideBarSegPersonaController.employeeClaims, function(claim){
        if(claim.substateid == 0){
          counter++;
        }
     })    
      return counter;
    }

    function getReclamosVisitados(){
      var counter = 0;
      _.each(sideBarSegPersonaController.employeeClaims, function(claim){
        if(claim.substateid != 0){
          counter++;
        }
     })    
      return counter;
    }

    function getTareasTermino() {

      sideBarSegPersonaController.enTermino = 0;
      sideBarSegPersonaController.fueraDeTermino = 0;

      var tareas = {
        enTermino: [],
        fueraDeTermino: []
      };
      _.each(sideBarSegPersonaController.employeeClaims, function(claim) {
      //  var entryDate = JSON.parse(claim.entrydate);
          var range = claimsService.getSelectedDate();
      
          var entryDate = new Date(claim.claim.entrydate);
          var closeDate = new Date(claim.claim.closedate);

          if (claim.claim.closeDate != null && closeDate.getTime() >= range.dateFrom
          && closeDate.getTime() <= range.dateTo 
          && claim.claim.systemuserid == empleadosService.getSelected().id){

          var entryDate = new Date(claim.claim.entrydate);
          var closeDate = new Date(claim.claim.closedate);

          var inTermsTime = closeDate.getTime() - 172800000;  
          if (entryDate.getTime() >= inTermsTime) {
            sideBarSegPersonaController.enTermino++;
            // return claim["termino"] = 1;
          } else {
           sideBarSegPersonaController.fueraDeTermino++;
          //  return claim["termino"] = 0;
          }

        }
      })

    }

    function getTareasPendientes() {
      sideBarSegPersonaController.tareasPendientes = 0;

      var counter = 0;
      _.each(sideBarSegPersonaController.employeeClaims, function(claim) {
        if (claim.claim.stateid == 1 && (claim.substateid == 0 || claim.substateid == 1)) {
          counter++;
        }
      })
      return counter;
      
    };

    function getTareasRealizadas() {
      sideBarSegPersonaController.tareasRealizadas = 0;
      var counter = 0;

      _.each(sideBarSegPersonaController.employeeClaims, function(claim){
        var closeDate = new Date(claim.claim.closedate);
        if(closeDate.getTime() >= claimsService.getSelectedDate().dateFrom
            && closeDate.getTime() < claimsService.getSelectedDate().dateTo
              && claim.claim.systemuserid == empleadosService.getSelected().id){
          counter++;
          
        }
      })

      return counter;
      
    };

    function getTareasBaja() {
      var counter = 0;
      _.each(sideBarSegPersonaController.employeeClaims, function(claim) {
        if (claim.claim.stateid == 3 && claim.claim.systemuserid ==
empleadosService.getSelected().id) {
          counter++;
        }
      })
      return counter;

    };
  }
})();
