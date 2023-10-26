import Product from "../model/product.js";

// Create a new product
export const create = (req, res) => {
    const { name, description, price, quantity, category } = req.body;

    const product = new Product({
        name,
        description,
        price,
        quantity,
        category,
    });

    product.save()
        .then((newProduct) => {
            res.status(201).json(newProduct);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error creating the product', error: err });
        });
};

// Retrieve all products
export const findAll = (req, res) => {
    Product.find()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
};

// Find a product by ID
export const findOne = (req, res) => {
    const productId = req.params.id;

    Product.findById(productId)
        .then((product) => {
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
            } else {
                res.json(product);
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error finding the product', error: err });
        });
};

// Update a product by ID
export const update = (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;

    Product.findByIdAndUpdate(productId, updatedProduct, { new: true })
        .then((product) => {
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
            } else {
                res.json(product);
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error updating the product', error: err });
        });
};

// Delete a product by ID
export const deleteProduct = (req, res) => {
    const productId = req.params.id;

    Product.findByIdAndRemove(productId)
        .then((product) => {
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
            } else {
                res.json({ message: 'Product deleted successfully' });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error deleting the product', error: err });
        });
};

// Delete all products
export const deleteAll = (req, res) => {
    Product.deleteMany({})
        .then(() => {
            res.json({ message: 'All products deleted successfully' });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error deleting all products', error: err });
        });
};

// Find products by name containing a keyword
export const findByName = (req, res) => {
    const keyword = req.query.name;

    Product.find({ name: { $regex: keyword, $options: 'i' } })
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error finding products by name', error: err });
        });
};
