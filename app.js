var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var productsRouter = require('./routes/products');
var cartRouter = require('./routes/cart');
var Cart = require('./models/cart');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set a cookie
app.use(function(req, res, next) {
    // check if client sent cookie
    var cookie = req.cookies.shopping_cart;
    if (cookie === undefined) {
        res.cookie('shopping_cart', JSON.stringify(new Cart({})), { maxAge: 60 * 1000 * 60 * 24 * 30, httpOnly: true });
    }
    next(); // <-- important!
});

app.get('/', (req, res, next) => {
    res.render('index.html')
});
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/cart', cartRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    const statusCode = err.status || err.statusCode || 500;
    res.status(statusCode);
    res.json({ message: err.message });
});

module.exports = app;