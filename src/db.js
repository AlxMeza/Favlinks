const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection closed unexpectedly');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has exceeded its capacity');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('Database connection was refused');
        }
    }
    
    if(connection) connection.release();
    console.log('Database connection successfull');
    return;
})

//Promisify pool query
pool.query = promisify(pool.query);


module.exports = pool;