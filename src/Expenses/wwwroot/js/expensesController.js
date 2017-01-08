(function () {

    "use strict";

    //Getting the existing module
    angular.module("app-expenses")
        .controller("expensesController", expensesController)

    function expensesController($http) {

        var vm = this;

        vm.expenses = [];

        vm.isBusy = true;

        $http.get('http://localhost:53129/api/Expenses')
          .then(function (response) {
              // Success
              angular.copy(response.data, vm.expenses);
          }, function (error) {
              // Failure
              vm.errorMessage = "Failed to load data: " + error;
          })
          .finally(function () {
              vm.isBusy = false;
          });

    }

})();