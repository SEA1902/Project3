const Product = require("../models/product.model");
var request = require('request-promise');

// exports.create = (req, res) => {
//     const product = new Product({
//         name: req.body.name,
//         price: req.body.price,
//         image: req.body.image,
//         company: req.body.company,
//     });

//     product
//         .save()
//         .then((data) => {
//         res.send(data);
//          })
//         .catch((err) => {
//             res.status(500).send({
//                 message:
//                 err.message || "Some error occurred while creating the User"
//             })
//         })
// }

// const getPagination = (page, size) => {
//     const limit = size ? +size : 8;
//     const offset = (page - 1) ? (page - 1) * limit : 0;
//     return {limit, offset};
// }

exports.getProductList = (req, res) => {
    const {page, limit, articleType, subCategory} = req.query;
    var condition = articleType 
        ? { articleType: articleType }
        : {};
    subCategory ? condition.subCategory = subCategory : {}  

    Product.paginate(condition,{ page, limit})
    .then((data) => {
        res.send({
            totalItems: data.totalDocs,
            products: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page,
          });
    })
    .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving User"
        })
    })
}

exports.getById = (req, res) => {
    Product.findById(req.params.productId)
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: "Product not found with id " + req.params.productId,
          });
        }
        res.send(data);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Product not found with id " + req.params.productId,
          });
        }
        return res.status(500).send({
          message: "Error retrieving product with id " + req.params.productId,
        });
      });
};

// exports.delete = (req, res) => {
//   Product.deleteOne({ _id: req.params.productId})
//   .then((data) => {
//     if (!data) {
//       return res.status(404).send({
//         message: "Product not found with id " + req.params.productId,
//       });
//     }
//     res.send(data);
//   })
//   .catch((err) => {
//     if (err.kind === "ObjectId") {
//       return res.status(404).send({
//         message: "Product not found with id " + req.params.productId,
//       });
//     }
//     return res.status(500).send({
//       message: "Error delete product with id " + req.params.productId,
//     });
//   });
// }

exports.search = (req, res) => {
    const name = req.body.name;
    Product.find({"productDisplayName": { $regex: '.*' + name + '.*' }})
        .then((data) => {
            if (!data) {
            return res.status(404).send({
                message: "Product not found" ,
            });
            }
            res.send(data);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Product not found",
            });
            }
            return res.status(500).send({
            message: "Error retrieving product ",
            });
        });
}

exports.getRecommendation = (req, res) => {
  id = req.body.id
  var options = {
    method: 'POST',

    // http:flaskserverurl:port/route
    uri: 'http://127.0.0.1:5000/product/get_recommender',
    body: id,

    // Automatically stringifies
    // the body to JSON 
    json: true
  };

  var sendrequest = request(options)
    .then((data) => {
      res.send(data);
    })
    .catch(function (err) {
      res.status(500).send({
        message:
        err.message || "Some error occurred while recommendation Product"
      })
    });
};