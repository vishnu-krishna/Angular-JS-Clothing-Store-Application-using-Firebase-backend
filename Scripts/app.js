var classfiedApp = angular.module("classfiedApplication", ["ngMaterial", "firebase"]);
//Classfied Controller
classfiedApp.controller("classfiedController", ['$scope', '$http', 'ClassifiedsFactory', '$mdSidenav', '$mdToast', '$mdDialog', function ($scope, $http, ClassifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
    /*ClassifiedsFactory.getClassifieds()
        .then(function (classifieds) {

            $scope.classifieds = classifieds.data;
            $scope.categories = getCategories($scope.classifieds);
        })*/
    $scope.classifieds = ClassifiedsFactory.ref;
    var contact = {
        name: "Vishnu Chander"
        , phone: "+91 999999999"
        , email: "vishnu@checking.com"
    }



    $scope.openSidebar = function () {
        $mdSidenav('left').open();
    }
    $scope.closeSidebar = function () {
        $mdSidenav('left').close();
    }

    function showToast(message) {
        $mdToast.show(
            $mdToast.simple()
            .content(message)
            .position('top', 'right')
            .hideDelay(3000)
        );
    }
    $scope.editClassfied = function (classfiedEditing, index) {
        $scope.editing = true;
        $scope.openSidebar();
        $scope.classified = classfiedEditing;
        $scope.fireClassified = $scope.classifieds.$getRecord(classfiedEditing.$id)
    }
    $scope.saveEdit = function () {
        $scope.classifieds.$save($scope.fireClassified).then(function () {
            $scope.editing = false;
            $scope.classified = {};
            $scope.closeSidebar();
            showToast("Editing Saved");
        });


    }
    $scope.deleteClassified = function (index, event, classified) {
        //Another way of finding Index
        /*var index = $scope.classifieds.indexOf(classified);*/
        var confirm = $mdDialog.confirm()
            .title("Are you sure you want to delete" + ' ' + classified.title + "?")
            .ok('Yes')
            .cancel('No')
            .targetEvent(event);
        $mdDialog.show(confirm).then(function () {
            //$scope.classifieds.splice(index, 1);
            $scope.classifieds.$remove(classified)
            showToast("Classified Deleted")
        }, function () {

        })

    }
    $scope.saveClassified = function (classified) {
        if (classified) {
            classified.contact = contact;
            //$scope.classifieds.push(classified);
            $scope.classifieds.$add(classified);

            $scope.classified = {};
            $scope.closeSidebar();
            showToast("New Content Saved");
        }

    }

    function getCategories(classifieds) {

        var categories = [];

        angular.forEach(classifieds, function (ad) {
            angular.forEach(ad.categories, function (category) {
                categories.push(category);
            });
        });

        return _.uniq(categories);
    }
    /*var data = [
        {
            "id": "1"
            , "title": "Stiped T-Shirt"
            , "description": "A Feel Good T-Shirt to Wear"
            , "price": 1299
            , "posted": "2015-10-24"
            , "contact": {
                "name": "John Doe"
                , "phone": "(555) 555-5555"
                , "email": "johndoe@gmail.com"
            }
            , "categories": [
         "Vehicles"












                
                , "Parts and Accessories"
      ]
            , "image": "http://static4.jassets.com/p/United-Colors-of-Benetton-Blue-Striped-Polo-T-Shirt-3902-0315881-1-pdp_slider_l.jpg"
            , "views": 213
   }












        
        , {
            "id": "2"
            , "title": "Solid Navy Color T-Shirt"
            , "description": "A Feel Good T-Shirt to Wear."
            , "price": "699 "
            , "posted": "2015-10-28"
            , "contact": {
                "name": "Jane Doe"
                , "phone": "(555) 555-5555"
                , "email": "janedoe@gmail.com"
            }
            , "categories": [
         "Clothing"
      ]
            , "image": "http://static3.jassets.com/p/Celio-Pink-Solid-Polo-T-Shirt-9889-8049712-1-pdp_slider_l.jpg"
            , "views": 422
   }












        
        , {
            "id": "3"
            , "title": "Cyan T-Shirt"
            , "description": "Good condition."
            , "price": "599 "
            , "posted": "2015-10-27"
            , "contact": {
                "name": "Jane Doe"
                , "phone": "(555) 555-5555"
                , "email": "janedoe@gmail.com"
            }
            , "categories": [
         "Furniture"
      ]
            , "image": "../images/Shirt 3.jpg"
            , "views": 23
   }












        
        , {
            "id": "4"
            , "title": "Navy Blue T-Shirt"
            , "description": "Feel Good T-Shirt"
            , "price": "250 "
            , "posted": "2015-11-01"
            , "contact": {
                "name": "John Doe"
                , "phone": "(555) 555-5555"
                , "email": "johndoe@gmail.com"
            }
            , "categories": [
         "Furniture"
      ]
            , "image": "http://static4.jassets.com/p/United-Colors-of-Benetton-Blue-Printed-Polo-T-Shirt-2617-9005881-1-pdp_slider_l.jpg"
            , "views": 77
   }












        
        , {
            "id": "5"
            , "title": "Blue-Red T-Shirt"
            , "description": "Wonderful T-Shirt"
            , "price": "1150 "
            , "posted": "2015-11-02"
            , "contact": {
                "name": "John Doe"
                , "phone": "(555) 555-5555"
                , "email": "johndoe@gmail.com"
            }
            , "categories": [
         "Electronics"












                
                , "Computer Parts and Accessories"
      ]
            , "image": "http://static3.jassets.com/p/U-S--Polo-Assn--Navy-Blue-Solid-Regular-Fit-Polo-T-Shirt-3641-8723212-1-pdp_slider_l.jpg"
            , "views": 889
   }












        
        , {
            "id": "6"
            , "title": "Grey T-Shirt"
            , "description": "Lovely T-Shirt."
            , "price": "4800 "
            , "posted": "2015-11-03"
            , "contact": {
                "name": "John Doe"
                , "phone": "(555) 555-5555"
                , "email": "johndoe@gmail.com"
            }
            , "categories": [
         "Vehicles"












                
                , "Cars"
      ]
            , "image": "http://static3.jassets.com/p/U-S--Polo-Assn--Multicoloured-Striped-Regular-Fit-Polo-T-Shirt-0774-0823212-1-pdp_slider_l.jpg"
            , "views": 423
   }
]
    var firebase = ClassifiedsFactory.ref;
    angular.forEach(data, function (item) {
        firebase.$add(item);
    })*/

}]);

//Configuration
classfiedApp.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme("default")
        .primaryPalette('pink')
        .accentPalette('orange');


});

//Factories
classfiedApp.factory("ClassifiedsFactory", function ($http, $firebaseArray) {


    function getClassfieds() {
        return $http.get('../Data/Classified.JSON');
    }
    var ref = new Firebase('https://clothingstore.firebaseio.com');

    return {
        //getClassifieds: getClassfieds
        ref: $firebaseArray(ref)
    }
});