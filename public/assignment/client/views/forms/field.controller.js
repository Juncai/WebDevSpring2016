"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", fieldController);

    function fieldController($routeParams, FieldService) {
        var vm = this;
        vm.addField = addField;
        vm.updateField = updateField;
        vm.removeField = removeField;
        vm.fieldType = null;
        var formId = $routeParams.formId;
        var userId = $routeParams.userId;
        vm.fields = [];

        function init() {
            FieldService
                .getFieldsForForm(formId)
                .then(function (response) {
                    var fields = response.data;
                    if (fields != null) {
                        vm.fields = fields;
                    }
                });
        }

        init();


        function addField(fieldType) {
            var newField = null;
            switch (fieldType) {
                case "TEXT":
                    newField = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "TEXTAREA":
                    newField = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case "DATE":
                    newField = {"_id": null, "label": "New Date Field", "type": "DATE"};
                    break;
                case "OPTIONS":
                    newField = {
                        "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };
                    break;
                case "CHECKBOXES":
                    newField = {
                        "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    };
                    break;
                case "RADIOS":
                    newField = {
                        "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    };
                    break;
                default:
                    return;
            }

            if (newField != null) {
                FieldService
                    .createFieldForForm(formId, newField)
                    .then(function (response) {
                        vm.fields = response.data;
                    });
            }

        }

        function updateField() {
        }

        function removeField(field) {
            FieldService
                .deleteFieldFromForm(formId, field._id)
                .then(function (response) {
                    vm.fields = response.data;
                });
        }
    }
})();
