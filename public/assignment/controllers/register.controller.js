/**
 * Created by Phoenix on 2/13/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($scope, $rootScope, $location, UserService) {
        $scope.register = register;


        function register() {
            var newUser = {};
            if ($scope.username == null) window.alert("Username is required");
            newUser.username = $scope.username;
            newUser.password = $scope.password;
            newUser.email = $scope["email"];
            UserService.createUser(
                newUser,
                function (user) {
                    console.log(user);
                    $rootScope.user = user;
                    $location.url("#/profile");
                });
        }
    }
})();