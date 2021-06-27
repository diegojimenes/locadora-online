import { DataTypes } from "sequelize"

const movies = (sequelize) => {
    return sequelize.define('movies', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        title: DataTypes.STRING,
        director: DataTypes.STRING,
        price: DataTypes.INTEGER,
        inStock: DataTypes.INTEGER,
        rented: DataTypes.INTEGER,
    });
}

export default movies
