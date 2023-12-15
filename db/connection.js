const mysql = require("mysql2");

// Configure the database connection
const mysqlConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_DATABASE,
};

// Get a database connection
let mysqlConnection = mysql.createConnection(mysqlConfig);

// Check whether the connection is succeed
mysqlConnection.connect((err) => {
    if (err) {
        console.error("Db connect Failed.\n" + err.stack);
    }
    
    console.log("Db Connection Succeed");
});

// Get a new connection if on connection error
let retry = 0;
mysqlConnection.on("error", (err) => {
    console.error("MySQL connection error:", err);
    
    if (++retry > 3) return;
    
    console.log("replacing the connection with a new one")

    // Replace the existing connection with a new one
    mysqlConnection = mysql.createConnection(mysqlConfig);
});

module.exports = mysqlConnection;