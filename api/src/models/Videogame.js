
const { DataTypes } = require('sequelize'); 


module.exports = (sequelize) =>{
 sequelize.define('videogame', { 
    id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    },
    name: {
    type: DataTypes.STRING,
    allowNull: false,
      
    },
    description: {
    type: DataTypes.TEXT,
    allowNull: false
    },
    
    platforms: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    
    },
    image: {
    type: DataTypes.STRING, 
     
    },
    released : {
      type: DataTypes.DATEONLY,
      allowNull: false,
      
    },
    rating: {
    type: DataTypes.FLOAT,
    allowNull: false, 
    }
  
  });
  
 }


