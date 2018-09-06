(function() {
    'use strict';

    angular
        .module('estadisticas')
        .controller('estadisticasGeneralesController', estadisticasGeneralesController);

    estadisticasGeneralesController.$inject = ['claimsService'];

    function estadisticasGeneralesController(claimsService) {
        var estadisticasGeneralesCtrl = this;

        estadisticasGeneralesCtrl.claims = claimsService.claims;
        estadisticasGeneralesCtrl.tareasTermino = claimsService.TareasEnTerminoFueraTermino;
        estadisticasGeneralesCtrl.tareasAsignadasRealizadas = claimsService.tareasAsignadasRealizadas;
        estadisticasGeneralesCtrl.tareasNuevasRealizadas = claimsService.tareasNuevasRealizadas;

        $(function() {
          $('#pieTareasRealizadas').highcharts({
            chart: {
              type: 'pie'
            },
            colors:['#867DAE', '#5CA3D9'],
	    title: {
	      text:'TAREAS REALIZADAS  TAREAS ASIGNADAS'
	    },
            subtitle: {
              text: ''
            },
            tooltip: {
            pointFormat: '{series.name}: <b>{point.y:,.0f}</b>'
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.y:,.0f} ',
                    connectorWidth: 0,
                    distance: -30,
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    showInLegend: true
                }
              },
            },
            series: [{
              name: '',
              colorByPoint: true,
              data: [{
                name: 'Tareas Asignadas',
                y: estadisticasGeneralesCtrl.tareasAsignadasRealizadas.asignadas
              }, {
                name: 'Tareas Realizadas',
                y: estadisticasGeneralesCtrl.tareasAsignadasRealizadas.realizadas

              }]
            }]
          });
        });

        $(function() {
          $('#pieTareasTermino').highcharts({
            chart: {
              type: 'pie'
            },
            colors:['#F26B61', '#EDC448'],
	    title: {
	      text: 'TAREAS EN TÉRMINO TAREAS FUERA DE TÉRMINO'
	    },
            subtitle: {
              text: ''
            },
            tooltip: {
            pointFormat: '{series.name}: <b>{point.y:,.0f}</b>'
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.y:,.0f} ',
                    connectorWidth: 0,
                    distance: -30,
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    showInLegend: true
                }
              },
            },
            series: [{
              name: '',
              colorByPoint: true,
              data: [{
                name: 'Tareas fuera de término',
                y: estadisticasGeneralesCtrl.tareasTermino.fueraTermino

              },
              {
                name: 'Tareas en término',
                y: estadisticasGeneralesCtrl.tareasTermino.enTermino
              }]
            }]
          });
        });

        $(function() {
          $('#pieReclamos').highcharts({
            chart: {
              type: 'pie'
            },
            colors:['#3EBEA4', '#48B96D'],
	    title: {
	      text: 'RECLAMOS NUEVOS RECLAMOS REALIZADOS'
    	    },
            subtitle: {
              text: ''
            },
            tooltip: {
            pointFormat: '{series.name}: <b>{point.y:,.0f}</b>'
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.y:,.0f} ',
                    connectorWidth: 0,
                    distance: -30,
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    showInLegend: true
                }
              },
            },            series: [{
              name: '',
              colorByPoint: true,
              data: [{
                name: 'Nuevos reclamos',
                y: estadisticasGeneralesCtrl.tareasNuevasRealizadas.nuevas
              }, {
                name: 'Reclamos terminados',
                y: estadisticasGeneralesCtrl.tareasNuevasRealizadas.realizadas

              }]
            }]
          });
        });
    }
})();
