const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());

// user: travelDBUser
// pass: yQ7bgxLvqx0ofmr1

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mlgekjs.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try{
const traverServiceCollection = client.db('travelMeta').collection('services');

app.get('/services', async(req, res)=>{
const query = {};
const cursor = traverServiceCollection.find(query);
const services = await cursor.toArray();
res.send(services);
})

}
finally{

}
}
run().catch(err => console.error(err))

app.get('/', (req, res)=>{
    res.send('travel meta server in running');
})

app.listen(port, () =>{
    console.log(`travel meta server running on: ${port}`)
})