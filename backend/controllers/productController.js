const asyncHandler = require('express-async-handler')

const Product = require('../models/productModel')
// @desc Get all products
// @route GET /api/products
const getProducts = asyncHandler(async(req,res) => {
    const products = await Product.find()
    res.status(200).json(products);
})

// @desc Get products by id
// @route GET /api/products/:id
const getProduct = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)

    if(!product)
    {
        res.status(400)
        throw new Error('Product not found')
    }
    res.status(200).json(product);

})

// @desc Add new product
// @route POST /api/products
const setProduct = asyncHandler(async(req,res) => {
     if(!req.body){
        res.status(400)
         throw new Error('Please add a text field')
     }
    
    const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category
    })
    res.status(200).json(product);


})

// @desc Update product by id
// @route PUT /api/products/:id
const updateProduct = asyncHandler(async(req,res) => {
    const products = await Product.findById(req.params.id)

    if(!products)
    {
        res.status(400)
        throw new Error('Product not found')
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedProduct);
})

// @desc Remove product by id
// @route DELETE /api/products/:id
const removeProduct = asyncHandler(async(req,res) => {
    const removedProduct = await Product.findById(req.params.id)

    if(!removedProduct)
    {
        res.status(400)
        throw new Error('Product not found')
    }else {
        await Product.findByIdAndRemove(req.params.id)
        res.json({ message: 'Product deleted successfully' });
    }

})

// @desc Remove all products
// @route DELETE /api/products
const removeProducts = asyncHandler(async(req,res) => {
    await Product.deleteMany({})
    res.json({ message: 'Products collection documents deleted successfully' });
})

// @desc Get all Products containing specific name
// @route GET /api/products?name=[kw]
const getProductByName = asyncHandler(async (req, res) => {
    const keyword = req.query.name;
  
    if (keyword) {
      // Define a regular expression to match names containing the keyword
      const regex = new RegExp(keyword, 'i'); // 'i' for case-insensitive search
  
      try {
        // Perform the MongoDB query and await the result
        const filteredProduct = await Product.find({ name: { $regex: regex } }).exec();
  
        // Send the matching products as a response
        res.status(200).json(filteredProduct);
      } catch (err) {
        // Handle errors, e.g., send an error response
        res.status(500).json({ error: 'An error occurred.' });
      }
    } else {
      // If the "name" query parameter is not provided, send an error response
      res.status(400).json({ error: 'The "name" query parameter is required.' });
    }
  });
  





module.exports = {
    getProducts,
    getProduct,
    getProductByName,
    removeProduct,
    removeProducts,
    setProduct,
    updateProduct

}