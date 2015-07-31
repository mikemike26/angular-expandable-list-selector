angular.module('sample-app').controller('sampleCtrl', function($scope, sampleData) {
  console.log(sampleData);
  $scope.data = sampleData;
});