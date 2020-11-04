module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.totalItems = cart.totalItems || 0;
    this.totalPrice = cart.totalPrice || 0;

    this.add = function(item, quantity, id) {
        var cartItem = this.items[id];
        if (!cartItem) {
            cartItem = this.items[id] = { item: item, quantity: 0, price: 0 };
        }
        this.totalPrice -= cartItem.price;
        this.totalItems -= cartItem.quantity;

        cartItem.quantity = cartItem.quantity + quantity;
        cartItem.price = cartItem.item.price * cartItem.quantity;
        this.totalItems += cartItem.quantity;
        this.totalPrice += cartItem.price;
    };
    this.update = function(item, quantity, id) {
        var cartItem = this.items[id];
        if (!cartItem) {
            cartItem = this.items[id] = { item: item, quantity: 0, price: 0 };
        }
        this.totalPrice -= cartItem.price;
        this.totalItems -= cartItem.quantity;

        cartItem.quantity = quantity;
        cartItem.price = cartItem.item.price * cartItem.quantity;
        this.totalItems += cartItem.quantity;
        this.totalPrice += cartItem.price;
    };

    this.remove = function(id) {
        this.totalItems -= this.items[id].quantity;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };
    this.getItemById = function(id) {
        return this.items[id];
    };

    this.getItems = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};