angular.module('MainCtrl', []).controller('MainController', ['$scope', 'Nerd',
  function($scope, Nerd){

    $scope.tagline = "To the moon and back!";

    Nerd.get()
      .success(function(data){
        $scope.allNerds = data;
      })
      .error(function(err){
        console.log('Error: ' + err );
      });

    $scope.newNerd = function(){
      Nerd.create({
        name: $scope.nerdName
      })
        .success(function(response){
          $scope.nerdName = "";
          $scope.allNerds = response.data;
          console.log(response.message);
        })
        .error(function(err){
          console.log("Error " + err);
        });
    };

}]);
