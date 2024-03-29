const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 8080;

app.listen(port);


const DATABASE_NAME = 'instagram';

/* HOST_NAME as localhost if installed locally, if installed with docker, use 'docker inspect <CONTAINER>' to check the ipAddress to put here */
const HOST_NAME = '172.17.0.2';

const PORT = 27017;

let connection = new MongoClient(`mongodb://${HOST_NAME}:${PORT}?directConnection=true&serverSelectionTimeoutMS=2000`,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  }
);

let dbAction = async function (callback) {
  try {
    await connection.connect();
    await callback(connection.db(DATABASE_NAME));
  } catch (error) {
    console.log(error);
  } finally {
    await connection.close();
  }
}

console.log(`Servidor HTTP esta escutando a porta ${port}`);

app.get('/', function(req, res) {

  res.send({
    msg: 'Hello'
  });
});

//POST (create)
app.post('/api', async function(req, res)  {
  let dados = req.body;
  
  dbAction(async access => {
    const collection = access.collection('postagens');
    try
    {
      let data = await collection.insertOne(dados);
      res.json(records);

    } catch (error)
    {
      res.json(error);
    }
    
  });
});

//GET (ready)
app.get('/api', async function(req, res)  {  
  dbAction(async access => {
    const collection = access.collection('postagens');
    try
    {
      let data = await collection.find().toArray();
      res.json(data);

    } catch (error)
    {
      res.json(error);
    }
  });
});

//GET by Id (ready)
app.get('/api/:id', async function(req, res)  {  
  dbAction(async access => {
    const collection = access.collection('postagens');
    try
    {
      let data = await collection.find(new ObjectId(req.params.id)).toArray();
      res.json(data);

    } catch (error)
    {
      res.json(error);
    }
  });
});