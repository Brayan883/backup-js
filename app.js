const mysqldump = require('mysqldump')
const nodeCron = require("node-cron");
require('dotenv').config()
const fs = require('fs');
const Path = require('path');
const moment = require('moment')
nodeCron.schedule('30 */1 * * * *', ()=>{
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

     nodeCron.schedule('*/2 * * * *', ()=>{
        let ruta = './dbs'
        let array = []
        if(fs.existsSync(ruta)){
            fs.readdirSync(ruta).forEach((file)=>{
                const curPath = Path.join(ruta, file )
                array.push(curPath)
            }) 
            console.log(array);
            if(array.length >0){
                if(fs.existsSync(array[0])){
                    fs.unlinkSync(array[0])
                    array.shift(array[0],' eliminado');
                    console.log(array , ' recientes' )
                }else{
                    console.log('error no existe');
                }
            }
        }
        console.log('si funciona');
     } ,
     {
     scheduled: true,
     timezone: "America/Bogota"
    })
