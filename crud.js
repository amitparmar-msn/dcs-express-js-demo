const express = require('express'); 
const { connectToMongoDB } = require('./dbconnection'); 
const app = express(); 
const port = 5500; 
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/api/users', async (req, res) => { 
    const db = await connectToMongoDB(); 
    const user = req.body; 
    const result = await db.collection('users').insertOne(user); 
    res.json(result.ops[0]); 
}); 
app.get('/api/users', async (req, res) => { 
    const db = await connectToMongoDB(); 
    const users = await db.collection('users').find({}).toArray(); 
    res.json(users); 
});
app.put('/api/users/:id', async (req, res) => { 
    const db = await connectToMongoDB(); 
    const userId = req.params.id; 
    const updatedUser = req.body; 
    const result = await db.collection('users').updateOne({ _id: 
userId }, { $set: updatedUser }); 
    res.json(result); 
});

app.delete('/api/users/:id', async (req, res) => { 
    const db = await connectToMongoDB(); 
    const userId = req.params.id; 
    const result = await db.collection('users').deleteOne({ _id: 
userId }); 
    res.json(result); 
}); 

app.listen(port, () => { 
    console.log(`Server is running on http://localhost:${port}`); 
}); 
