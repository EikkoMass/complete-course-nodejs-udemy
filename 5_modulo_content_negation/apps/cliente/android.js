const http = require('http');

const opcoes = {
  hostname: 'localhost',
  port: 80,
  path: '/',
  headers: {
    'Accept': 'application/json'
  }
};

const buffer_corpo_response = [];

http.get(opcoes, function(res) {

  res.on('data', function(pedaco) {
    buffer_corpo_response.push(pedaco);
  });

  res.on('end', function() { 
    const corpo_response = Buffer.concat(buffer_corpo_response).toString();
    console.log(corpo_response);
  });

  // res.on('error', function() {

  // });
});