var express = require('express');
var router = express.Router();
const productService = require('../services/products');

router.get('/', function(req, res, next) {
    productService.getAll().then(data => {
        res.json(data);
    }).catch(err => next(err));
});

module.exports = router;