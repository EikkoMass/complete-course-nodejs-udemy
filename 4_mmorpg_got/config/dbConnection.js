const { MongoClient, ServerApiVersion } = require('mongodb');

const DATABASE_NAME = 'got';

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

let connMongoDb = async function (callback) {
  try {
    await connection.connect();
    await callback(connection.db(DATABASE_NAME));
  } catch (error) {
    console.log(error);
  } finally {
    await connection.close();
  }
}

module.exports = function () {
  return connMongoDb;
}