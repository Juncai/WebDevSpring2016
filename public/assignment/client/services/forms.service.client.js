"use strict";
/**
 * Created by Jun Cai on 2/22/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", formsService);

    function formsService($rootScope) {
        var model = {
            currentForms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo", "userId": 123},
                {"_id": "020", "title": "CDs", "userId": 234}
            ],

            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById: findFormById
        };
        return model;

        function createFormForUser(userId, form, callback) {
            var newForm = {
                _id: (new Date).getTime(),
                title: form.title,
                userId: userId
            };
            model.currentForms.push(newForm);
            callback(newForm);
        }

        //function findAllFormsForUser(userId) {
        //    var userForms = [];
        //    var cForm;
        //    for (var i in model.currentForms) {
        //        cForm = model.currentForms[i];
        //        if (cForm.userId == userId) {
        //            userForms.push(cForm);
        //        }
        //    }
        //    return userForms;
        //}

        function findAllFormsForUser(userId, callback) {
            var userForms = [];
            var cForm;
            for (var i in model.currentForms) {
                cForm = model.currentForms[i];
                if (cForm.userId == userId) {
                    userForms.push(cForm);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback) {
            var indToRemove = -1;
            var cForm;
            for (var i in model.currentForms) {
                cForm = model.currentForms[i];
                if (cForm._id == formId) {
                    indToRemove = i;
                    break;
                }
            }
            if (indToRemove > -1) {
                model.currentForms.splice(indToRemove, 1);
            }
            callback(model.currentForms);
        }

        function findFormById(formId) {
            var form = null;
            var cForm;
            for (var i in model.currentForms) {
                cForm = model.currentForms[i];
                if (cForm._id == formId) {
                    form = cForm;
                    break;
                }
            }
            return form;
        }

        function updateFormById(formId, newForm, callback) {
            var form = model.findFormById(formId);
            if (form != null) {
                form.title = newForm.title;
            }
            callback(form);
        }
    }
})();
