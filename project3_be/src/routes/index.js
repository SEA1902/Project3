const userRouter = require("./user.routes");
const productRouter = require("./product.routes");
const orderRouter = require("./order.routes");
const cartRouter = require("./cart.routes");

function route(app) {
  app.use("/user", userRouter);
  app.use("/product", productRouter);
  app.use("/order", orderRouter);
  app.use("/cart/:userId", cartRouter);
}

module.exports = route;
