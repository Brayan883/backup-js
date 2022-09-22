
const mysqldump = require('mysqldump')
const nodeCron = require("node-cron");
require('dotenv').config()
const moment = require('moment')
nodeCron.schedule("3 * * * * *", ()=>{
    let fecha = new Date().getMinutes()
        mysqldump({
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        dumpToFile: `./dbs/${process.env.DB_NAME}_${moment().format('YYYY_MM_DD')}_${fecha}.sql`,
    })
   
    console.log('base de datos creada ', fecha);
    
}, {
    scheduled: true,
    timezone: "America/Bogota"
 });
