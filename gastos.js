const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')


const nuevoGasto = async () => {
  try{
    const usuarioGasto = data.results[0]
    const userNew = {
      id: uuidv4().slice(30),
      nombre:`${usuarioRoom.name.first} ${usuarioRoom.name.last}`,
      comentario: 0,
      monto: 0
    };
    return userNew;
  }catch(e){
    throw e;
  }
};