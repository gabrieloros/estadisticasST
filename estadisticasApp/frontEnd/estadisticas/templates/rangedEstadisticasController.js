(function(){
	'use strict';

	angular
	.module('estadisticas')
	.controller('rangedEstadisticasController', rangedEstadisticasController);

	rangedEstadisticasController.$inject = ['claimsService', 'empleadosService'];

	function rangedEstadisticasController(claimsService, empleadosService){
		var rangedEstadisticasController = this;

		rangedEstadisticasController.claims = claimsService.claims;
		rangedEstadisticasController.realizadasAsignadas = getTareasRealizadasAsignadas();
    rangedEstadisticasController.enTerminoFueraDeTermino = getTerminoTareas();
    rangedEstadisticasController.reclamosNuevosTerminados = getReclamosNuevosTerminados();
    rangedEstadisticasController.asignadasRealizadasPie = getAsignadasRealizadasPie();
    rangedEstadisticasController.enTerminoFueraTerminoPie = getTerminoTareasPie();
    rangedEstadisticasController.nuevasRealizadasPie = getNuevasRealizadasPie();

		function getTareasRealizadasAsignadas(){
      var counter = 0;
			var result = {days: [], realizadas: [], asignadas:[]};
			var days = [];
			var asignadas = 0;
			var realizadas = 0;

			_.each(rangedEstadisticasController.claims, function(claim){  
      		   
              var datereporting = new Date(claim.timereporting);
              days.push(datereporting);

    	  	})

      //recorreremos todos los elementos hasta n-1
     for(var i=0;i<(days.length-1);i++){
      //recorreremos todos los elementos hasta n-i, tomar en cuenta los ultimos no tiene caso ya que ya estan acomodados.
      for(var j=0;j<(days.length-1);j++){
         
          if(!(isNaN(days[j].getTime()))){
            var dia = days[j].getTime();
          //comparamos
          if(dia >days[j+1].getTime()){
                //guardamos el numero mayor en el auxiliar
                var aux= new Date(dia);
                //guardamos el numero menor en el lugar correspondiente
                days[j]=days[j+1];
                //asignamos el auxiliar en el lugar correspondiente
                days[j+1]=aux;
          }
        }
 
     }
}
          var dias = [];
          _.each(days, function(day){
            dias.push(day.toLocaleDateString());
          })
                
                    
          dias = _.pull(dias, "Invalid Date");
          days = _.uniq(dias);
          
          result.days = days;

    	  	_.each(days, function(day){
    	  		_.each(rangedEstadisticasController.claims, function(claim){
    	  			var entryDate = new Date(claim.claim.entrydate).toLocaleDateString();
              var closeDate = new Date(claim.claim.closedate).toLocaleDateString();
              var timereporting = new Date(claim.timereporting).toLocaleDateString();

    	  			if(entryDate == day || closeDate == day || timereporting == day){
                   if(closeDate == day){
                  counter++;
    	  					asignadas += 1;
    	  					realizadas += 1;
                  }
    	  				  else {
                    counter++;
    	  					asignadas += 1; 
    	  				  }
    	  			}
    	  		})
    	  		result.asignadas.push(asignadas);
    	  		asignadas = 0;
    	  		result.realizadas.push(realizadas);
    	  		realizadas = 0;
    	  	})

          console.log("asignadas counter: " + counter);
    	  	return result;

		}

    function getTerminoTareas(){
      var result = {days: [], enTermino: [], fueraTermino:[]};
      var days = [];
      var enTermino = 0;
      var fueraTermino = 0;
      var counter = 0;

      _.each(rangedEstadisticasController.claims, function(claim){  
              var datereporting = new Date(claim.timereporting);
              days.push(datereporting);

          })
          
                //recorreremos todos los elementos hasta n-1
     for(var i=0;i<(days.length-1);i++){
      //recorreremos todos los elementos hasta n-i, tomar en cuenta los ultimos no tiene caso ya que ya estan acomodados.
      for(var j=0;j<(days.length-1);j++){
         
          if(!(isNaN(days[j].getTime()))){
            var dia = days[j].getTime();
          //comparamos
          if(dia >days[j+1].getTime()){
                //guardamos el numero mayor en el auxiliar
                var aux= new Date(dia);
                //guardamos el numero menor en el lugar correspondiente
                days[j]=days[j+1];
                //asignamos el auxiliar en el lugar correspondiente
                days[j+1]=aux;
          }
        }
 
     }
}
          var dias = [];
          _.each(days, function(day){
            dias.push(day.toLocaleDateString());
          })
                
          dias = _.pull(dias, "Invalid Date");
          
          days = _.uniq(dias);
          
          result.days = days;

          _.each(days, function(day){
            _.each(rangedEstadisticasController.claims, function(claim){
                 var dia = new Date(claim.claim.closedate).toLocaleDateString();

                 if(day == dia){
                    var closeDate = new Date(claim.claim.closedate);
                    var entryDate = new Date(claim.claim.entrydate);
                    var inTermsTime = closeDate.getTime() - 172800000;

                    if(entryDate.getTime() >= inTermsTime){
                      counter++;
                      enTermino += 1;
                    }else{
                      counter++;
                      fueraTermino += 1;
                    }
                 }
                
            })
            result.enTermino.push(enTermino);
            enTermino = 0;
            result.fueraTermino.push(fueraTermino);
            fueraTermino = 0;
          })
          
          console.log("termino: " + counter);
          return result;
        }
    

    function getReclamosNuevosTerminados(){
        var result = {days: [], nuevos: [], terminados:[]};
      var days = [];
      var nuevos = 0;
      var terminados = 0;

      _.each(rangedEstadisticasController.claims, function(claim){  
            var datereporting = new Date(claim.timereporting);
            days.push(datereporting);
          })
          
                //recorreremos todos los elementos hasta n-1
     for(var i=0;i<(days.length-1);i++){
      //recorreremos todos los elementos hasta n-i, tomar en cuenta los ultimos no tiene caso ya que ya estan acomodados.
      for(var j=0;j<(days.length-1);j++){
         
          if(!(isNaN(days[j].getTime()))){
            var dia = days[j].getTime();
          //comparamos
          if(dia >days[j+1].getTime()){
                //guardamos el numero mayor en el auxiliar
                var aux= new Date(dia);
                //guardamos el numero menor en el lugar correspondiente
                days[j]=days[j+1];
                //asignamos el auxiliar en el lugar correspondiente
                days[j+1]=aux;
          }
        }
 
     }
}
          var dias = [];
          _.each(days, function(day){
            dias.push(day.toLocaleDateString());
          })
                
                    
          dias = _.pull(dias, "Invalid Date");
          days = _.uniq(dias);
          
          result.days = days;

          _.each(days, function(day){
            _.each(rangedEstadisticasController.claims, function(claim){
              var entryDate = new Date(claim.claim.entrydate).toLocaleDateString();
              var closeDate = new Date(claim.claim.closedate).toLocaleDateString();
              
                  
                    if(entryDate == day){
                      nuevos += 1;
                    }

                    if(closeDate == day){
                      terminados += 1;
                    }   
              
            })
            result.nuevos.push(nuevos);
            nuevos = 0;
            result.terminados.push(terminados);
            terminados = 0;
          })

          return result;



    }

    function getAsignadasRealizadasPie(){
       var result = {asignadas: 0, realizadas: 0};
       var asignadas = 0;
       var realizadas = 0;

       _.each(rangedEstadisticasController.claims, function(claim){
              var dia = new Date(claim.claim.entrydate).toLocaleDateString();
              var closeDate = new Date(claim.claim.closedate);

                   if(closeDate.getTime() >= claimsService.getSelectedDate().dateFrom
                   && closeDate.getTime() <= claimsService.getSelectedDate().dateTo 
                   ){
                  asignadas += 1;
                  realizadas += 1;
                  }
                  else {
                  asignadas += 1; 
                  }
            })

       result.asignadas = asignadas;
       result.realizadas = realizadas;

       return result
    }

    function getTerminoTareasPie(){
      var result = {enTermino: 0, fueraTermino: 0};
       var enTermino = 0;
       var fueraTermino = 0;

       _.each(rangedEstadisticasController.claims, function(claim){
              var entryDate = new Date(claim.claim.entrydate);
              var dia = new Date(claim.claim.closedate).toLocaleDateString();
              var closeDate = new Date(claim.claim.closedate);
              var inTermsTime =  closeDate.getTime() - 172800000;

              
              if(claim.claim.closedate != null){
               
                  if(closeDate.getTime() >= claimsService.getSelectedDate().dateFrom
                   && closeDate.getTime() <= claimsService.getSelectedDate().dateTo){
                    if(entryDate.getTime() >= inTermsTime){
                      enTermino += 1;
                    }
                    else {
                      fueraTermino += 1; 
                    }
                  }
              }
            })

       result.enTermino = enTermino;
       result.fueraTermino = fueraTermino;

       return result
    }

    function getNuevasRealizadasPie(){
      var result = {nuevos: 0, realizados: 0};
       var nuevos = 0;
       var realizados = 0;

       _.each(rangedEstadisticasController.claims, function(claim){
              var entryDate = new Date(claim.claim.entrydate);
              var closeDate = new Date(claim.claim.closedate);
              var dateFrom = new Date(claimsService.getSelectedDate().dateFrom);
              var dateTo = new Date(claimsService.getSelectedDate().dateTo);
                  
                    if(entryDate.getTime() >= dateFrom.getTime() 
                      && entryDate.getTime() <= dateTo.getTime()){
                      nuevos += 1;

                    }
                    if(closeDate.getTime() >= dateFrom.getTime() 
                      && closeDate.getTime() <= dateTo.getTime()){
                      realizados += 1;
                    }            
            })

       result.nuevos = nuevos;
       result.realizados = realizados;

       return result
    }


		    $(function() {
      $('#tareasRealizadas').highcharts({
        chart: {
          type: 'area'
        },
        colors:['#65627C', '#627597'],
        plotOptions: {
          series: {
            enableMouseTracking: false,
            dataLabels: {
              enabled: true
            }
          }
        },
        xAxis:{
          categories: rangedEstadisticasController.realizadasAsignadas.days
        },



        title: {
          text: ''
        },
        legend: {
          verticalAlign: 'top',
          floating: 'true'
        },
        series: [{
          name: 'TAREAS ASIGNADAS',
          data: rangedEstadisticasController.realizadasAsignadas.asignadas
        }, {
          name: 'TAREAS REALIZADAS',
          data: rangedEstadisticasController.realizadasAsignadas.realizadas
        }]
      });
    });

        $(function() {
      $('#tareasTermino').highcharts({
        chart: {
          type: 'area'
        },
        colors:['#855C65', '#A37A5C'],
        plotOptions: {
          series: {
            enableMouseTracking: false,
            dataLabels: {
              enabled: true
            }
          }
        },
        xAxis:{
          categories: rangedEstadisticasController.enTerminoFueraDeTermino.days
        },



        title: {
          text: ''
        },
        legend: {
          verticalAlign: 'top',
          floating: 'true'
        },
        series: [{
          name: 'TAREAS EN TERMINO',
          data: rangedEstadisticasController.enTerminoFueraDeTermino.enTermino
        }, {
          name: 'TAREAS FUERA DE TERMINO',
          data: rangedEstadisticasController.enTerminoFueraDeTermino.fueraTermino
        }]
      });
    });        

        $(function() {
      $('#nuevosTerminados').highcharts({
        chart: {
          type: 'area'
        },
        colors:['#4C8A79', '#507579'],
        plotOptions: {
          series: {
            enableMouseTracking: false,
            dataLabels: {
              enabled: true
            }
          }
        },
        xAxis:{
          categories: rangedEstadisticasController.reclamosNuevosTerminados.days
        },



        title: {
          text: ''
        },
        legend: {
          verticalAlign: 'top',
          floating: 'true'
        },
        series: [{
          name: 'RECLAMOS NUEVOS',
          data: rangedEstadisticasController.reclamosNuevosTerminados.nuevos
        }, {
          name: 'RECLAMOS TERMINADOS',
          data: rangedEstadisticasController.reclamosNuevosTerminados.terminados
        }]
      });
    }); 

    $(function() {
          $('#pieTareasRealizadas').highcharts({
            chart: {
              type: 'pie'
            },
            colors:['#867DAE', '#5CA3D9'],
            title: {
              text: 'TAREAS ASIGNADAS TAREAS REALIZADAS'
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
                y: rangedEstadisticasController.asignadasRealizadasPie.asignadas
              }, {
                name: 'Tareas Realizadas',
                y: rangedEstadisticasController.asignadasRealizadasPie.realizadas

              }]
            }]
          });
        });

        $(function() {
          $('#pieTareasTermino').highcharts({
            chart: {
              type: 'pie'
            },
            colors:['#EDC448', '#F26B61'],
            title: {
              text: 'TAREAS EN TERMINO TAREAS FUERA DE TERMINO'
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
                name: 'EN TERMINO',
                y: rangedEstadisticasController.enTerminoFueraTerminoPie.enTermino

              },
              {
                name: 'FUERA TERMINO',
                y: rangedEstadisticasController.enTerminoFueraTerminoPie.fueraTermino
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
                name: 'Nuevos reclamos',
                y: rangedEstadisticasController.nuevasRealizadasPie.nuevos
              }, {
                name: 'Reclamos terminados',
                y: rangedEstadisticasController.nuevasRealizadasPie.realizados

              }]
            }]
          });
        });  
	 }
})();
