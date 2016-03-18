"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($rootScope, FormService) {
        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.form = {"title": ""};

        function init() {
            if ($rootScope.currentUser) {
                FormService
                    .findAllFormsForUser($rootScope.currentUser._id)
                    .then(function (response) {
                        vm.forms = response.data;
                    })
            }
        }

        init();


        function addForm(form) {
            FormService
                .createFormForUser($rootScope.currentUser._id, form)
                .then(function (response) {
                    vm.forms = response.data;
                });
        }

        function updateForm() {
            if (vm.selectedForm != null) {
                FormService
                    .updateFormById(vm.selectedForm._id, vm.form)
                    .then(function (response) {
                        vm.forms = response.data;
                        vm.selectedForm = null;
                    });
            }
        }

        function deleteForm(index) {
            var formToDelete = vm.forms[index];
            FormService
                .deleteFormById(formToDelete._id)
                .then(function (response) {
                    vm.forms = response.data;
                });
        }

        function selectForm(index) {
            vm.selectedForm = vm.forms[index];
            vm.form.title = vm.selectedForm.title;
        }
    }
})();
