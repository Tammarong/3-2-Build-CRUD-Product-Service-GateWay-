const express = require ('express');
const cors=require('cors')
const morgan= require ('morgan')

const app = express();
const PORT=process.env.PORT || 3001;

app.use(cors());
app.use(morgan());
app.use(express.json());

//Sample data
let users = [
     {id:1, name:"Alice" , email:'alice@gmail.com'},
     {id:2, name:"Bob" , email:'bob@gmail.com'},
];

//routes
//check status code
app.get('/health', (req,res)=>{
     res.status(200).send("OK");
});

//get all users
app.get('/users', (req,res)=>{
     res.json(users)
});


//get user by id
app.get('/users/:id', (req,res)=> {
     const user= users.find(u => u.id === parseInt(req.params.id));
     if (user) {
          res.json (user);
     } else {
          res.status(404).send({message: "User not found"});
     }    
});

//create user
app.post('/users', (req,res)=> {
     const newUser= {    
          id: users.length + 1,
          name: req.body.name,
          email: req.body.email
     };
     users.push(newUser);
     res.status(201).json (newUser);
});


//update user
app.put('/users/:id', (req,res)=> {
     const userIndex= users.findIndex (u => u.id === parseInt(req.params.id));  
     if (userIndex !== -1) {
          const updatedUser= {...users[userIndex], ...req.body};
          users[userIndex]= updatedUser;
          res.json (updatedUser);
     } else {
          res.status(404).send({message: "User not found"});
     }         
});


//delete user
app.delete('/users/:id', (req,res)=> {
     const userIndex= users.findIndex (u => u.id === parseInt(req.params.id));  
     if (userIndex !== -1) {
          users.splice(userIndex, 1);
          res.status(204).send();
     } else {
          res.status(404).send({message: "User not found"});
     }    
});


//start server
app.listen(PORT, ()=> {
     console.log(`Server running on PORT ${PORT} at http://localhost:${PORT}/ `);
});