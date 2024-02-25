const Pool = require('pg').Pool
const pool = new Pool({
    user:"postgres",
    password:"1343",
    host:"localhost",
    port: 5432,
    database:"instagram-clone"
})
module.exports = pool;