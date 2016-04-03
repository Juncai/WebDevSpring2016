"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController(UserService, FormService) {
        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.newForm = {"title": ""};
        vm.forms = [];
        var user = null;

        function init() {
            user = UserService.getCurrentUser();
            if (user != null) {
                FormService
                    .findAllFormsForUser(user._id)
                    .then(function (response) {
                        vm.forms = response.data;
                    })
            }
        }

        init();


        function addForm(form) {
            FormService
                .createFormForUser(user._id, form)
                .then(function (response) {
                    vm.forms = response.data;
                });
        }

        function updateForm() {
            if (vm.selectedForm != null) {
                FormService
                    .updateFormById(vm.selectedForm._id, vm.newForm)
                    .then(function (response) {
                        var allForms = response.data;
                        var formsForUser = [];
                        for (var f in allForms) {
                            if (allForms[f].userId == user._id) {
                                formsForUser.push(allForms[f]);
                            }
                        }
                        vm.forms = formsForUser;
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
            vm.newForm.title = vm.selectedForm.title;
        }
    }
})();
