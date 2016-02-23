/**
 * Created by Phoenix on 2/13/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", headerController);

    function headerController($scope, $location) {
        $scope.$location = $location;
    }
})();