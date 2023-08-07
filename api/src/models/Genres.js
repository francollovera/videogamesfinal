//interactuamos con base de datos relacionales mediante sql que es el lenguaje que nos permite interactuar con BDD.

const { DataTypes } = require('sequelize');


module.exports = (sequelize) =>{
  sequelize.define('genres', {  
    name: {
    type: DataTypes.STRING,
    allowNull: false, 
      
    },
  });
 }
 

