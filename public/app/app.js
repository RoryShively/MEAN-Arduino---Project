var app = angular.module('myApp', ['ngRoute', 'ngMaterial', 'btford.socket-io']);

//ROUTES

app.config(function ($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })

    .when('/gradients', {
        templateUrl: 'pages/gradients.html',
        controller: 'gradientContoller'
    })

});


//FACTORIES

app.factory('mySocket', function (socketFactory) {
    return socketFactory();
});

//CONTROLLERS

app.controller('homeController', function ($scope) {

    $scope.title = 'Swatches';

});

app.controller('gradientContoller', function ($scope) {

    $scope.title = 'Gradients';

})

app.controller('ArduController', function ($scope, mySocket) {

    $scope.swatches = [
    {
        'red': 255,
        'green': 0,
        'blue': 0,
        'name': 'Red'
    },
    {
        'red': 0,
        'green': 255,
        'blue': 0,
        'name': 'Green'
    },
    {
        'red': 0,
        'green': 0,
        'blue': 255,
        'name': 'Blue'
    }
    ];

    console.log($scope.swatches);

    $scope.getSwatchCount = function () {
        return $scope.swatches.length;
    };

    $scope.color = {
        'red': Math.floor(Math.random() * 255),
        'green': Math.floor(Math.random() * 255),
        'blue': Math.floor(Math.random() * 255),
        'name': ''
    };

    $scope.addColor = function () {
        $scope.swatches.unshift({  'red': $scope.color.red,
                                'green': $scope.color.green,
                                'blue': $scope.color.blue,
                                'name': $scope.color.name
                            });
        $scope.color.name = "";
    };

    $scope.applyColor = function (swatch) {
        $scope.color.red = swatch.red;
        $scope.color.green = swatch.green;
        $scope.color.blue = swatch.blue;
    };

    $scope.deleteColor = function (index) {
        $scope.swatches.splice(index, 1);
    };


    $scope.$watch('color.red', function () {

        // mySocket.emit('');
        console.log('RGB(' + $scope.color.red + ', ' + $scope.color.green + ', ' + $scope.color.blue + ')');
        console.log(rgbToHex($scope.color.red, $scope.color.green, $scope.color.blue));
        mySocket.emit('led:colorChange', { 
            color: rgbToHex($scope.color.red, $scope.color.green, $scope.color.blue)
        });

    });
    $scope.$watch('color.green', function () {

        // mySocket.emit('');
        console.log('RGB(' + $scope.color.red + ', ' + $scope.color.green + ', ' + $scope.color.blue + ')');
        console.log(rgbToHex($scope.color.red, $scope.color.green, $scope.color.blue));
        mySocket.emit('led:colorChange', { 
            color: rgbToHex($scope.color.red, $scope.color.green, $scope.color.blue)
        });

    });
    $scope.$watch('color.blue', function () {

        // mySocket.emit('');
        console.log('RGB(' + $scope.color.red + ', ' + $scope.color.green + ', ' + $scope.color.blue + ')');
        console.log(rgbToHex($scope.color.red, $scope.color.green, $scope.color.blue));
        mySocket.emit('led:colorChange', { 
            color: rgbToHex($scope.color.red, $scope.color.green, $scope.color.blue)
        });

    });

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    $scope.ledOn = function () {

        mySocket.emit('led:on');
        console.log('LED ON');
    };


    $scope.ledOff = function () {

        mySocket.emit('led:off');
        console.log('LED OFF');  
    };    


});