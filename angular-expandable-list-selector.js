// ---- Angular Expandable List Selector ----

// Copyright (c) 2015 Michael Rensel <rensel.michael@gmail.com>
// Licensed under the MIT Software License

angular.module('list-selector', []);

var listTemplate = '<div><ul><li ng-repeat="product in products"><div expand-list-recurse="product"></div></li></ul></div>';

angular.module('list-selector').directive('expandList', function() {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        selection: "=",
        data: "=expandList"
      },
      template: listTemplate,
      controller: ['$scope', function($scope) {
        var setCallback = function() {
          var thisCallback;
          return {
            setItem: function (thisItem) {
              thisCallback(thisItem);
            },
            setModel: function(callback) {
              thisCallback = callback;
            }
          }
        };
        this.reset = function(id) {
          $scope.$broadcast('reset:list', id);
        };
        this.updateModel = setCallback();
      }],
      require: "expandList",
      link: function (scope, element, attrs, ctrl) {
        scope.products = scope.data;
        ctrl.updateModel.setModel(function(item) {
          scope.selection = item;
        });
        scope.$on('reset:selection', function(e, id) {
          scope.$broadcast('reset:allSelected', id);
        });
        scope.$on('select:branch', function() {
          scope.$broadcast('reset:list');
        });
      }
    }
  });


angular.module('list-selector').directive('expandListRecurse',['$compile', '$timeout',
  function($compile, $timeout) {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        thisProduct: "=expandListRecurse"
      },
      require: "^expandList",
      template: '<div class="product-section"><p ng-class="{\'selected-section\': showSelect, \'select-product\': selectThis}" ng-click="selectProduct(thisProduct)">{{thisProduct.value}}</p></div>',
      link: function (scope, element, attrs, ctrl) {
        var selected = false, saveThis = false, thisCallback = function() {}, hasList = false, timer, timer2;
        var removeList = function() {
              scope.expandBase = true;
              scope.showSelect = false;
              //expand and expandBase are required for animations, they set max-heights to enable
              //css transitions on open and close, but are removed to allow parents to expand with children
              scope.expand = {
                //need to include amount of padding and border from _priceCapture.scss
                'max-height': ($(element).find("> .recurse-wrapper .id-"+scope.thisProduct.id).height())+'px'
              };
              timer = $timeout(function() {
                scope.expand = {};
              }, 100);
              timer2 = $timeout(function() {
                scope.expandBase = false;
                $(element).find('.recurse-wrapper').remove();
              }, 500);
              hasList = false;
            },
            callback = function(callback) {
              return function() {
                callback();
                callback = function() {};
              }
            },
            closeSection = function() {
              scope.selectThis = false;
              scope.expandBase = true;
              scope.showSelect = false;
              selected = false;
              removeList();
            },
            upTree = function(thisProduct) {
              scope.expandBase = true;
              if(scope.$parent.$parent.thisProduct) {
                scope.$parent.$parent.expand = {
                  //need to include amount of padding and border from _priceCapture.scss
                  'max-height': ($(element).closest(".recurse-wrapper .id-"+scope.$parent.$parent.thisProduct.id).height()+24)+'px'
                };
                timer = $timeout(function() {
                  //when current item is toggled, showSelect on containing parent
                  scope.$parent.$parent.showSelect = true;
                  scope.$parent.$parent.expand = {
                    //need to include amount of padding and border from _priceCapture.scss
                    'max-height': ($(element).find("> .recurse-wrapper .id-"+thisProduct.id).height()+24)+'px'
                  };
                }, 50);
              }
              closeSection();
            },
            finalSelect = function(thisProduct) {
              //console.log(thisProduct.value+" SELECTED!!");
              thisCallback = callback(function() {
                selected = true;
                scope.selectThis = true;
              });
              scope.$emit('reset:selection', thisProduct.id);
              ctrl.updateModel.setItem(thisProduct.value);
            },
            drillDown = function(thisProduct) {
              hasList = true;
              saveThis = true;
              scope.$parent.$parent.expand = {};
              thisCallback = callback(function() {
                //this recursively adds this directive if a scope.thisProduct.collection value exists
                element.append($compile('<div class="recurse-wrapper" ng-class="{\'expand-this\': expandBase, \'selected-section\': showSelect}" ng-style="expand"><ul class="recurse id-'+thisProduct.id+'"><li ng-repeat="product in thisProduct.collection"><div expand-list-recurse="product"></div></li></ul></div>')(scope));
                scope.expandBase = true;
                timer = $timeout(function() {
                  scope.showSelect = true;
                  scope.expand = {
                    //need to include amount of padding and border from _priceCapture.scss
                    'max-height': ($(element).find("> .recurse-wrapper .id-"+thisProduct.id).height()+24)+'px'
                  };
                }, 100);
              });
              scope.$emit('select:branch');
            };
        scope.products = [];
        scope.showSelect = false;
        scope.expandBase = false;
        scope.selectThis = false;
        scope.selectProduct = function(thisProduct) {
          if(!selected) {
            if(!hasList && thisProduct.collection && thisProduct.collection.length > 0) {
              drillDown(thisProduct);
            }else if(hasList && thisProduct.collection && thisProduct.collection.length > 0){
              upTree(thisProduct);
            }else {
              finalSelect(thisProduct);
            }
          }else if(thisProduct.collection && thisProduct.collection.length > 0){
            upTree(thisProduct)
          }
        };
        scope.$on('reset:allSelected', function() {
          scope.selectThis = false;
          selected = false;
          thisCallback();
        });
        //this is emitted from a child directive
        //if a child version is clicked on, this will flag the parent to prevent reset
        scope.$on('select:branch', function(e) {
          scope.selectThis = false;
          scope.showSelect = false;
          scope.expandBase = false;
          saveThis = true;
        });

        //this is broadcasted from the product list in response to select:branch
        scope.$on('reset:list', function(e) {
          selected = false;
          if(saveThis) {
            e.preventDefault();
            saveThis = false;
            scope.showSelect = false;
            scope.expandBase = false;
            thisCallback();
          }else{
            closeSection();
          }
        });
        scope.$on('$destroy', function() {
          $timeout.cancel(timer);
          $timeout.cancel(timer2);
        });
      }
    }
  }]);
