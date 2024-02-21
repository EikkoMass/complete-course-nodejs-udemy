const { MongoClient, ServerApiVersion } = require('mongodb');

const DATABASE_NAME = 'got';
const HOST_NAME = 'localhost';
const PORT = 27017;

let connection = new MongoClient(`mongodb://${HOST_NAME}:${PORT}`,
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
    callback(connection.db(DATABASE_NAME));
  } catch (error) {
    console.log(error);
  } finally {
    await connection.close();
  }
}

module.exports = function () {
  return connMongoDb;
}