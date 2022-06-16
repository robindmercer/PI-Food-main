const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('idioma', {
        page: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lang: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        texto: {
            type: DataTypes.STRING,
        },
    },
        { timestamps: false }
    );
};


// insert into idiomas values 
// (1,'Home','ENG','No Recipes Found'),
// (2,'Home','SPA','Receta inexistente'),
// (3,'Home','ENG','No Recipes Found'),
// (4,'Home','SPA','Receta inexistente');