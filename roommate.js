const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')

const nuevoRoom = async () => {
  try{
    const {data} = await axios.get('https://randomuser.me/api')
    const usuarioRoom = data.results[0]
    const userNew = {
      id: uuidv4().slice(30),
      nombre:`${usuarioRoom.name.first} ${usuarioRoom.name.last}`
    };
    return userNew;
  }catch(e){
    throw e;
  }
};

module.exports = { nuevoRoom }