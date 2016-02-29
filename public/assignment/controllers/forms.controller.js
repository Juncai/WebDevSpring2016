"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope, $rootScope, FormService) {
        $scope.error = null;
        $scope.message = null;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;


        if ($rootScope.currentUser) {
            FormService.findAllFormsForUser($rootScope.currentUser._id, findAllFormCallback);
        }


        function addForm(form) {
            FormService.createFormForUser($rootScope.currentUser._id, form, addFormCallback);
        }

        function addFormCallback(form) {
            FormService.findAllFormsForUser($rootScope.currentUser._id, findAllFormCallback);
        }

        function updateForm() {
            var cForm = $scope.selectedForm;
            FormService.updateFormById(cForm._id, cForm, updateFormCallback);
        }

        function updateFormCallback(form) {
            FormService.findAllFormsForUser($rootScope.currentUser._id, findAllFormCallback);
        }
        function deleteForm(index) {
            var formToDelete = $scope.forms[index];
            FormService.deleteFormById(formToDelete._id, deleteFormCallback);
        }

        function deleteFormCallback(forms) {
            FormService.findAllFormsForUser($rootScope.currentUser._id, findAllFormCallback);
        }

        function selectForm(index) {
            $scope.selectedForm = $scope.forms[index];
        }

        function findAllFormCallback(forms) {
            $scope.forms = forms;
        }
    }
})();
