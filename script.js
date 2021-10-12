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

  /*if(req.url.startsWith('/gasto') && req.method == 'POST'){
    res.setHeader('Content-type', 'application/json');
    return res.end(fs.readFileSync('./gastos.json', 'utf8'))

  }*/
  let gastosJSON = JSON.parse(fs.readFileSync('./archivos/gastos.json','utf8'));
  let gastos = gastosJSON.gastos;

  if(req.url.startsWith('/gasto') && req.method == 'POST'){
    const gastosJSON = await nuevoGastos().catch(e => { return; })
    if (!gastosJSON){
      console.log('Error al cargar gasto nuevo', e)
      return res.end()
    }
    req.on('end',() => {
        gasto = {
            id: uuidv4(),
            roommate,
            descripcion,
            monto
        };

        gastos.push(gasto);

        fs.writeFileSync('./gastos.json',JSON.stringify(gastosJSON,null,1));
        res.end();
        console.log('Gasto registrado con éxito en el archivo gastos.json');
    })
  }
  /*if (req.url.startsWith("/bicicletas") && req.method == "PUT") { 
    let body;
    req.on("data", (payload) => {
      body = JSON.parse(payload);
    });
    req.on("end", () => {
      bicicletasJSON.bicicletas = bicicletas.map((b) => {
        if (b.id == body.id) { return body;
      }
    return b; });
      fs.writeFileSync("gastos.json",
    JSON.stringify(bicicletasJSON));
    res.end();
    });
  }

  if (req.url.startsWith("/gasto") && req.method == "DELETE") { // Paso 3
    const { id } = url.parse(req.url, true).query;
    // Paso 4
      bicicletasJSON.bicicletas = bicicletas.filter((b) => b.id !== id);
    // Paso 5
      fs.writeFileSync("gastos.json", JSON.stringify(bicicletasJSON));
    res.end(); 
  }*/


  res.statusCode = 404;
  res.end();
}).listen(PORT, ()=> console.log(`escuchando puerto ${PORT}`))


