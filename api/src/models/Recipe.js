//****************/
// RECETAS
//****************/

const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.STRING,
    },
    healthScore: { //Nivel de "comida saludable"
      type: DataTypes.STRING,
    },
    instructions: {
      type: DataTypes.STRING,
    },
    image:{
    type: DataTypes.STRING,
    }
  },
    { timestamps: false }
  );
};
