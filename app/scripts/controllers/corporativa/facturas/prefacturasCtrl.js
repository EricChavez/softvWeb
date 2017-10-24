'use strict';
angular.module('softvApp').controller('prefacturasCtrl', prefacturasCtrl);

function prefacturasCtrl($state, ContratoMaestroFactory, ngNotify, $filter, $uibModal, $scope, $rootScope) {

  function Init() {
    buscar(1);
  }

  var buscar = function (op) {
    var parametros = {
      'Factura': (op === 2 && (vm.factura !== null || vm.factura !== undefined)) ? vm.factura : 0,
      'Fecha': (op === 3 && (vm.fecha !== null || vm.fecha !== undefined)) ? $filter('date')(vm.fecha, 'dd/MM/yyyy') : '',
      'Todas': (op === 1 && vm.todas === true) ? 1 : 0,
      'ContratoMaestro': (op === 4 && (vm.contrato !== null || vm.contrato !== undefined)) ? vm.contrato : 0,
      'Opcion': op
    };
    ContratoMaestroFactory.BuscaFacturasFisca(parametros)
      .then(function (data) {

        vm.facturas = data.GetBuscaFacturasFiscaListResult;
      });

  };
  var Conceptos = function (clave, status) {
    var obj = {};
    obj.clave = clave;
    obj.status = status;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/corporativa/ModalEditaFacpreeliminar.html',
      controller: 'ModalEditaFacpreeliminarCtrl',
      controllerAs: '$ctrl',
      backdrop: 'static',
      keyboard: false,
      size: "lg",
      resolve: {
        obj: function () {
          return obj;
        }
      }
    });
  };

 $rootScope.$on('actualizar_listado', function (e, clave) {   
     buscar(1);
  });


  var vm = this;
  Init();
  vm.buscar = buscar;
  vm.Conceptos = Conceptos;
}
