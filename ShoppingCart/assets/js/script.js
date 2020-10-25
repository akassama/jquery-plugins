// ************************************************
// Shopping Cart API
//This is a modified work of Burlaka Dmytro (https://codepen.io/Dimasion/pen/oBoqBM)
// ************************************************

var shoppingCart = (function() {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];

  // Constructor
  function Item(product_id, name, price, pimage, count) {
    "use strict";
    this.product_id = product_id;
    this.name = name;
    this.price = price;
    this.pimage = pimage;
    this.count = count;
  }

  // Save cart
  function saveCart() {
    "use strict";
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  // Load cart
  function loadCart() {
    "use strict";
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }


  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};

  // Add to cart
  obj.addItemToCart = function(product_id, name, price, pimage, count) {
    "use strict";
    for(var item in cart) {
      if(cart[item].product_id === product_id) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(product_id, name, price, pimage, count);
    cart.push(item);
    saveCart();
  }
  // Set count from item
  obj.setCountForItem = function(product_id, count) {
    "use strict";
    for(var i in cart) {
      if (cart[i].product_id === product_id) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function(product_id) {
    "use strict";
    for(var item in cart) {
      if(cart[item].product_id === product_id) {
        cart[item].count --;
        if(cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function(product_id) {
    "use strict";
    for(var item in cart) {
      if(cart[item].product_id === product_id) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function() {
    "use strict";
    cart = [];
    saveCart();
  }

  // Count cart
  obj.totalCount = function() {
    "use strict";
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function() {
    "use strict";
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();


// *****************************************
// Triggers / Events
// *****************************************
// Add item
$('.add-to-cart').on("click", function(event){
  "use strict";
  event.preventDefault();
  var product_id = $(this).data('product_id');
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  var pimage = $(this).data('pimage');
  shoppingCart.addItemToCart(product_id, name, price, pimage, 1);
  displayCart();
});


// Clear items
$('.clear-cart').on("click",function() {
  "use strict";
  shoppingCart.clearCart();
  displayCart();
});

function displayCart() {
  "use strict";
  var cartArray = shoppingCart.listCart();
  var output = "";
  var total_order = 0;
  for(var i in cartArray) {
    total_order++;
    output += "<div class='col-12'>"
        + "<div class='row justify-content-center'>"
        + "<div class='col-5'>"
        + "<div class='row'>"
        + "<div class='col-9 text-left'>"
        + "<img src='" + cartArray[i].pimage + "' class='rounded-circle' width='50' height='50' />"
        + "<span class='text-info pl-3 font-weight-bold'>" + cartArray[i].name + "</span>"
        + "</div>"
        + "<div class='col-3'>"
        + "<span class='text-dark pl-2 mr-1'>(" + cartArray[i].price + ")</span>"
        + "</div>"
        + "</div>"
        + "</div>"
        + "<div class='col-4'>"
        + "<div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-product_id=" + cartArray[i].product_id + ">-</button>"
        + "<input type='number' class='item-count form-control' data-product_id='" + cartArray[i].product_id + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-product_id=" + cartArray[i].product_id + ">+</button></div>"
        + "</div>"
        + "<div class='col-3'>"
        + "<button class='delete-item btn btn-danger' data-product_id=" + cartArray[i].product_id + ">X</button>"
        + "<span class='text-dart pl-2'><kbd>" + cartArray[i].total + "</kbd></span>"
        + "</div>"
        + "</div>"
        + "</div>"
        + "<div class='row' id='hedden-fields'><input type = 'hidden' class='sr-only' name='ProductID[]' id='ProductName' value='" + cartArray[i].product_id + "'>"
        + "<input type = 'hidden' class='sr-only' name='ProductName[]' id='ProductName' value='" + cartArray[i].name + "'>"
        + "<input type = 'hidden' class='sr-only' name='ProductPrice[]' id='ProductPrice' value='" + cartArray[i].price + "'>"
        + "<input type = 'hidden' class='sr-only' name='ProductQuantity[]' id='ProductQuantity' value='" + cartArray[i].count + "'>"
        + "<input type = 'hidden' class='sr-only' name='TotalOrderedItems' id='TotalOrderedItems' value='" + total_order + "'></div>"
        + "<hr/>" ;
  }

  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}


// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
  "use strict";
  var name = $(this).data('name');
  var product_id = $(this).data('product_id');
  shoppingCart.removeItemFromCartAll(product_id);
  displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
  "use strict";
  var name = $(this).data('name');
  var product_id = $(this).data('product_id');
  shoppingCart.removeItemFromCart(product_id);
  displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function(event) {
  "use strict";
  var name = $(this).data('name');
  var product_id = $(this).data('product_id');
  shoppingCart.addItemToCart(product_id);
  displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
  "use strict";
  var name = $(this).data('name');
  var count = Number($(this).val());
  var product_id = $(this).data('product_id');
  shoppingCart.setCountForItem(product_id, count);
  displayCart();
});

displayCart();


// =============================
// Cart toast display
// =============================
$('.show-toast').on("click",function(){
  "use strict";
  const x = document.getElementById("product-toast");
  var item_name = $(this).data('name');
  $("#item-name").text(item_name);
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
});
