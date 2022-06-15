const express = require('express')
const cors = require('cors');
const app = express()
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const { restart } = require('nodemon');
const port = process.env.PORT || 5000

// middlewhare
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tsogf.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();

        const dashboardCollection = client.db("apiCollection").collection("dashboardData");

        app.get('/api', async (req, res) => {
            const query = {}
            const cursor = dashboardCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        // delete api
        app.delete('/booking/:id', async (req, res) => {
            const id = req.params.id
            console.log(id)
            const query = { _id: ObjectId(id) }
            console.log(query)
            const result = await BookingCollection.deleteOne(query)
            res.send(result)
        })
    }

    finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello From  Dashboard!')
})

app.listen(port, () => {
    console.log(`Dashboard listening on port ${port}`)
})

