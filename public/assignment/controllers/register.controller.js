/**
 * Created by Jun Cai on 2/13/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($scope, $rootScope, $location, UserService) {
        $scope.message = null;
        $scope.register = register;

        function register(user) {
            $scope.message = null;
            if (user == null) {
                $scope.message = "Invalid information input.";
                return;
            }
            if (!user.username) {
                $scope.message = "Username is required.";
                return;
            }
            if (!user.password || !user.veryfyPassword) {
                $scope.message = "Password is required.";
                return;
            }
            if (user.veryfyPassword != user.password) {
                $scope.message = "Passwords don't match.";
                return;
            }
            if (!user.email) {
                $scope.message = "Email is required.";
                return;
            }
            var userWithSameUsername = UserService.findUserByUsername(user.username);
            if (userWithSameUsername != null) {
                $scope.message = "Existing username.";
                return;
            }
            var newUser = UserService.createUser(user);
            UserService.setCurrentUser(newUser);
            $location.url("/profile");
        }
    }
})();