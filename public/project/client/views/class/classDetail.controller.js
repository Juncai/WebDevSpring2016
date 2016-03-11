"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */

(function () {
    angular
        .module("QuizZ")
        .controller("ClassDetailController", classDetailController);

    function classDetailController($scope, $location, ClassService) {

        $scope.message = null;
        $scope.currentClass = ClassService.classes[0];
        $scope.backToList = backToList;

        function backToList() {
            $location.url("/classList");
        }
    }
})();
