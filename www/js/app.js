// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module("starter", ["ionic","nvd3", 'chart.js'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider, ChartJsProvider){
  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab' : {
          templateUrl: 'templates/home.html'
        }
      } 
    })

    .state('tabs.list', {
      url: '/list',
      views: {
        'list-tab' : {
          templateUrl: 'templates/list.html',
          controller: 'ListController'
        }
      } 
    })

    .state('tabs.detail', {
      url: '/list/:aId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/detail.html',
          controller: 'ListController'
        }
      } 
    })

    .state('tabs.topMusic', {
      url: '/topMusic',
      views: {
        'topMusic-tab' : {
          templateUrl: 'templates/topMusic.html',
          controller: 'TopMusicController'
        }
      } 
    })

    $urlRouterProvider.otherwise('/tab/home');

    ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });

})




.controller('TopMusicController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
      $http.get('js/data.json').success(function(data) {
      $scope.topMusic = data.topMusic;


      $scope.doRefresh =function() {
      $http.get('js/data.json').success(function(data) {
          $scope.topMusic = data.topMusic;
          $scope.$broadcast('scroll.refreshComplete');
        });
      }
      
       function totalData(data){
        var total = 0;
        for(var k =0;k<data.length-1;k++){
            total += data[k];
          }
          return total;
          }
      function add(a, b) {
          return a + b;
      }


    var musics = data.musics;
    var musicsTitle = [];
    var totalDownloads = [];
    var downloadData = [];
    var totalSales = [];
    var salesData = [];
    var rateVal = [];

    for(var a =0;a<musics.length;a++){
      musicsTitle.push(musics[a].name);
      totalDownloads.push(musics[a].downloads.downloadsValue);
      totalSales.push(musics[a].sales.salesValue);
      rateVal.push(musics[a].rates.ratesValue);
    }
    if(totalDownloads){
      var data = [];
      for(var i in totalDownloads){
        downloadData[i] = totalData(totalDownloads[i])
        data.push({
          name: musicsTitle[i],
          downloads:downloadData[i]
        })      
      } 
       $scope.topDownloadList = data;
    }
      if(totalSales){
      var data = [];
      for(var i in totalSales){
        salesData[i] = totalData(totalSales[i])
        data.push({
                name: musicsTitle[i],
                sales:salesData[i]
              })      
      }  
       data.sort(function(a, b) {
        return parseFloat(a.sales) - parseFloat(b.sales);
        });
      $scope.topSalesList = data;
    }
    // $scope.colors = [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];
    $scope.Years = [2013,2014,2015,2016,2017];
    $scope.totalYears = [2013,2014,2015,2016,2017,"2013-2017"];
    $scope.downloadSelectedYear = $scope.totalYears[5];
    $scope.salesSelectedYear = $scope.totalYears[5];

    $scope.downloadChangeYear = function(item) {
      $scope.downloadSelectedYear = item;
      var data = [];  
          
      switch(item){
        case 2013:
          for(var i=0;i<downloadData.length;i++){
              downloadData[i] = totalDownloads[i][0];
              data.push({
                name: musicsTitle[i],
                downloads:downloadData[i]
              })
          }
               data.sort(function(a, b) {
                return parseFloat(a.downloads) - parseFloat(b.downloads);
              });
               $scope.topDownloadList = data;
        break;
        case 2014:
          for(var i=0;i<downloadData.length;i++){
              downloadData[i] = totalDownloads[i][1];
              data.push({
                name: musicsTitle[i],
                downloads:downloadData[i]
              })
          }
               data.sort(function(a, b) {
                return parseFloat(a.downloads) - parseFloat(b.downloads);
              });
               $scope.topDownloadList = data;
          break;
        case 2015:
          console.log("2015: ",totalDownloads)
          for(var i=0;i<downloadData.length;i++){
              downloadData[i] = totalDownloads[i][2];
              data.push({
                name: musicsTitle[i],
                downloads:downloadData[i]
              })
          }
               data.sort(function(a, b) {
                return parseFloat(a.downloads) - parseFloat(b.downloads);
              });
               $scope.topDownloadList = data;
          break;
        case 2016:
          console.log("2016: ",totalDownloads)
          for(var i=0;i<downloadData.length;i++){
              downloadData[i] = totalDownloads[i][3];
              data.push({
                name: musicsTitle[i],
                downloads:downloadData[i]
              })
          }
               data.sort(function(a, b) {
                return parseFloat(a.downloads) - parseFloat(b.downloads);
              });
               $scope.topDownloadList = data;
          break;
        case 2017:
          for(var i=0;i<downloadData.length;i++){
              downloadData[i] = totalDownloads[i][4];
              data.push({
                name: musicsTitle[i],
                downloads:downloadData[i]
              })
          }
               data.sort(function(a, b) {
                return parseFloat(a.downloads) - parseFloat(b.downloads);
              });
               $scope.topDownloadList = data;
          break;
        case "2013-2017":
            for(var i=0;i<downloadData.length;i++){
              downloadData[i] = totalData(totalDownloads[i])
              data.push({
                name: musicsTitle[i],
                downloads:downloadData[i]
              })
              }
               data.sort(function(a, b) {
                return parseFloat(a.downloads) - parseFloat(b.downloads);
              });
              $scope.topDownloadList = data;
          break;
        }
    }
    $scope.salesChangeYear = function(item) {
      $scope.salesSelectedYear = item;
      var data = [];  
          
      switch(item){
        case 2013:
          for(var i=0;i<salesData.length;i++){
              salesData[i] = totalSales[i][0];
              data.push({
                name: musicsTitle[i],
                sales:salesData[i]
              })
          }
               data.sort(function(a, b) {
                return parseFloat(a.sales) - parseFloat(b.sales);
              });
               $scope.topSalesList = data;
        break;
        case 2014:
          for(var i=0;i<salesData.length;i++){
              salesData[i] = totalSales[i][1];
              data.push({
                name: musicsTitle[i],
                sales:salesData[i]
              })
          }
               data.sort(function(a, b) {
                return parseFloat(a.sales) - parseFloat(b.sales);
              });
               $scope.topSalesList = data;
          break;
        case 2015:
          console.log("2015: ",totalSales)
          for(var i=0;i<salesData.length;i++){
              salesData[i] = totalSales[i][2];
              data.push({
                name: musicsTitle[i],
                sales:salesData[i]
              })
          }
               data.sort(function(a, b) {
                return parseFloat(a.sales) - parseFloat(b.sales);
              });
               $scope.topSalesList = data;
          break;
        case 2016:
          console.log("2016: ",totalSales)
          for(var i=0;i<salesData.length;i++){
              salesData[i] = totalSales[i][3];
              data.push({
                name: musicsTitle[i],
                sales:salesData[i]
              })
          }
               data.sort(function(a, b) {
                return parseFloat(a.sales) - parseFloat(b.sales);
              });
               $scope.topSalesList = data;
          break;
        case 2017:
          for(var i=0;i<salesData.length;i++){
              salesData[i] = totalSales[i][4];
              data.push({
                name: musicsTitle[i],
                sales:salesData[i]
              })
          }
               data.sort(function(a, b) {
                return parseFloat(a.downloads) - parseFloat(b.downloads);
              });
               $scope.topSalesList = data;
          break;
        case "2013-2017":
            for(var i=0;i<salesData.length;i++){
              salesData[i] = totalData(totalSales[i])
              data.push({
                name: musicsTitle[i],
                sales:salesData[i]
              })
              }
               data.sort(function(a, b) {
                return parseFloat(a.sales) - parseFloat(b.sales);
              });
              $scope.topSalesList = data;
          break;
        }
    }  
    $scope.downloadData = downloadData;
    $scope.salesData = salesData;
    $scope.musicTitle = musicsTitle;
    $scope.rateVal = rateVal;
    $scope.musics = musics;
    $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.onClick = function (points, evt) {
    console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          }
        ]
      }
    }
    $scope.toggleDownload = {
      show : true
    }
    $scope.toggleRates = {
      show : false
    }
    $scope.toggleSales = {
      show : false
    }
    $scope.chartSalesType = 'polarArea';

    $scope.toggleSalesChart = function () {
      $scope.chartSalesType = $scope.chartSalesType === 'polarArea' ?
        'pie' : 'polarArea';
    };

    });
}])


.controller('ListController', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $http.get('js/data.json').success(function(data){
    var musicsList = []
    $scope.musics = data.musics;
    console.log($scope.musics)
    $scope.whichartist=$state.params.aId;
    $scope.data = { showReorder: false  };

    function sum(a, b) {
    return a + b;
  } 

    $scope.musicsList = musicsList;
    var downloadsValue = [];

    $scope.totalData = function(data){
        var total = 0;
        for(var k =0;k<data.length;k++){
            total += data[k];
          }
          return total;
    }

    $scope.doRefresh = function(){
      $http.get('js/data.json').success(function(data){
         $scope.musics = data.musics;
         $scope.$broadcast('scroll.refreshComplete');
      });
    }

  
    $scope.moveItem = function(item, fromIndex, toIndex) {
      $scope.musics.splice(fromIndex, 1);
      $scope.musics.splice(toIndex, 0, item);
    };


  });
}]);