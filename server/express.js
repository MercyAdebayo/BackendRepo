import express from 'express'

import bodyParser from 'body-parser'

import cookieParser from 'cookie-parser'

import compress from 'compression'

import cors from 'cors'

import helmet from 'helmet'

import mongoose from 'mongoose'


const app = express()
const router = express.Router();
 

mongoose.connect("mongodb+srv://Mercy0207:0dxU4OrwiQzyFZCN@cluster0.9sr5atl.mongodb.net/?retryWrites=true&w=majority/product",

    {

      useNewUrlParser: true,

      useUnifiedTopology: true

    }

);

 

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB "));

db.once("open", function () {

  console.log("Connected to MongoDB successfully");

});

 

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(compress())

app.use(helmet())

app.use(cors())


export default app