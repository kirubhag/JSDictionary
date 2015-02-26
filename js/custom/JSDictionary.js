var JSDictionary = angular.module("JSDictionary", ["ngRoute", "ngSanitize"]);

JSDictionary.config(function ($routeProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "app/template/JSDictionary.html",
            controller: "JSDictionaryMainCtrl"
        })
        .when("/settings", {
            templateUrl: "app/template/Settings.html",
            controller: "SettingsCtrl"
        })
        .when("/settings/contributors", {
            templateUrl: "app/template/Contributors.html",
            controller: "ContributorsCtrl"
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

JSDictionary.controller("SettingsCtrl", ["$scope", "$location", "$log", "$http", "$sce", function ($scope, $location, $log, $http, $sce) {

    var SettingsCtrl = (function () {
        var SettingsCtrl = {};

        SettingsCtrl.getNumberOfKeyWordsCnt = function () {
            return (localStorage.Data) ? JSON.parse(localStorage.Data).length : 0;
        };

        SettingsCtrl.clearCache = function () {
            localStorage.clear();
            $scope.total_num_keywords = SettingsCtrl.getNumberOfKeyWordsCnt();
        };

        SettingsCtrl.goToContributors = function () {
            window.location.hash = "/settings/contributors";
        };

        return SettingsCtrl;
    })();

    $scope.total_num_keywords = SettingsCtrl.getNumberOfKeyWordsCnt();
    $scope.getNumberOfKeyWordsCnt = SettingsCtrl.getNumberOfKeyWordsCnt();

    $scope.clearCache = function () {
        SettingsCtrl.clearCache();
    };

    $scope.goToContributors = function () {
        SettingsCtrl.goToContributors();
    };
}]);

JSDictionary.controller("ContributorsCtrl", ["$scope", "$location", "$log", "$http", "$sce", function ($scope, $location, $log, $http, $sce) {

    var ContributorsCtrl = (function () {
        var ContributorsCtrl = {};

        ContributorsCtrl.list = [
            {
                "name": "Bala Andrew",
                "email": "sbalaandru@gmail.com",
                "color": 2,
                "privacy": 1,
                "visibile": true
            },
            {
                "name": "Kavitha A",
                "email": "dhivyafalconit@gmail.com",
                "color": 4,
                "privacy": 2,
                "visibile": true
            },
            {
                "name": "Kirubhakaran",
                "email": "kirubhag@gmail.com",
                "color": 1,
                "privacy": 1,
                "visibile": true
            },
            {
                "name": "Marikumar",
                "email": "marikumar07@gmail.com",
                "color": 2,
                "privacy": 1,
                "visibile": true
            },
            {
                "name": "Sudarsan Babu",
                "email": "sbgbabu@gmail.com",
                "color": 3,
                "privacy": 1,
                "visibile": true
            },
            {
                "name": "kannan",
                "email": "mailformekannan@gmail.com",
                "color": 4,
                "privacy": 1,
                "visibile": true
            },
            {
                "name": "Senthilkumar",
                "email": "senthilkumar151990@gmail.com",
                "color": 1,
                "privacy": 1,
                "visibile": true
            },
            {
                "name": "satheesh",
                "email": "satheeshpa91@gmail.com",
                "color": 3,
                "privacy": 1,
                "visibile": true
            },
            {
                "name": "Dhivya S",
                "email": "dhivyafalconit@gmail.com",
                "color": 4,
                "privacy": 2,
                "visibile": true
            },
            {
                "name": "Raji",
                "email": "raji@gmail.com",
                "color": 1,
                "privacy": 2,
                "visibile": false
            }
        ];

        ContributorsCtrl.goToSettings = function () {
            window.location.hash = "/settings";
        };

        ContributorsCtrl.getClassForContributor = function (classVal) {
            switch (parseInt(classVal)) {
                case 1:
                    return "bg-a";
                    break;
                case 2:
                    return "bg-b";
                    break;
                case 3:
                    return "bg-c";
                    break;
                case 4:
                    return "bg-d";
                    break;
            }
        };

        ContributorsCtrl.privacyMng = function (privacy) {
            return (parseInt(privacy) === 1) ? true : false;
        };

        ContributorsCtrl.clickToggle = function () {
            $('.contrib-box').on('click', function () {
                $(this).toggleClass("bg-click-imp");
                $(this).find('.user-snap').toggleClass("bg-w");
            });
        };

        return ContributorsCtrl;
    })();

    $scope.Contributors = ContributorsCtrl.list;

    $scope.goToSettings = function () {
        ContributorsCtrl.goToSettings();
    };

    $scope.getClassForContributor = function (classVal) {
        return ContributorsCtrl.getClassForContributor(classVal);
    };

    $scope.privacyMng = function (privacy) {
        return ContributorsCtrl.privacyMng(privacy);
    };

    $scope.clickToggle = function () {
        return ContributorsCtrl.clickToggle();
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
