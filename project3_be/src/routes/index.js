const userRouter = require('./user.routes');
const productRouter = require('./product.routes');
// const billRouter = require('./bill.routes');
const cartRouter = require('./cart.routes');

function route(app) {
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    // app.use('/bill', billRouter);
    app.use('/cart/:userId', cartRouter);
}

module.exports = route;