var express = require('express');
var router = express.Router();
const productService = require('../services/products');
var Cart = require('../models/cart');

router.get('/', function(req, res, next) {
    var cookie = req.cookies.shopping_cart;
    var cart = new Cart({});
    if (cookie !== undefined) {
        cart = new Cart(JSON.parse(req.cookies.shopping_cart));
    }
    res.json({ items: cart.getItems(), totalPrice: cart.totalPrice, totalItems: cart.totalItems });
});

router.post('/:productId', function(req, res, next) {
    var cookie = req.cookies.shopping_cart;
    var cart = new Cart({});
    if (cookie !== undefined) {
        cart = new Cart(JSON.parse(req.cookies.shopping_cart));
    }
    const productId = req.params.productId;
    productService.getOneById(productId).then(product => {
        if (!product) {
            next({ statusCode: 404, message: "Id item not found" })
        } else {
            const quantity = Number.parseInt(req.body.quantity);
            cart.add(product, quantity, productId);
            res.cookie('shopping_cart', JSON.stringify(cart), { maxAge: 60 * 1000 * 60 * 24 * 30, httpOnly: true });
            res.json({ message: "Item Added into Cart" });
        }
    }).catch(err => next(err));
});
router.put('/:productId', function(req, res, next) {
    var cookie = req.cookies.shopping_cart;
    var cart = new Cart({});
    if (cookie !== undefined) {
        cart = new Cart(JSON.parse(req.cookies.shopping_cart));
    }
    const productId = req.params.productId;
    var item = cart.getItemById(productId);
    if (!item) {
        next({ statusCode: 404, message: "item not found" });
    } else {
        productService.getOneById(productId).then(product => {
            if (!product) {
                next({ statusCode: 404, message: "Id item not found" })
            } else {
                const quantity = Number.parseInt(req.body.quantity);
                cart.update(product, quantity, productId);
                res.cookie('shopping_cart', JSON.stringify(cart), { maxAge: 60 * 1000 * 60 * 24 * 30, httpOnly: true });
                res.json({ message: "Item Updated" });
            }
        })
    }
});
router.delete('/:productId', function(req, res, next) {
    var cookie = req.cookies.shopping_cart;
    var cart = new Cart({});
    if (cookie !== undefined) {
        cart = new Cart(JSON.parse(req.cookies.shopping_cart));
    }
    const productId = req.params.productId;
    var item = cart.getItemById(productId);
    if (!item) {
        next({ statusCode: 404, message: "item not found" });
    } else {
        cart.remove(productId);
        res.cookie('shopping_cart', JSON.stringify(cart), { maxAge: 60 * 1000 * 60 * 24 * 30, httpOnly: true });
        res.json({ message: "Item removed from Cart" });
    }
});

router.delete('/', function(req, res, next) {
    res.cookie('shopping_cart', JSON.stringify(new Cart({})), { maxAge: 60 * 1000 * 60 * 24 * 30, httpOnly: true });
    res.json({ message: "Cart removed" });
});

module.exports = router;