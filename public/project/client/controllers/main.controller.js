"use strict";
/**
 * Created by Phoenix on 2/13/2016.
 */

(function() {
    angular
        .module("QuizZ")
        .controller("MainController", mainController);

    function mainController($scope, $location) {
        $scope.$location = $location;
    }
})();