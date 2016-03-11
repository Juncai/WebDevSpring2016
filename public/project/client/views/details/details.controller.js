/**
 * Created by jonca on 3/10/2016.
 */
(function(){
    angular
        .module("QuizZ")
        .controller("DetailsController", detailsController);

    function detailsController($scope,
                               $routeParams,
                               SchoolService,
                               $rootScope,
                               $location,
                               ClassService
    ) {
        var schoolID = $routeParams.schoolID;
        var currentUser = $rootScope.currentUser;
        //$scope.favorite = favorite;

        function init() {
            $scope.data = SchoolService.findSchoolByID(schoolID);
            $scope.classes = ClassService.findClassBySchoolID(schoolID);
            //SchoolService
            //    .findSchoolByID(schoolID)
            //    .then(function(response){
            //        $scope.data = response;
            //    });

            //ClassService
            //    .findUserLikes (imdbID)
            //    .then(function(response){
            //        $scope.movie = response.data;
            //    });
        }
        init();

        //function favorite(movie) {
        //    if(currentUser) {
        //        ClassService
        //            .userLikesMovie(currentUser._id, movie);
        //    } else {
        //        $location.url("/login");
        //    }
        //}
    }
})();