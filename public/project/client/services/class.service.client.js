"use strict";
/**
 * Created by Jun Cai on 2/22/2016.
 */
(function () {
    angular
        .module("QuizZ")
        .factory("ClassService", classService);

    function classService($rootScope) {
        var model = {
            classes: [
                {
                    "_id": 123, "name": "Class 01", "schoolID": 123, "created": "2016-03-05 12:00.00",
                    "students": [234, 456], "teacher": 567, "quizList": [123, 234]
                },
                {
                    "_id": 234, "name": "Class 02", "schoolID": 123, "created": "2016-03-05 12:00.00",
                    "students": [234, 456], "teacher": 567, "quizList": [123, 234]
                },
                {
                    "_id": 345, "name": "Class 03", "schoolID": 234, "created": "2016-03-05 12:00.00",
                    "students": [234, 456], "teacher": 567, "quizList": [123, 234]
                },
                {
                    "_id": 456, "name": "Class 04", "schoolID": 234, "created": "2016-03-05 12:00.00",
                    "students": [234, 456], "teacher": 567, "quizList": [123, 234]
                }
            ],


            findClassBySchoolID: findClassBySchoolID
        };
        return model;

        function findClassBySchoolID(id) {
            // dummy function for demo purpose
            return model.classes;
        }
    }
})();
