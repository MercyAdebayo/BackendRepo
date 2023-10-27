const express = require('express')
const router = express.Router()
const {getProducts,
    getProduct,
    getProductByName,
    removeProduct,
    removeProducts,
    setProduct,
    updateProduct} = require('../controllers/productController')

router.get('/', getProducts)

router.get('/:id', getProduct)

router.post('/', setProduct);

router.put('/:id', updateProduct)

router.delete('/:id', removeProduct)

router.delete('/', removeProducts);

router.get('/', getProductByName)

module.exports = router