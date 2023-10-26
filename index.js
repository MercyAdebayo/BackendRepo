import server from "./server/express.js"
import express from 'express'
const port = 3000;

 

server.get('/', (req, res) => {

   res.json({"messsage":"Welcome to DressStore application"});

});

 

server.listen(port, () => {

  console.log(`Server is running on port ${port}`);

});