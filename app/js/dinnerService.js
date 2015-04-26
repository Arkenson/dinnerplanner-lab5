// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {

    //Fields
    var numberOfGuests = 1;
    var menu = [];
    var selectedDishID = 1;

    this.getSelectedDishID = function () {
        return selectedDishID;
    }

    this.setSelectedDIshID = function (ID) {
        selectedDishID = ID;
    }

    //Sets the number of guests
    this.setNumberOfGuests = function (num) {
        numberOfGuests = num;
    }

    //Returns the number of guests
    this.getNumberOfGuests = function () {
        return numberOfGuests;
    }

    //Returns the dish that is on the menu for selected type 
    this.getSelectedDish = function (category) {
        for (i in menu) {
            if (menu[i].Category == category) {
                return menu[i];     // Only returns a menu item if found, otherwise nothing is returned.
            }
        }
    }

    //Returns all the dishes on the menu (or the selected type, nothing if selected type not found).
    this.getFullMenu = function () {
        return menu;
    }

    //Returns all ingredients for all the dishes on the menu.
    this.getAllIngredients = function (category) {
        var ingredients = [];
        for (i in menu) {
            if (category == undefined) {
                for (var j = 0; j < menu[i].Ingredients.length; j++) {
                    ingredients.push(menu[i].Ingredients[j]);
                }
            }
            if (menu[i].Category == category) {
                for (var j = 0; j < menu[i].Ingredients.length; j++) {
                    ingredients.push(menu[i].Ingredients[j]);
                }
            }
        }
        return ingredients;     // Returns an empty list if no item of that type on menu, or a list with all the ingredients for that item on the menu.
    }

    //Returns the total price of the menu (all the ingredients multiplied by number of guests).
    this.getTotalMenuPrice = function (category) {
        var totalPrice = 0;
        var ingredients = this.getAllIngredients(category);
        for (var i = 0; i < ingredients.length; i++) {
            totalPrice += ingredients[i].Quantity;
        }


        return (parseFloat(totalPrice).toFixed(2) * numberOfGuests);  // Returns the total cost of all ingredients, is >= 0.
    }

    //Adds the passed dish to the menu. If the dish of that type already exists on the menu
    //it is removed from the menu and the new one added.
    this.addDishToMenu = function (id) {
        /*var apiKey = "dvxkRYZj71vL8irJQo33bFG3o6U34O8K";
        var url = "http://api.bigoven.com/recipe/"
                  + id
                  + "?api_key=" + apiKey;
        $.ajax({
            type: "GET",
            dataType: 'json',
            cache: false,
            url: url,
            success: function (data) { */  


        console.log("1. Adding a dish")
        var found = false;
        for (i in menu) {
            if (menu[i].Category == data.Category) {
                menu.pop(menu[i]);
                menu.push(data)
                found = true;
                console.log("2. Added the dish (already existed) ", data.Title)
            }
        }
        if (!found) {
            console.log(menu)
            menu.push(data);
            console.log("2. Added the dish (newly added)", data.Title)
            console.log(menu)
        }

            //}
        //});

    }

    //Returns the number of items in menu
    this.getLengthOfMenu = function () {
        return menu.length;
    }

    //Removes dish from menu
    this.removeDishFromMenu = function (id) {
        menu.pop(dishes[id]);
    }


//BigOven API calls
this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:10,api_key:'dvxkRYZj71vL8irJQo33bFG3o6U34O8K'});
this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'dvxkRYZj71vL8irJQo33bFG3o6U34O8K'});

//Now, in the controller, if we want to search for dishes we can call Dinner.DishSearch.get({title_kw:'chicken'}) 
//or to get a single dish we would do Dinner.Dish.get({id:12345}).


  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});