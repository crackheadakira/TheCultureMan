//code made by @TibixDev and @Sayykii
const path = require('path'),
    fs = require('fs'),
    Sequelize = require('sequelize');
if (!fs.existsSync(path.join(__dirname, 'db.sqlite'))) {
    fs.writeFileSync(path.join(__dirname, 'db.sqlite'), '');
}

const db = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite'),
    logging: false,
});

(async () => {
    try {
        await db.authenticate();
        console.log('[Sequelize] Database connection has been established successfully.');
        // await db.sync({ alter: true });
        console.log('[Sequelize] Database has been synced.');
    } catch (error) {
        console.error('[Sequelize] Unable to connect to the database');
        throw error;
    }
})();


module.exports = db;