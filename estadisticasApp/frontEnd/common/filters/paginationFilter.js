(function() {
    'use strict';

    angular
        .module('estadisticasApp')
        .filter('paginationFilter', function(){
          return function(data, start){
            return data.slice(start);
          }
        });

})();
