"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */

(function () {
    angular
        .module("QuizZ")
        .controller("FormController", formController);

    function formController($scope, $rootScope, FormService) {
        $scope.error = null;
        $scope.message = null;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.form = {"title" : ""};


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
            if ($scope.selectedForm != null) {
                FormService.updateFormById($scope.selectedForm._id, $scope.form, updateFormCallback);
            }
        }

        function updateFormCallback(form) {
            FormService.findAllFormsForUser($rootScope.currentUser._id, findAllFormCallback);
            $scope.selectedForm = null;
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
            $scope.form.title = $scope.selectedForm.title;
        }

        function findAllFormCallback(forms) {
            $scope.forms = forms;
        }
    }
})();
