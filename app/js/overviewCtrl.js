dinnerPlannerApp.controller('OverviewCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.getTotalMenuPrice = function() {
  	return Dinner.getTotalMenuPrice();
  }

  $scope.getFullMenu = function() {
  	return Dinner.getFullMenu();
  }

    $scope.getTotalDishPrice = function(dish) {
  	return Dinner.getTotalDishPrice(dish);
  }

  $scope.menu = Dinner.getFullMenu();

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});