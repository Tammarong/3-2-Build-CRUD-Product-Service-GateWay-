const express = require ('express');
const cors=require('cors')
const morgan= require ('morgan')

const app = express();
const PORT=process.env.PORT || 3002;

app.use(cors());
app.use(morgan());
app.use(express.json());

//Sample data
let products = [
     {id:1, product:"Laptop", price:'$500', quantity: 10, description:"A high-performance laptop"},
     {id:2, product:"keyboard", price:'$20', quantity: 50, description:"Mechanical keyboard"},
];

//routes
//check status code
app.get('/health', (req,res)=>{
     res.status(200).send("OK");
});

//get all products
app.get('/products', (req,res)=>{
     res.json(products)
});


//get product by id
app.get('/products/:id', (req,res)=> {
     const product= products.find(u => u.id === parseInt(req.params.id));
     if (product) {
          res.json (product);
     } else {
          res.status(404).send({message: "products not found"});
     }    
});

//create product
app.post('/products', (req,res)=> {
     const newProduct= {    
          id: products.length + 1,
          product: req.body.product,
          price: req.body.price,
          quantity: req.body.quantity
     };
     products.push(newProduct);
     res.status(201).json (newProduct);
});


//update product
app.put('/products/:id', (req,res)=> {
     const productIndex= products.findIndex (u => u.id === parseInt(req.params.id));  
     if (productIndex !== -1) {
          const updatedProduct= {...products[productIndex], ...req.body};
          products[productIndex]= updatedProduct;
          res.json (updatedProduct);
     } else {
          res.status(404).send({message: "products not found"});
     }         
});


//delete product
app.delete('/products/:id', (req,res)=> {
     const productIndex= products.findIndex (u => u.id === parseInt(req.params.id));  
     if (productIndex !== -1) {
          products.splice(productIndex, 1);
          res.status(204).send();
     } else {
          res.status(404).send({message: "products not found"});
     }    
});


//start server
app.listen(PORT, ()=> {
     console.log(`Server running on PORT ${PORT} at http://localhost:${PORT}/ `);
});