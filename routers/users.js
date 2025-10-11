const express = require('express'); 
const { connectToMongoDB } = require('../dbconnection'); 
const { ObjectId } = require('mongodb');

const router = express.Router();

// POST /api/users - Create a new user
router.post('/', async (req, res) => { 
    try {
        const db = await connectToMongoDB(); 
        const user = req.body; 
        const result = await db.collection('users').insertOne(user); 
        res.json({ _id: result.insertedId, ...user }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 

// GET /api/users - Get all users
router.get('/', async (req, res) => { 
    try {
        const db = await connectToMongoDB(); 
        const users = await db.collection('users').find({}).toArray(); 
        res.json(users); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/users/:id - Update a user
router.put('/:id', async (req, res) => { 
    try {
        const db = await connectToMongoDB(); 
        const userId = req.params.id; 
        const updatedUser = req.body; 
        const result = await db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: updatedUser }); 
        res.json(result); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/users/:id - Get a user by ID
router.get('/:id', async (req, res) => { 
    try {
        const db = await connectToMongoDB(); 
        const userId = req.params.id; 
        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) }); 
        res.json(user); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// DELETE /api/users/:id - Delete a user
router.delete('/:id', async (req, res) => { 
    try {
        const db = await connectToMongoDB(); 
        const userId = req.params.id; 
        const result = await db.collection('users').deleteOne({ _id: new ObjectId(userId) }); 
        res.json(result); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 

module.exports = router; 
