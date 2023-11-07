const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('./models/user')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://testingUser:test123@cluster0.xivhmpd.mongodb.net/?retryWrites=true&w=majority")



app.post("/login", (req, res) =>{ // API endpoint
    const {name, pw} = req.body;
    UserModel.findOne({name:name})
    .then(user => {
        if(user) {
            if(user.pw === pw){
                console.log(user)
                res.json(
                    {status:"Success",
                    name:user.name,
                    id: user._id})
            } else{
                res.json(
                    {status:"Wrong Password",
                    user: null})
            }
        } else{
            res.json(
                {status:"No User Exists",
                    user: null}
            )
        }
    })
})

app.post('/register', (req, res) =>{ // request, response
    const {name, pw, color} = req.body

    UserModel.findOne({name:name})
    .then(user => {
        if(user) {
            res.json({
                status: "Failure",
                user: null
            })
        } else{
            UserModel.create({name,pw, color, count:0})
            .then(user => res.json({
                status: "Success",
                user: user}))
            .catch(err => res.json(err))
        }
    })
})

app.get('/getUserData', async (req, res) => {
    try {
        const _id = req.query; // Modify the query parameter to "_id"
        const query = _id ? { _id } : {};
        
        const user = await UserModel.findOne(query);
        res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  });

app.put('/updateUserCount/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the ID of the user to update from the URL parameter
        const { count } = req.body; // Get the new count value from the request body

        // Use Mongoose to update the count field for the specified user
        const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: { count } }, { new: true });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.put('/updateUserColor/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the ID of the user to update from the URL parameter
        const { color } = req.body; // Get the new count value from the request body

        // Use Mongoose to update the count field for the specified user
        const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: { color } }, { new: true });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.delete('/deleteDocument/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the URL parameter
  
    try {
      const deletedDocument = await UserModel.findByIdAndDelete(id);
      if (!deletedDocument) {
        return res.status(404).json({ error: 'Document not found' });
      }
      res.json({ message: 'Document deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });


app.listen(3001, () =>{ // Start on this port
    console.log("server is running")
})