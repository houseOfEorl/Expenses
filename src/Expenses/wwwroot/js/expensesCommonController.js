(function () {

    "use strict";

    //Getting the existing module
    angular.module("app-expenses")
        .controller("expensesCommonController", expensesCommonController)

    function expensesCommonController($http) {

        var vm = this;

        vm.avgAmount = 0;

        vm.isBusy = true;

        $http.get('http://localhost:53129/api/ExpensesCommon/GetAvarageAmount')
          .then(function (response) {
              // Success
              vm.avgAmount = response.data;
          }, function (error) {
              // Failure
              vm.errorMessage = "Failed to load data: " + error;
          })
          .finally(function () {
              vm.isBusy = false;
          });

    }

})();