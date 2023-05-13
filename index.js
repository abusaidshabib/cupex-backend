var express = require('express');
var cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
var app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

async function dbConnect() {
  try {
    await client.connect();
    console.log("Database Connected")
  }

  catch (error) {
    console.log(error.name, error.message);
    res.send({
      success: false,
      error: error.message,
    })
  }
}

dbConnect();


const MENU = client.db("cupex").collection("menu");

app.get("/menu", async(req, res) => {
  try{
    const result = await MENU.find().toArray();

    res.send({
      success: true,
      data: result
    })
  }

  catch(error){
    res.send({
      success: false,
      data: error.message
    })
  }
})



app.get('/', async (req, res) => {
  res.send("Cupex Backend running")
})

app.listen(port, () => {
  console.log(`Cupex Backend running on port ${port}`)
})