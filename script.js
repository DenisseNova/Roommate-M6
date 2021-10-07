const fs = require('fs')
const http = require('http')

const PORT = 3000

http.createServer((res, req) =>{
  if(req.url == '/' && req.method == 'GET'){
    res.setHeader('content-type', 'text/html');
    res.end(fs.readFileSync('index.html', 'utf8'));
  }

}).listen(PORT, console.log(`escuchando puerto ${PORT}`))