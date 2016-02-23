/**
 * Created by Phoenix on 2/13/2016.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .controller("MainController", mainController);

    function mainController($scope, $location) {
        $scope.$location = $location;
    }
})();