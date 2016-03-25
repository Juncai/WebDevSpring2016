"use strict";
/**
 * Created by Jun Cai on 2/22/2016.
 */
(function () {
    angular
        .module("QuizZ")
        .factory("ClassService", classService);

    function classService($http) {
        var model = {
            findClassesBySchoolId: findClassesBySchoolId,
            findClassesByUserId: findClassesByUserId,
            createClass: createClass,
            findClassById: findClassById
        };
        return model;

        function findClassById(classId) {
            // dummy function for demo purpose
            return $http.get("/api/project/class/" + classId);
        }

        function findClassesBySchoolId(schoolId) {
            // dummy function for demo purpose
            return $http.get("/api/project/school/" + schoolId + "/class");
        }

        function findClassesByUserId(userId) {
            // dummy function for demo purpose
            return $http.get("/api/project/user/" + userId + "/class");
        }

        function createClass(userId, clazz) {
            // dummy function for demo purpose
            return $http.post("/api/project/user/" + userId + "/class", clazz);
        }
    }
})();
