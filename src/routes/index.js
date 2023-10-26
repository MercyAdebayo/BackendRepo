import express from "express";
import Product from "../model/product.js";
import * as productController from '../controller/productController';

const route = express.Router();

route.get('api/products', productController.findAll);
route.get('api/products/:id', productController.findOne);
route.post('api/products', productController.create);
route.put('api/products/:id', productController.update);
route.delete('api/products/:id', productController.delete);
route.delete('api/products', productController.deleteAll);
route.get('api/products', productController.findByName);

export default route;

