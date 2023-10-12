import server from "./server/express.js"

const port = 3000;

 

server.get('/', (req, res) => {

   res.json({"messsage":"Welcome to the dress store application"});

});

 

server.listen(port, () => {

  console.log(`Server is running on port ${port}`);

});