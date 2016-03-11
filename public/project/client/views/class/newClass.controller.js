"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */
(function () {
    angular
        .module("QuizZ")
        .controller("NewClassController", newClassController);

    function newClassController($scope, $location) {
        $scope.message = null;
        $scope.create = create;

        function create(newClass) {
            $scope.message = null;
            $location.url("/classList");
        }
    }
})();