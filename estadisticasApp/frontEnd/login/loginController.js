(function(){
	'use strict';

	angular
	.module('login')
	.controller('loginController', loginController);

	loginController.$inject = ['loginService'];

	function loginController(loginService){
		// login controller
		var loginController = this;

		// Paso al scope funcion login
		loginController.login = login;
		loginController.credentials = {};

		function login(){

			 // var keyHex = CryptoJS.enc.Utf8.parse(loginController.credentials.pass);


			 //  loginController.credentials.pass = CryptoJS.DES.encrypt(keyHex, {
			 //  	mode: CryptoJS.mode.ECB,
			 //  	padding: CryptoJS.pad.Pkcs5
			 //  });			

			 loginService.login(loginController.credentials);

		}
	}

})();