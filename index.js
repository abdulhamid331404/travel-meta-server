const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mlgekjs.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try{
const travelServiceCollection = client.db('travelMeta').collection('services');

app.get('/services', async(req, res)=>{
const query = {};
const cursor = travelServiceCollection.find(query);
const services = await cursor.toArray();
res.send(services);
});

app.get('/services/:id', async(req, res) =>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const service = await travelServiceCollection.findOne(query);
    res.send(service);
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