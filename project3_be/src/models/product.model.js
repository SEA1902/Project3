const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ProductSchema = mongoose.Schema({
    gender: String,
    price: String,
    subCategory: String,
    articleType: String,
    baseColour: String,
    productDisplayName: String,
    image: String
});

ProductSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("Product", ProductSchema);

