"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */

(function () {
    angular
        .module("QuizZ")
        .controller("ClassDetailController", classDetailController);

    function classDetailController($scope, $location) {
        var classData =
        {
            "_id": 123, "name": "Class 01", "schoolID": 123, "created": "2016-03-05 12:00.00",
            "students": [234, 456], "teacher": 567, "quizList": [123, 234]
        };
        $scope.message = null;
        $scope.currentClass = classData;
        $scope.backToList = backToList;

        function backToList() {
            $location.url("/classList");
        }
    }
})();
