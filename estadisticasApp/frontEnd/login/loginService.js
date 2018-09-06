(function(){
	'use strict';

	angular
	.module('login')
	.factory('loginService', loginService);

	loginService.$inject = ['$http', '$q', '$state', '$sessionStorage'];


	function loginService($http, $q, $state, $sessionStorage){

		var service = {
			usuario: {},
			login: login,
			logout: logout,
			getUsuario: getUsuario
		}

		// logout, borro sesion de localStorage, re-dirijo al login
		function logout(){
			if($sessionStorage.user){
				delete $sessionStorage.user;
				$state.go('login');
			}
		}

		// login
		function login(credentials){
			
			var usuario = credentials.usuario;
      		var pass = credentials.pass;

     		var config = {
       			method: 'POST',
        		url: 'http://localhost:8080/Estadisticas_Rest/rest/login/validateLogin/' + usuario + '/' + pass
      		}
      		
      		
      		$http(config).then(function(result) {
      			service.usuario = result.data.data;
      			$sessionStorage.user = result.data.data;
      			if(service.usuario.userLogin != null && service.usuario.id != null){
        			$state.go('seguimiento');

      			}else{
      				$state.go('login');
      			}
      		})

		}

		function getUsuario(){
			return $sessionStorage.user;
		}

		return service;
	}
})();