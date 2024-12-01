import mysql from 'mysql';
import 'dotenv/config';

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE} `

const con = mysql.createConnection(urlDB);

con.connect(function(err) {
    if (err) {
        console.error("Connection error: ", err);
    } else {
        console.log("Connected");
    }
});

export default con;
