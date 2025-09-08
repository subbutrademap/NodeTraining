const MySqlDO = require("./DAL/MySQLDO");
const conString = require("config").mysqlConString;


module.exports = {
    dataRepo : new MySqlDO(conString)
}