'use strict';

function BuscaContratoLCtrl($uibModalInstance, atencionFactory, $rootScope, corporativoFactory, ngNotify) {
	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}
	this.$onInit = function() {
		var obje = {};
		obje.servicio = 3;
		obje.op = 3;
		obje.colonia = 0;
		atencionFactory.buscarCliente(obje).then(function(data) {
			vm.Clientes = data.GetuspBuscaContratoSeparado2ListResult;
		});
	}

	function BusquedaporContrato() {
		if (vm.BUcontrato == null) {
			ngNotify.set('Ingresa un contrato válido', 'error');
			return;
		}
		var obje = {};
		obje.contrato = vm.BUcontrato;
		obje.servicio = 3;
		obje.colonia = 0;
		obje.op = 0;
		atencionFactory.buscarCliente(obje).then(function(data) {
			vm.Clientes = data.GetuspBuscaContratoSeparado2ListResult;
		});
	}

	function BusquedaporNombre() {
		if (vm.BUnombre == null && vm.BUapaterno == null && vm.BUamaterno == null) {
			ngNotify.set('Ingresa por lo menos un parametro de búsqueda', 'error');
			return;
		}
		var obje = {};
		obje.nombre = vm.BUnombre;
		obje.paterno = vm.BUapaterno;
		obje.materno = vm.BUamaterno;
		obje.colonia = 0;
		obje.servicio = 3;
		obje.op = 1;
		atencionFactory.buscarCliente(obje).then(function(data) {
			vm.Clientes = data.GetuspBuscaContratoSeparado2ListResult;
		});
	}


	function Seleccionar(contrato) {
		corporativoFactory.validaContrato(contrato.ContratoBueno).then(function(data) {
			if (data.GetValidaSiContratoExiste_CMResult.Bandera) {
				ngNotify.set(data.GetValidaSiContratoExiste_CMResult.Msg, 'error');
			} else {
				$uibModalInstance.dismiss('cancel');
				$rootScope.$emit('agregar_contrato', contrato);
			}
		});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	var vm = this;
	vm.cancel = cancel;
	vm.Seleccionar = Seleccionar;
	vm.BusquedaporNombre = BusquedaporNombre;
	vm.BusquedaporContrato = BusquedaporContrato;
}
angular.module('softvApp').controller('BuscaContratoLCtrl', BuscaContratoLCtrl);