/**
 * Created by Phoenix on 2/13/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", sidebarController);

    function sidebarController($scope, $location) {
        $scope.$location = $location;
    }
})();