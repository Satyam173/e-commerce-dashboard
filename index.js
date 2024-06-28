const express = require("express");
const cors = require("cors");
require("./db/config");
const Product = require("./db/product");
const User = require("./db/User");
const product = require("./db/product");
const app = express();
require('dotenv').config

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT;

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(req.body);
});

app.post("/login", async (req, res) => {
  // res.send(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No user found" });
    }
  } else {
    res.send({ result: "No user found" });
  }
});

app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "no product" });
  }
});

app.delete("/product/:id", async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id", async (req, res) => {
  try {
    let result = await Product.findOne({ _id: req.params.id });
    if (result === null) {
      res.send({ result: "No record found" });
    } else {
      res.send(result);
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred", details: error.message });
  }
});

app.put("/product/:id", async (req, res) => {
  try {
    let result = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    )
    res.send(result)
    
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred", details: error.message });
  }
});

app.get('/search/:key',async (req,res)=>{
  try {
    let result = await Product.find({
      '$or':[
        {
          name:{$regex:req.params.key},
          
        },
        {
          company:{$regex:req.params.key},
          
        },
        {
          category:{$regex:req.params.key},
          
        },
        {
          price:{$regex:req.params.key},
          
        }
      ]
    })
    res.send(result);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred", details: error.message });
  }
})

app.listen(port, () => {
  console.log("Server is running on port 5000");
});
