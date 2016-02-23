/**
 * Created by jonca on 2/22/2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/fields", {
                templateUrl: "views/forms/fields.view.html"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html"
            })
            .when("/header", {
                templateUrl: "views/header/header.view.html",
                controller: "HeaderController"
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/sidebar", {
                templateUrl: "views/sidebar/sidebar.view.html",
                controller: "SidebarController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .otherwise({
                redirectTo: "views/home/home.view.html"
            });
    }
})();
