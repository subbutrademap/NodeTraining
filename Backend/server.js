const epxress = require("express");
const cors = require("cors");
const { UserService } = require("./AppContainer");
const authorizeToken = require("./authMiddleware");

//create server object
const app = epxress();
const PORT = 3000;

// Configure CORS to allow requests from http://localhost:3001
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));

app.use(epxress.json());

//add Endpoint
app.post("/api/adduser", authorizeToken, async (req, res) => {
    console.log("Add User request received:", req.body); // log received JSON
    try {
        const result = await UserService.addUser(req.body); 
        res.send(result);

    } catch (e) {
        res.status(500).send({ 
            error: "Internal Server Error", 
            message: e.message 
        });
    }
  });


  app.post("/api/validateSession", authorizeToken, async (req, res) => {
    try {

        res.send({
            error : null,
            data : {
                valid : true
            }
        });

    } catch (e) {
        res.status(500).send({ 
            error: "Internal Server Error", 
            message: e.message 
        });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
        const result = await UserService.authenticateUser(req.body); 
        res.send(result);

    } catch (e) {
        res.status(500).send({ 
            error: "Internal Server Error", 
            message: e.message 
        });
    }
  });


  app.post("/api/getUsers", authorizeToken, async (req, res) => {
    try {
        const result = await UserService.getUsers();
        res.send(result);
    } catch (e) {
        res.status(500).send({ 
            error: "Internal Server Error", 
            message: e.message 
        });
    }
  });

  app.post("/api/deleteUser", authorizeToken, async (req, res) => {
    try {
        const result = await UserService.deleteUser(req.body);
        res.send(result);
    } catch (e) {
        res.status(500).send({ 
            error: "Internal Server Error", 
            message: e.message 
        });
    }
  });

  app.post("/api/updateUser", authorizeToken, async (req, res) => {
    try {
        const result = await UserService.updateUser(req.body);
        res.send(result);
    } catch (e) {
        res.status(500).send({ 
            error: "Internal Server Error", 
            message: e.message 
        });
    }
  });   



//start the server
app.listen(PORT , () => {
    console.log("Server Started, and listening for request on port http://localhost:3000");
});


