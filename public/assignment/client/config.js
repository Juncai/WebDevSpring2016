/**
 * Created by Jun Cai on 2/22/2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkAdmin
                }

            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldController",
                controllerAs: "model"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model"
            })
            .when("/header", {
                templateUrl: "views/header/header.view.html",
                controller: "HeaderController"
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/sidebar", {
                templateUrl: "views/sidebar/sidebar.view.html",
                controller: "SidebarController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkAdmin = function ($q, $timeout, $http, $location, $rootScope, UserService) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1) {
                UserService.setCurrentUser(user);
                deferred.resolve();
            } else {
                deferred.reject();
                $location.url('/home');
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope, UserService) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                UserService.setCurrentUser(user);
                deferred.resolve();
            }
            // User is Not Authenticated
            else {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function ($q, $timeout, $http, $location, $rootScope, UserService) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                UserService.setCurrentUser(user);
            }
            deferred.resolve();
        });

        return deferred.promise;
    };
})();
