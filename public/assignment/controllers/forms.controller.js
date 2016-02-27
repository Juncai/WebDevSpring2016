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

        FormService.findAllFormsForUser($rootScope.currentUser._id, findAllFormCallback);


        function addForm(form) {
            FormService.createFormForUser($rootScope.currentUser._id, form, addFormCallback);
        }

        function addFormCallback(form) {
            FormService.findAllFormsForUser($rootScope.currentUser._id, findAllFormCallback);
        }

        function updateForm(form) {
            FormService.createFormForUser($rootScope.currentUser._id, form, addFormCallback);
        }

        function updateFormCallback(form) {
            FormService.findAllFormsForUser($rootScope.currentUser._id, findAllFormCallback);
        }
        function deleteForm(index) {
            FormService.deleteFormById(index, deleteFormCallback);
        }

        function deleteFormCallback(forms) {
            FormService.findAllFormsForUser($rootScope.currentUser._id, findAllFormCallback);
        }

        function selectForm(index) {
            $scope.selectedForm = FormService.findFormById(index);
        }

        function findAllFormCallback(forms) {
            $scope.forms = forms;
        }
    }
})();
