import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
    'agulha',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);
// Sincronizar os modelos
(async () => {
    try {
        await sequelize.sync({ alter: true }); // Use { force: true } para recriar tabelas (apaga dados existentes)
        console.log("Modelos sincronizados com o banco de dados.");
    } catch (error) {
        console.error("Erro ao sincronizar os modelos:", error);
    }
})();


export default sequelize;