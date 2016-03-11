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
            .when("/newClass", {
                templateUrl: "views/class/newClass.view.html",
                controller: "NewClassController"
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
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/details/:schoolID", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController"
            })
            .when("/user", {
                templateUrl: "views/user/user.view.html",
                controller: "UserController"
            })
            .when("/quiz", {
                templateUrl: "views/quiz/quiz.view.html",
                controller: "QuizController"
            })
            .when("/card", {
                templateUrl: "views/card/card.view.html",
                controller: "CardController"
            })
            .when("/class", {
                templateUrl: "views/class/class.view.html",
                controller: "ClassController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
