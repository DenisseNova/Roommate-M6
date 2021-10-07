const fs = require('fs')
const http = require('http')

const PORT = 3000

http.createServer((req, res) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Max-Age', 2592000);

  if(req.url == '/' && req.method == 'GET'){
    res.setHeader('Content-type', 'text/html');
    return res.end(fs.readFileSync('./index.html', 'utf8'));
  }

  if(req.url == '/style.css' && req.method == 'GET'){
    return res.end(fs.readFileSync('./style.css', 'utf8'));
  }
  res.statusCode = 404;
  res.end();
}).listen(PORT, ()=> console.log(`escuchando puerto ${PORT}`))