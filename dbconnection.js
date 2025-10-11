const { MongoClient } = require('mongodb'); 
const uri = 'mongodb+srv://dcs:DCSGUNI2025@test-db.lk92wsx.mongodb.net/'; // Connection URI 
const client = new MongoClient(uri, { useNewUrlParser: true, 
useUnifiedTopology: true }); 
async function connectToMongoDB() { 
    try { 
        await client.connect(); 
        console.log('Connected to MongoDB'); 
        return client.db('test-db'); // Replace 'mydatabase' with your database name 
    } catch (error) { 
        console.error('Error connecting to MongoDB:', error); 
    } 
} 
module.exports = { connectToMongoDB }; 
