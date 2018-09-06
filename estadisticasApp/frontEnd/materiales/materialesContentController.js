(function() {
  'use strict';

  angular
    .module('materiales')
    .controller('materialesContentController', materialesContentController);

  materialesContentController.$inject = ['materialesService', 'claimsService'];

  function materialesContentController(materialesService, claimsService) {
    var materialesContentController = this;

    materialesContentController.reclamos = claimsService.claims.length;
    materialesContentController.reclamos = JSON.stringify(materialesContentController.reclamos);
    var currentDate = new Date();
    var dateFrom = (currentDate.getTime() - 518400000);
    materialesContentController.dateFrom = new Date(dateFrom).toLocaleDateString();
    materialesContentController.dateTo = (new Date()).toLocaleDateString();

    materialesContentController.materiales = materialesService.materiales;
    var data = [];
    var drilldown = [];
    materialesContentController.getSeries = getSeries();

    function getSeries() {
      _.each(materialesContentController.materiales, function(material) {
        data.push({
          name: material.name,
          y: material.cantidad,
          drilldown: material.name
        });
        drilldown.push({
          name: material.name,
          id: material.nombre
        });
      })
    }

    $(function() {
      // Create the chart
      $('#materialesUtilizados').highcharts({
        chart: {
          type: 'column'
        },
        title: {
          text: materialesContentController.dateFrom + ' - ' + materialesContentController.dateTo
        },
      
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Tiempo'
          }

        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
            }
          }
        },

        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: {point.y}<br/>'
        },

        series: [{
          name: "Materiales",
          colorByPoint: true,
          data: data
        }],
        drilldown: {
          series: drilldown
        }
      });
    });
  }
})();
