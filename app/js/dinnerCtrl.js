// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

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

});