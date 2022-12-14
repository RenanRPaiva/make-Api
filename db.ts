import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mysql://root:mysql@localhost:3306/make', {
    dialect: 'mysql'
});

export default sequelize;