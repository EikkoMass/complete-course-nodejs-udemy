const http = require('http');

const opcoes = {
  hostname: 'localhost',
  port: 80,
  path: '/',
  method: 'get',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};


/* 

// Content-Type
let html = 'nome=Jose'; // application/x-www-form-urlencoded
let json = {
  nome: 'Jose'
};

let stringJson = JSON.stringify(json); // application/json
 */
const buffer_corpo_response = [];

let req = http.request(opcoes, function(res) {

  res.on('data', function(pedaco) {
    buffer_corpo_response.push(pedaco);
  });

  res.on('end', function() { 
    const corpo_response = Buffer.concat(buffer_corpo_response).toString();
    console.log(corpo_response);
    console.log(res.statusCode);
  });

  // res.on('error', function() {

  // });
});

// req.write(stringJson);
req.end();