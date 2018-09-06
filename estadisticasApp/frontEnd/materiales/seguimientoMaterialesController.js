(function(){
	'use strict';

	angular
	.module('materiales')
	.controller('seguimientoMaterialesController', seguimientoMaterialesController);

	seguimientoMaterialesController.$inject = ['materialesService'];

	function seguimientoMaterialesController(materialesService){
		var seguimientoMaterialesController = this;

	
    seguimientoMaterialesController.date = materialesService.getSelectedDate();
    seguimientoMaterialesController.dateTo = (new Date(seguimientoMaterialesController.date.dateTo)).toLocaleDateString();
    seguimientoMaterialesController.dateFrom = (new Date(seguimientoMaterialesController.date.dateFrom)).toLocaleDateString();
    seguimientoMaterialesController.materialesOrderedByDate = materialesService.getMaterialsOrderedDate();
    seguimientoMaterialesController.ordered = formArrays();


  	seguimientoMaterialesController.materiales = materialesService.materialesByDate;
		var data = [];
    var drilldown = [];
   	seguimientoMaterialesController.getSeries = getSeries();

    function formArrays(){
      
      var result = {days: [], material: [], cantidad: []};

      _.each(seguimientoMaterialesController.materialesOrderedByDate, function(day,key){
        _.each(day, function(material){
          result.days.push(key);
          result.material.push(material.descripcion);
          result.cantidad.push(material.cantidad);
        })
      })

      return result;
    }


		function getSeries() {
      _.each(seguimientoMaterialesController.materiales, function(material) {
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
          text: seguimientoMaterialesController.dateFrom + ' - ' + seguimientoMaterialesController.dateTo
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

        $(function() {
      $('#materialsByDay').highcharts({
        chart: {
          type: 'area'
        },
        plotOptions: {
          series: {
            enableMouseTracking: false,
            dataLabels: {
              enabled: true
            }
          }
        },
        xAxis:{
          categories: seguimientoMaterialesController.ordered.days
        },



        title: {
          text: ''
        },
        legend: {
          verticalAlign: 'top',
          floating: 'true'
        },
        series: [
          _.each(seguimientoMaterialesController.ordered.days, function(){
            _.each(seguimientoMaterialesController.ordered, function(){
              {
                
                data: seguimientoMaterialesController.cantidad
              }
            })
          })

     //   {
      //    name: 'TAREAS ASIGNADAS',
         // data: estadisticasOperarioController.asignadasRealizadas.asignadas
       // }, {
        //  name: 'TAREAS REALIZADAS',
         // data: estadisticasOperarioController.asignadasRealizadas.realizadas
       // }
        ]
      });
    });

	}

})();