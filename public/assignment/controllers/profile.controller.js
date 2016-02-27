/**
 * Created by Jun Cai on 2/13/2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, $rootScope, $location, UserService) {
        $scope.error = null;
        $scope.message = null;
        $scope.currentUser = UserService.getCurrentUser();

        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $scope.update = update;

        function update(user) {
            UserService.updateUser($scope.currentUser._id, user, updateCallback);
        }

        function updateCallback(user) {
            $scope.error = null;
            $scope.message = null;

            if (user) {
                $scope.currentUser = user;
                $scope.message = "Update successfully.";
                UserService.setCurrentUser($scope.currentUser);
            } else {
                $scope.message = "Update failed";
            }
        }
    }
})();
