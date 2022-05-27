// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

// Port for server
const port = 8000; 
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

//Post routes  
app.post('/add', async (req, res) => {
    const body = await req.body;
    projectData = body;
    console.log(projectData);
    res.status(200).send(projectData);
});

app.get('/all', async (req, res) => {
    if(projectData){
        res.send(projectData);
    }
});

// Setup Server
app.listen(port, function(){console.log('listening on port' + ':' + port)});



