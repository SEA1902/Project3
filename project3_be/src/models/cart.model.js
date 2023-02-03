const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    items: [
        {
            product: {type:mongoose.Schema.Types.ObjectId, ref: 'Product'},
            quantity: Number,
        }
    ]
});

module.exports = mongoose.model('Cart', CartSchema);