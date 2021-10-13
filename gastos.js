const axios = require('axios')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const guardarGasto = (usuarioGasto) => {
  const gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'utf8'));
  if(!gastosJSON.gastos) gastosJSON.gastos = [];

  gastosJSON.gastos.push({ ...usuarioGasto, id: uuidv4().slice(30) }) // los 3 . es para clonar cada uno de los atributos de los objetos y sobreescribir y agregar los que vienen despues 
  fs.writeFileSync('gastos.json', JSON.stringify(gastosJSON, null, 2))

  actualizaGastoResumenUsuario(usuarioGasto.userId, usuarioGasto.monto);
}

const actualizarGastos = (body) => {
  const gastos = obtenerGastos();
  const prevGasto = gastos.find((el) => el.id === body.id);
  const nuevaLista = gastos.filter(el => el.id !== body.id);

  nuevaLista.push({ ...prevGasto,  monto: body.monto, descripcion: body.descripcion })

  fs.writeFileSync('gastos.json', JSON.stringify({ gastos: nuevaLista }, null, 2))

  actualizaGastoResumenUsuario(body.roommate, body.monto, prevGasto.monto);
}

const obtenerGastos = () => {
  const gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'utf8'));
  if (gastosJSON && gastosJSON.gastos) return gastosJSON.gastos;
  return [];
}

const actualizaGastoResumenUsuario = (id, monto = 0, prevMonto = 0) => {
  // SOLO PARA EL DEBE Y RECIBE AUTOMATICO
  const usuarioJSON = JSON.parse(fs.readFileSync('usuarios.json', 'utf8'));
  if (!usuarioJSON || !usuarioJSON.roommates) return;

  const nuevaListaUsuario = usuarioJSON.roommates.map((el) => {
    if (el.id === id) return {
      ...el,
      debe: (el.debe - prevMonto) + monto
    }
    return el;
  })

  fs.writeFileSync('usuarios.json', JSON.stringify({ roommates:  nuevaListaUsuario }, null, 2))
}

const eliminarGasto = (id) =>{
  const listaDeGastos = obtenerGastos();
  const prevGasto = listaDeGastos.find((el) => el.id === id);
  const nuevaLista = listaDeGastos.filter(el => el.id !== id);

  fs.writeFileSync('gastos.json', JSON.stringify({ gastos: nuevaLista }, null, 2))

  actualizaGastoResumenUsuario(prevGasto.userId, 0, prevGasto.monto);
}

module.exports = { guardarGasto, obtenerGastos, actualizarGastos, eliminarGasto }