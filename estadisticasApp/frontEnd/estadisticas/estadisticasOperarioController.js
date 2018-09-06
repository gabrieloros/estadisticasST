(function() {
  'use strict';

  angular
    .module('estadisticas')
    .controller('estadisticasOperarioController', estadisticasOperarioController);

  estadisticasOperarioController.$inject = ['claimsService', 'recorridosService'];

  function estadisticasOperarioController(claimsService, recorridosService) {
    var estadisticasOperarioController = this;


    estadisticasOperarioController.claims = claimsService.employeeClaims;

    estadisticasOperarioController.tareasAsignadasRealizadas = claimsService.getTareasAsignadasRealizadasByEmployee();
    estadisticasOperarioController.asignadasRealizadas = formArrays("asignadas", "realizadas", estadisticasOperarioController.tareasAsignadasRealizadas);
    estadisticasOperarioController.tareasEnTerminoFueraTermino = claimsService.getTareasEnTerminoFueraTerminoByEmployee();
    estadisticasOperarioController.enTerminoFueraTermino = formArrays("enTermino", "fueraTermino", estadisticasOperarioController.tareasEnTerminoFueraTermino);
    estadisticasOperarioController.tiempoPorReclamo = claimsService.getTiempoPorTarea();
    estadisticasOperarioController.tiempoEntreReclamos = claimsService.getTiempoEntreTareas();
    estadisticasOperarioController.promedioAsignadasRealizadas = promedioAsignadasRealizadas(estadisticasOperarioController.tareasAsignadasRealizadas);
    estadisticasOperarioController.promedioTerminoFueraTermino = promedioTerminoFueraTermino(estadisticasOperarioController.tareasEnTerminoFueraTermino);
    estadisticasOperarioController.promedioTiempoPorTarea = promedioTiempoPorTarea();
    estadisticasOperarioController.puntosRecorrido = recorridosService.recorridos;
    estadisticasOperarioController.tiempoTrabajado = tiempoTrabajado();
    
    function tiempoTrabajado(){
      
      var result = {};
      var dias = [];
      _.each(estadisticasOperarioController.puntosRecorrido, function(punto){
        var dia = new Date(punto.time).toLocaleDateString();
        dias.push(dia);
      })

       dias = _.pull(dias, "Invalid Date");
       dias = _.uniq(dias);

       _.each(dias, function(dia){
        var dayPoints = [];

        _.each(estadisticasOperarioController.puntosRecorrido, function(point){
          var reportedTime = new Date(point.time).toLocaleDateString();

          if(dia == reportedTime){
            dayPoints.push(point);
          }
        })

        result[dia] = dayPoints;
       })

      _.each(result, function(dia){

        for(var i=0;i<(dia.length-1);i++){
      
          for(var j=0;j<(dia.length-1);j++){
         
            if(!(isNaN(dia[j].time))){
              var day = dia[j].time;
         
              if(day >dia[j+1].time){
             
                var aux= dia[j];
                
                dia[j]=dia[j+1];
               
                dia[j+1]=aux;
              }
            }
          }
        }
      })

      var response = {keys: [], times: [], formatedTime: []};

      _.each(result, function(dia, key){
        var time = dia[dia.length - 1].time - dia[0].time;

        //sssssssssssssss

        var horas = time / 3600000;

        if(horas < 1){
          horas = 0;
          var resto = time - (horas * 3600000);
          var minutos = parseInt(resto / 60000);
          if(minutos < 10){ minutos = '0'+minutos}
          resto = time - ((horas * 3600000) + (minutos * 60000))
          var segundos = parseInt(resto / 1000);
          if(segundos < 10){ segundos = '0'+segundos}
          response.keys.push(key);
          response.times.push(time);
          var formatedTime = horas +':'+minutos+':'+segundos;
          response.formatedTime.push(formatedTime);
          
        }else{
          horas = parseInt(horas);
          if(horas < 10){ horas = '0'+horas}
          var resto = time - (horas * 3600000);
          var minutos = parseInt(resto / 60000);
          if(minutos < 10){ minutos = '0'+minutos}
          resto = time - ((horas * 3600000) + (minutos * 60000))
          var segundos = parseInt(resto / 1000);
          if(segundos < 10){ segundos = '0'+segundos}
          response.keys.push(key);
          response.times.push(time);
          var formatedTime = horas +':'+minutos+':'+segundos;
          response.formatedTime.push(formatedTime);
          //result[key] = horas +':'+minutos+':'+segundos;
          //result.tiempo = time;
        
        }
      })

      return response;
    }


    function promedioTiempoPorTarea(){
      var counter = 0;
      var tiempo = 0;
      var tiempoPorReclamo = {labels:[], series:[]};

      _.each(estadisticasOperarioController.tiempoPorReclamo.series, function(serie){
      
          tiempo+= serie[1];
          counter++;
        })

      var average = tiempo / counter;
      var formatedAverage = new Date(average);
      var horas = average / 3600000; 

      if(horas < 1){
          horas = 0;
          var resto = formatedAverage.getTime() - (horas * 3600000);
          var minutos = parseInt(resto / 60000);
          if(minutos < 10){ minutos = '0'+minutos}
          resto = formatedAverage.getTime() - ((horas * 3600000) + (minutos * 60000))
          var segundos = parseInt(resto / 1000);
          if(segundos < 10){ segundos = '0'+segundos}
          formatedAverage = horas +':'+minutos+':'+segundos;
          

        }else{
          horas = parseInt(horas);
          if(horas < 10){ horas = '0'+horas}
          var resto = formatedAverage.getTime() - (horas * 3600000);
          var minutos = parseInt(resto / 60000);
          if(minutos < 10){ minutos = '0'+minutos}
          resto = formatedAverage.getTime() - ((horas * 3600000) + (minutos * 60000))
          var segundos = parseInt(resto / 1000);
          if(segundos < 10){ segundos = '0'+segundos}
          formatedAverage = horas +':'+minutos+':'+segundos;
        }

        tiempoPorReclamo.series = average;
        tiempoPorReclamo.labels = formatedAverage;
        return tiempoPorReclamo;
    }

    function promedioAsignadasRealizadas(asignadasRealizdas){
      var promedioAsignadas = 0;
      var promedioRealizadas = 0;
      var asignadasRealizadasPromedio = {asignadas: 0, realizadas: 0, labelAsignadas:'', labelRealizadas: ''};
      _.each(asignadasRealizdas, function(dia){
        promedioAsignadas += dia.asignadas;
        promedioRealizadas += dia.realizadas;
      })

      asignadasRealizadasPromedio.asignadas = promedioAsignadas;
      asignadasRealizadasPromedio.realizadas = promedioRealizadas;

      return asignadasRealizadasPromedio;
    }
      function promedioTerminoFueraTermino(terminoFueraTermino){
      var promedioTermino = 0;
      var promedioFueraTermino = 0;
      var enTerminoFueraTermino = {termino: 0, fueraTermino: 0};
      _.each(terminoFueraTermino, function(dia){
        promedioTermino += dia.enTermino;
        promedioFueraTermino += dia.fueraTermino;
      })

      enTerminoFueraTermino.termino = promedioTermino;
      enTerminoFueraTermino.fueraTermino = promedioFueraTermino;

      return enTerminoFueraTermino;
    }


    function formArrays(val, secondVal, array){
      var result = null;
      _.each(array, function(dia, key){

        if(val == "asignadas"){
          if(result == null){
            result = {asignadas: [], realizadas: [], keys: []};
          }
            
          result.asignadas.push(dia[val]);
          result.realizadas.push(dia[secondVal]);
          result.keys.push(key);
        }
        else {
          if(result == null){
            result = {enTermino: [], fueraTermino: [], keys: []};
          }
            
          result.enTermino.push(dia[val]);
          result.fueraTermino.push(dia[secondVal]);
          result.keys.push(key);
        }
      })
    
      return result;
    }

    
    // $(function() {
    //   $('#tareasRealizadas').highcharts({
    //     chart: {
    //       type: 'area',
    //         zoomType: 'x'
    //     },
    //     colors:['#65627C', '#627597'],
    //     plotOptions: {
    //       series: {
    //         enableMouseTracking: false,
    //         dataLabels: {
    //           enabled: true
    //         }
    //       }
    //     },
    //     xAxis:{
    //       categories: estadisticasOperarioController.asignadasRealizadas.keys
    //     },



    //     title: {
    //       text: ''
    //     },
    //     legend: {
    //       verticalAlign: 'top',
    //       floating: 'true'
    //     },
    //     series: [{
    //       name: 'TAREAS ASIGNADAS',
    //       data: estadisticasOperarioController.asignadasRealizadas.asignadas
    //     }, {
    //       name: 'TAREAS REALIZADAS',
    //       data: estadisticasOperarioController.asignadasRealizadas.realizadas
    //     }]
    //   });
    // });

    $(function() {
      $('#tareasTermino').highcharts({
        chart: {
          type: 'area',
            zoomType: 'x'
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
          categories: estadisticasOperarioController.enTerminoFueraTermino.keys
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
          data: estadisticasOperarioController.enTerminoFueraTermino.enTermino
        }, {
          name: 'TAREAS FUERA DE TERMINO',
          data: estadisticasOperarioController.enTerminoFueraTermino.fueraTermino
        }]
      });
    });

      $(function() {
      $('#reclamosXhora').highcharts({
          chart: {
              type: 'column',
              zoomType: 'x'
          },
          colors:['#84A7D5'],
          title: {
              text: 'Tiempo por reclamo'
          },
          xAxis: {
              type: 'category',
              labels: {
                  rotation: -45,
                  style: {
                      fontSize: '13px',
                      fontFamily: 'Verdana, sans-serif'
                  }
              }
          },
          legend: {
              enabled: true
          },
          tooltip: {
              // pointFormat: 'Id reclamo: ' + estadisticasOperarioController.tiempoPorReclamo.labels[this.x]
              formatter: function() {
                  return 'Reclamo: <b>'+ estadisticasOperarioController.tiempoPorReclamo.labels[this.x]+
                      '<br> Tiempo: <b>'+estadisticasOperarioController.tiempoPorReclamo.series[this.x];
              }
          },
          series: [{
              name: '',
              data: estadisticasOperarioController.tiempoPorReclamo.series,
              dataLabels: {
                  enabled: false,
                  rotation: -90,
                  color: '#FFFFFF',
                  align: 'right',
                  format: '{point.y:.1f}', // one decimal
                  y: 10, // 10 pixels down from the top
                  style: {
                      fontSize: '13px',
                      fontFamily: 'Verdana, sans-serif'
                  }
              }
          }]
      });
      });


      $(function () {
          $('#horasTrabajadasXdia').highcharts({
              chart: {
                  type: 'area',
                  zoomType: 'x'
              },
              title: {
                  text: 'TIEMPO TRABAJADO POR DIA'
              },

              xAxis: {
                 // categories: estadisticasOperarioController.tiempoTrabajado.keys,
                  type: 'category',
                  labels: {
                      rotation: -45,
                      style: {
                          fontSize: '13px',
                          fontFamily: 'Verdana, sans-serif'
                      }
                  }
              },


                  yAxis: {
                  title: {
                      text: 'Values'
                  },

              },
              legend: {
                  enabled: true
              },
              tooltip: {
                  // pointFormat: 'Id reclamo: ' + estadisticasOperarioController.tiempoPorReclamo.labels[this.x]
                  formatter: function() {
                      return 'Horas Trabajadas: <b>'+ estadisticasOperarioController.tiempoTrabajado.formatedTime[this.x]+
                          '<br> Dia: <b>'+estadisticasOperarioController.tiempoTrabajado.keys[this.x];
                  }
              },
              plotOptions: {
                  area: {
                      fillColor: {
                          color: '#FFFFFF',
                          linearGradient: {
                              x1: 0,
                              y1: 0,
                              x2: 0,
                              y2: 1
                          },
                          stops: [
                              [0, Highcharts.getOptions().colors[0]],
                              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                          ]
                      },
                      marker: {
                          radius: 2
                      },
                      lineWidth: 1,
                      states: {
                          hover: {
                              lineWidth: 1
                          }
                      },
                      threshold: null
                  }
              },

              series: [{
                  name: '',
                  data: estadisticasOperarioController.tiempoTrabajado.times
                  //data: estadisticasOperarioController.tiempoPorReclamo.series
              }]
          });
      });


      $(function() {
      // Create the chart
      $('#tiempoTrabajado').highcharts({
        chart: {
          type: 'column'
        },
        title: {
          text: 'TIEMPO TRABAJADO'
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
          name: estadisticasOperarioController.tiempoTrabajado.formatedTime,
          colorByPoint: true,
          data: estadisticasOperarioController.tiempoTrabajado.times,
          drilldown: estadisticasOperarioController.tiempoTrabajado.keys
        }],
      });
    });


          $(function() {
          $('#pieTareasRealizadas').highcharts({
            chart: {
              type: 'pie'
            },
	    colors: ['#867DAE', '#5CA3D9'],
	    title: {
	      text: 'TAREAS ASIGNADAS TAREAS REALIZADAS'
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
              name: 'Tareas realizadas',
              colorByPoint: true,
              data: [{
                name: 'Tareas Asignadas',
                y: estadisticasOperarioController.promedioAsignadasRealizadas.asignadas
              }, {
                name: 'Tareas Realizadas',
                y: estadisticasOperarioController.promedioAsignadasRealizadas.realizadas

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
              text: 'TAREAS EN TERMINO - TAREAS FUERA DE TERMINO'
            },
            tooltip: {
            pointFormat: '{series.name}: <b>{point.y:.0f}</b>'
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
              name: 'En termino',
              colorByPoint: true,
              data: [{
                name: 'Fuera de término',
                y: estadisticasOperarioController.promedioTerminoFueraTermino.fueraTermino

              },
              {
                name: 'En término',
                y: estadisticasOperarioController.promedioTerminoFueraTermino.termino
              }]
            }]
          });
        });

  }
})();
