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