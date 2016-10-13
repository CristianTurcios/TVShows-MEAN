var saveTvShowsController = function ($scope,$http,$routeParams) {
    $scope.request = {};
    $scope.TvShowId = $routeParams.id;
    $scope.TypeMessage ="";
    $scope.showMessage="";
    $scope.message="";

    $scope.saveTvShows = saveTvShows;
    $scope.defineAction = defineAction;

    getTvShowsById($scope.TvShowId);


    function defineAction(request,TvShows,TvShowId)
    {
        if (!TvShows.$valid) {
            console.log("Form invalid");
            return false;
        }

        if(TvShowId == -1)
            saveTvShows(request,TvShows);

        else     
            if(TvShowId != -1)
                updateTvShows(request,TvShows,TvShowId);

    }

    function getTvShowsById(TvShowId) {

        if(TvShowId!= -1)
        {
            $http.get('/api/getListTvShows/'+TvShowId).success(function (resp) {
                $scope.request= resp;
            }).error(function (resp) {
                console.log("Error " + resp);
            });
        }
    }

    function saveTvShows(request,TvShows) {
        // when landing on the page, get all todos and show them

        $http.post('/api/saveTvShows',request)
            .success(function (data) {
            $scope.request = {};
            TvShows.$setPristine();
            TvShows.$setUntouched();

            $scope.TypeMessage ="alert alert-success";
            $scope.showMessage ="show";
            $scope.message="Success! Tv Show stored in the system";
        })
            .error(function (data) {
            $scope.showMessage= "show";
            $scope.TypeMessage ="alert alert-warning";
            $scope.message="Error! Could not stored the TV Show";
        });
    }

    function updateTvShows(request,TvShows,TvShowId) {
        // when landing on the page, get all todos and show them
        $http.put('/api/updateTvShows/'+TvShowId,request)
            .success(function (data) {
            $scope.request = {};
            TvShows.$setPristine();
            TvShows.$setUntouched();
            $scope.TypeMessage ="alert alert-success";
            $scope.showMessage ="show";
            $scope.message="Success! Tv Show updated in the system";
        })
            .error(function (data) {
            $scope.showMessage= "show";
            $scope.TypeMessage ="alert alert-warning";
            $scope.message="Error! Could not updated the TV Show";
        });
    }
}

saveTvShowsController.$inject = ['$scope','$http','$routeParams'];