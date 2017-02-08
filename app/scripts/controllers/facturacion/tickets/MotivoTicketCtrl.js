'use strict';
angular.module('softvApp')
	.controller('MotivoTicketCtrl', function($uibModalInstance, ticketsFactory, $rootScope, ngNotify, item) {
		function initialData() {
			ticketsFactory.getMotivo(item.op).then(function(data) {
				vm.motivos = data.GetMUESTRAMOTIVOSListResult;
				vm.selectedMotivo = vm.motivos[0];
			});
		}

		function ok() {
			if (item.tipo == 'N') {
				ticketsFactory.guardaMotivo(item.clv_Factura, vm.selectedMotivo.Clv_Motivo).then(function(data) {
					ticketsFactory.addBitacora(item.clv_Factura, item.cliente, 1).then(function(dataBit) {
						$uibModalInstance.dismiss('cancel');
					});
				});
			} else {
				ticketsFactory.guardaMotivo(item.Clv_Factura, vm.selectedMotivo.Clv_Motivo).then(function(data) {
					ticketsFactory.canEspeceiales(item.Clv_Factura).then(function(dataCan) {
						ticketsFactory.addBitacora(item.Clv_Factura, item.cliente, 3).then(function(dataBit) {
							$uibModalInstance.dismiss('cancel');
							ngNotify.set(dataCan.GetCANCELACIONFACTURASListResult.Msg, 'success');
						});
					});

				});
			}

		}

		var vm = this;
		vm.ok = ok;
		initialData();
	});