var JSDictionary = angular.module("JSDictionary", ["ngRoute", "ngSanitize"]);

JSDictionary.config(function ($routeProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "app/template/JSDictionary.html",
            controller: "JSDictionaryMainCtrl"
        });


});

JSDictionary.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

JSDictionary.controller("JSDictionaryMainCtrl", ["$scope", "$location", "$log", "$http", "$sce", function ($scope, $location, $log, $http, $sce) {
    var JSDictionary = (function () {
        var JSDictionary = {};

        JSDictionary.init = function () {
            JSDictionary.getLocalData();
        };

        JSDictionary.loadData = function () {
            $.ajax({
                url: './data/JSDictionary.json',
                method: "post",
                async: false,
                success: function (response) {
                    response = (typeof response === "object") ? response : JSON.parse(response);
                    JSDictionary.Data = response.JSDictionary;
                    localStorage.Data = JSON.stringify(JSDictionary.Data);
                }
            });
        };

        JSDictionary.getLocalData = function () {
            if (localStorage.Data) {
                return JSON.parse(localStorage.Data);
            } else {
                JSDictionary.loadData();
            }
        };

        JSDictionary.openDB = function () {
            return openDatabase(JSDictionaryConfig.DBName, '1.0', JSDictionaryConfig.DBDescription, JSDictionaryConfig.DBSize);
        };

        JSDictionary.insertAKeyword = function (KeywordArray) {

        };

        return JSDictionary;
    })();

    $scope.JSDictionary = JSDictionary.init();

    $scope.searchTheKeyWord = function (self) {
        var searchKeyword = self.search_keyword.toLowerCase();
        var tempData;
        var searchCnt;

        if (searchKeyword.length) {
            tempData = JSDictionary.getLocalData();
            searchCnt = 0;

            $.each(tempData, function (index, KeyWord) {
                if (KeyWord.JSKeyword.toLocaleLowerCase().search(searchKeyword) != -1) {
                    $scope.syntax = $sce.trustAsHtml(KeyWord.Syntax);
                    $scope.example = $sce.trustAsHtml(KeyWord.Example);
                    $scope.explanation = $sce.trustAsHtml(KeyWord.Explanation);
                    $scope.output = $sce.trustAsHtml(KeyWord.Output);
                    $('.search-result').show();
                    $('.no-result-found').hide();
                    searchCnt = searchCnt + 1;
                } else {

                }
            });

            if (searchCnt == 0) {
                $('.no-result-found').show();
                $('.search-result').hide();
            }
        } else {
            $('.search-result').hide();
        }
    };

    $scope.KeywordClickHandler = function (self) {
        console.log("Test");
        //$('#search_keyword').val($(this).html()).trigger('click');
    };

}]);

var JSLib = (function () {

    var JSLib = {};

    JSLib.ScrollManager = function () {
        if (document.body.scrollTop >= 100) {
            $('header').parent().parent().css({position: "fixed", zIndex: 99, width: "100%"});
        } else {
            $('header').parent().parent().css({position: "relative", zIndex: 0});
        }
    };


    return JSLib;
})();

$('.highELE').on('click', function () {
    /*console.log("Hi: " + $(this).html());*/
    $('#search_keyword').val($(this).html()).trigger('click');
});
