"use strict";
/**
 * Created by Jun Cai on 2/22/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", formsService);

    function formsService($http) {
        var model = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById: findFormById
        };
        return model;

        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/" + formId);
        }

        function findFormById(formId) {
            return $http.get("/api/assignment/form/" + formId);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/" + formId, newForm);
        }
    }
})();
