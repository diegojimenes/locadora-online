import { DataTypes } from "sequelize"

const users = (sequelize) => {
    return sequelize.define('users', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });
}

export default users
