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

            addStudentToClass: addStudentToClass,
            updateClass: updateClass,
            deleteClass: deleteClass,
            createClass: createClass,
            findClassById: findClassById
        };
        return model;

        function findClassById(classId) {
            return $http.get("/api/project/class/" + classId);
        }

        function addStudentToClass(classId, student) {
            return $http.post("/api/project/class/" + classId + "/user", student);
        }

        function updateClass(classId, clazz) {
            return $http.put("/api/project/class/" + classId, clazz);
        }
        
        function deleteClass(classId) {
            return $http.delete("/api/project/class/" + classId);
        }

        function createClass(userId, clazz) {
            return $http.post("/api/project/class", clazz);
        }
    }
})();
