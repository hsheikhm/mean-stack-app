angular.module('MainCtrl', []).controller('MainController', ['$scope', 'Nerd',
  function($scope, Nerd){

    $scope.tagline = "To the moon and back!";
    $scope.data = {};

    $scope.selectNerd = function(nerd){
      $scope.selectedNerd = nerd;
    };

    $scope.showForm = function(nerd){
      return nerd === $scope.selectedNerd;
    };

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
          console.log('Error ' + err);
        });
    };

    $scope.deleteNerd = function(nerd){
      Nerd.delete(nerd._id)
        .success(function(response){
          $scope.allNerds = response.data;
          console.log(response.message);
        })
        .error(function(err){
          console.log('Error: ' + err);
        });
    };

    $scope.updateNerd = function(nerd){
      Nerd.update(nerd._id, { name: $scope.data.newName })
        .success(function(response){
          $scope.data.newName = "";
          $scope.showForm(false);
          $scope.allNerds = response.data;
          console.log(response.message);
        })
        .error(function(err){
          console.log('Error: ' + err);
        });
    };

}]);
