const mysqldump = require('mysqldump')
const nodeCron = require("node-cron");
require('dotenv').config()
const fs = require('fs');
const Path = require('path');
const moment = require('moment')
nodeCron.schedule("1 * * * * *", ()=>{
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

 let ruta = './dbs'
 let array = []
    try {
        let funcion = (array)=>{
            console.log(array , 'si')
            if(array.length >0){
                console.log(array);
                if(fs.existsSync(array[0])){
                    fs.unlinkSync(array[0])
                    array.shift(array[0]);
                    console.log(array , ' eliminado' )
                }else{
                    console.log('error no existe');
                }
            }
        }
        if(fs.existsSync(ruta)){
            fs.readdirSync(ruta).forEach((file)=>{
                const curPath = Path.join(ruta, file )
                array.push(curPath)
            }) 
            nodeCron.schedule("4 * * * * *", funcion(array) ,
            {
                scheduled: true,
                timezone: "America/Bogota"
            })
        }
      
     } catch (error) {
        console.log(error);
     }
