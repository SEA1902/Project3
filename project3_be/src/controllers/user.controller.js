const User = require("../models/user.model");
const Cart = require("../models/cart.model");

exports.create = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
  });

  user.save(function (err, result) {
    if (err) return handleError(err);
    else res.send(result);

    const cart = new Cart({
      user: user.id,
      items: [],
    });
    cart.save(function (err) {
      if (err) return handleError(err);
    });
  });
};

exports.findOne = (req, res) => {
  const phone = req.body.phone;
  const password = req.body.password;

  User.findOne({ phone: phone, password: password }, function (err, result) {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving User",
      });
    } else {
      res.send({
        user: result,
      });
    }
  });
};

exports.updateInformation = (req, res) => {
  const userId = req.params.userId;
  const username = req.body.username;
  const phone = req.body.phone;
  const address = req.body.address;
  const password = req.body.password;
  User.findByIdAndUpdate(userId, {
    username: username,
    phone: phone,
    address: address,
    password: password,
  }).then((data) => {
    User.findById(userId).then((newUser) => {
      res.send(newUser);
    });
  });
};
