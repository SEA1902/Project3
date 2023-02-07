const Order = require("../models/order.model");

exports.create = (req, res) => {
  const order = new Order({
    user: req.body.user,
    items: req.body.items,
    total: req.body.total,
    state: req.body.state,
    address: req.body.address,
  });

  order
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the order",
      });
    });
};

exports.getRecentOrder = (req, res) => {
  let currentDate = new Date();
  Order.find()
    .populate({ path: "user", id: req.params.userId })
    .then((data) => {
      var data = data.filter(
        (data) => currentDate.getDate() - data.createdAt.getDate() <= 2
      );
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the order",
      });
    });
};
