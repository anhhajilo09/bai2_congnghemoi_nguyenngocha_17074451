const API = "http://localhost:3000/api/v1/";
start();

function start() {
    getListProduct(renderListProduct);
    getCart(renderCart);
}

function getListProduct(callback) {
    fetch(API + "products").then(res => {
        return res.json();
    }).then(callback);
}

function renderListProduct(products) {
    var listProductBlock = document.querySelector("#list_product");
    var htmls = products.map(product => {
        return `<div class="col-md-3">
            <div style="border:1px solid #333; background-color:#f1f1f1; border-radius:5px; padding:16px;" align="center">
                <img src="images/${ product.image }" class="img-responsive" /><br />
    
                <h6 class="text-info">${ product.title }</h6>
    
                <h6 class="text-danger">$ ${ product.price }</h6>
    
                <input required min="1" type="number" id="quantity_${ product.id }" value="1" class="form-control text-right" />
    
                <button onclick="handleAddItemToCart('${ product.id }')" style="margin-top:5px;" class="btn btn-success">Add to Cart</button>
    
            </div>
    </div>`;
    });
    listProductBlock.innerHTML = htmls.join('');
}

function getCart(callback) {
    fetch(API + "cart", { credentials: 'same-origin' }).then(res => {
        return res.json();
    }).then(callback);
}

function renderCart(cart) {
    var cartBlock = document.querySelector("#cart");

    if (cart.totalItems !== 0) {
        var htmls = cart.items.map(item => {
            return `
            <tr id="item-cart-${ item.item.id }">
                <td>${ item.item.title }</td>
                <td><input onchange="handleUpdateItemCart('${ item.item.id }')" required min="1" type="number" id="quantity_cart_${ item.item.id }" value="${ item.quantity }" class="form-control text-right" /></td>
                <td align="right">$ ${ item.item.price }</td>
                <td align="right">$ ${ item.price }</td>
                <td><button class="btn text-danger" onclick="handleRemoveItemCart('${ item.item.id }')">Remove</button></td>
            </tr>`;

        });
        htmls.push(`
        <tr>
            <td colspan="3" align="right">Total</td>
            <td align="right">$ ${ cart.totalPrice }</td>
            <td></td>
        </tr>`);
        cartBlock.innerHTML = htmls.join('');
    } else {
        cartBlock.innerHTML = `
        <tr>
            <td colspan="5">Your shopping cart is empty.</td>
        </tr>`;
    }
}

function handleAddItemToCart(id) {
    const txtquantity = document.getElementById('quantity_' + id + '');
    addItemToCart(id, txtquantity.value, function(data) {
        getCart(renderCart);
        showAlertSuccess(data.message);
        txtquantity.value = 1;
    });
}

function addItemToCart(id, quantity, callback) {
    fetch(API + "cart/" + id, {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json;"
        },
        body: JSON.stringify({ quantity: Number.parseInt(quantity) })
    }).then((res) => {
        return res.json();
    }).then(callback);
}

function handleUpdateItemCart(id) {
    const txtquantity = document.getElementById('quantity_cart_' + id + '');
    updateItemCart(id, txtquantity.value, function(data) {
        getCart(renderCart);
        showAlertSuccess(data.message);
    });
}

function updateItemCart(id, quantity, callback) {
    fetch(API + "cart/" + id, {
        method: "PUT",
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json;"
        },
        body: JSON.stringify({ quantity: Number.parseInt(quantity) })
    }).then((res) => {
        return res.json();
    }).then(callback);
}

function handleRemoveItemCart(id) {
    removeItemCart(id, function(data) {
        getCart(renderCart);
        showAlertSuccess(data.message);
    });
}

function removeItemCart(id, callback) {
    fetch(API + "cart/" + id, {
        method: "DELETE",
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json;"
        }
    }).then((res) => {
        return res.json();
    }).then(callback);
}

function handleClearCart() {
    clearCart(function(data) {
        showAlertSuccess(data.message);
        getCart(renderCart);
    });
}

function clearCart(callback) {
    fetch(API + "cart", {
        method: "DELETE",
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json;"
        }
    }).then((res) => {
        return res.json();
    }).then(callback);
}

//Helper function
function showAlertSuccess(message) {
    document.getElementById('alert').innerHTML = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            <span class="sr-only">Close</span>
        </button>
        <strong>${message}!</strong>
    </div>`;
}

function showAlertDanger(message) {
    document.getElementById('alert').innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            <span class="sr-only">Close</span>
        </button>
        <strong>${message}!</strong>
    </div>`;
}