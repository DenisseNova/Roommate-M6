const fs = require('fs')
const http = require('http')
const { nuevoRoom, guardarRoom } = require('./roommate')

const PORT = 3000

fs.writeFileSync('usuarios.json', JSON.stringify({ roommates: [] }, null, 2))
fs.writeFileSync('gastos.json', JSON.stringify({ gastos: [] }, null, 2))


http.createServer(async (req, res) =>{
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

  if(req.url.startsWith('/roommate') && req.method == 'POST'){
    const usuarioRoom = await nuevoRoom().catch(e => { return; })
    if (!usuarioRoom) {
      console.log('Error en agregar un Roommate nuevo', e)
      res.statusCode = 500;
      return res.end();
    }
    guardarRoom(usuarioRoom);
    return res.end(JSON.stringify(usuarioRoom, null, 2))
  }
  if(req.url.startsWith('/roommates') && req.method == 'GET'){
    res.setHeader('Content-type', 'application/json');
    return res.end(fs.readFileSync('./usuarios.json', 'utf8'))
  }

  if(req.url.startsWith('/gastos') && req.method == 'GET'){
    res.setHeader('Content-type', 'application/json');
    return res.end(fs.readFileSync('./gastos.json', 'utf8'))
  }

  if(req.url.startsWith('/gasto') && req.method == 'POST'){
    res.setHeader('Content-type', 'application/json');
    return res.end(fs.readFileSync('./gastos.json', 'utf8'))
  }

  res.statusCode = 404;
  res.end();
}).listen(PORT, ()=> console.log(`escuchando puerto ${PORT}`))