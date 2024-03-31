const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const multiparty = require('connect-multiparty');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multiparty());

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
  res.setHeader('Access-Control-Allow-Origin', "*");

  let date = new Date();
  let timestamp = date.getTime();

  let url_imagem = timestamp + "_" + req.files.arquivo.originalFilename;

  let pathOrigem = req.files.arquivo.path;
  let pathDestino = `./uploads/${url_imagem}`;


  fs.copyFile(pathOrigem, pathDestino, function(err) {
    console.log(err);
    if(err)
    {
      res.status(500).json({error: err});
      return;
    }

    fs.unlink(pathOrigem, function(err){});
  });

  const dados = {
    url_imagem,
    titulo: req.body.titulo
  };

  dbAction(async access => {
    const collection = access.collection('postagens');
    try
    {
      let data = await collection.insertOne(dados);
      res.json({'status': "inclusao realizada com sucesso"});

    } catch (error)
    {
      res.json({'status': "erro"});
    }
  });
});

//GET (ready)
app.get('/api', async function(req, res)  {  

  res.setHeader('Access-Control-Allow-Origin', "*");

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

//PUT by Id (update)
app.put('/api/:id', async function(req, res)  { 
  dbAction(async access => {
    const collection = access.collection('postagens');
    try
    {
      let data = await collection.updateOne({ _id: new ObjectId(req.params.id) }, {$set: {titulo: req.body.titulo}});
      res.json(data);

    } catch (error)
    {
      res.json(error);
    }
  });
});

//DELETE by Id (update)
app.delete('/api/:id', async function(req, res)  { 
  dbAction(async access => {
    const collection = access.collection('postagens');
    try
    {
      let data = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
      res.json(data);

    } catch (error)
    {
      res.json(error);
    }
  });
});