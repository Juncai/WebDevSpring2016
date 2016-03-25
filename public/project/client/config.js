/**
 * Created by Jun Cai on 2/22/2016.
 */

(function () {
    angular
        .module("QuizZ")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/quizDetail", {
                templateUrl: "views/quiz/quizDetail.view.html",
                controller: "QuizDetailController",
                controllerAs: "model"
            })
            .when("/quizList", {
                templateUrl: "views/quiz/quizList.view.html",
                controller: "QuizListController",
                controllerAs: "model"
            })
            .when("/classDetail/:classId", {
                templateUrl: "views/class/classDetail.view.html",
                controller: "ClassDetailController",
                controllerAs: "model"
            })
            .when("/classList", {
                templateUrl: "views/class/classList.view.html",
                controller: "ClassListController",
                controllerAs: "model"
            })
            .when("/performance", {
                templateUrl: "views/performance/performance.view.html",
                controller: "PerformanceController",
                controllerAs: "model"
            })
            .when("/header", {
                templateUrl: "views/header/header.view.html",
                controller: "HeaderController",
                controllerAs: "model"
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/sidebar", {
                templateUrl: "views/sidebar/sidebar.view.html",
                controller: "SidebarController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/details/:schoolId", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/user.view.html",
                controller: "UserController"
            })
            .when("/quiz/:quizId", {
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
