// var app = angular.module('AppRecommender', ['ngResource']);
var app = angular.module('AppRecommender', []);


// angular.module{
//   toggle: function() {
//     console.log("toggled");
//   },
// };

function ImageCtrl($scope) {
  // Image = $resource("/images/:id.json", {id: "@id"});
  // $scope.images = Image.query();
  $scope.images = angular.element('#images').data('images');
  $scope.selectedImages = {};

  $scope.swap = function () {
    var key = this.image.id;
    // var getClass = ;

    if (this.class !== "selected") {
      this.class = "selected";
      $scope.selectedImages[key] = this.image;
      // console.log(getClass);
    } else {
      this.class = "";
      delete $scope.selectedImages[key];
    };

  };

};
