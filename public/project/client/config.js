/**
 * Created by Jun Cai on 2/22/2016.
 */

(function () {
    angular
        .module("QuizZ")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/user", {
                templateUrl: "views/user/user.view.html",
                controller: "UserController"
            })
            .when("/fields", {
                templateUrl: "views/forms/fields.view.html"
            })
            .when("/quizDetail", {
                templateUrl: "views/quiz/quizDetail.view.html",
                controller: "QuizDetailController"
            })
            .when("/quizList", {
                templateUrl: "views/quiz/quizList.view.html",
                controller: "QuizListController"
            })
            .when("/classDetail", {
                templateUrl: "views/class/classDetail.view.html",
                controller: "ClassDetailController"
            })
            .when("/classList", {
                templateUrl: "views/class/classList.view.html",
                controller: "ClassListController"
            })
            .when("/performance", {
                templateUrl: "views/performance/performance.view.html",
                controller: "PerformanceController"
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
                templateUrl: "views/login/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController"
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
