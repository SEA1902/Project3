const User = require("../models/user.model");
const Cart = require("../models/cart.model");

exports.create = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });

    user
    .save(function(err, result) {
        if(err) return handleError(err)
        else res.send(result);

        const cart = new Cart({
            user: user.id,
            items: [],
        });
        cart.save(function (err) {
            if (err) return handleError(err);
          });
    })
}

exports.findOne = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username, password: password}, function(err, result) {
        if(err) {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving User"
            })
        }
        else {
            res.send({
                user: result
            })

        }
    })
}