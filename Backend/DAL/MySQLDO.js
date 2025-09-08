const mysql = require("mysql2");

class MySqlDO {
    constructor(conString) {
        this.conString = conString;
    }

    open() {
        this.db = mysql.createConnection(this.conString);
        return this.db;
    }

    close() {
        if (this.db) {
            this.db.end();
        }
    }

    executeQuery(query, param = []) {
        return new Promise((resolve, reject) => {
            this.open();
            this.db.execute(query, param, (err, result) => {
                this.close();
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(`Query Failed: ${query} \nError: ${err.message}`));
                }
            });
        });
    }

    getTableData(tableName) {
        return this.getQueryResult(`SELECT * FROM \`${tableName}\``);
    }

    getQueryResult(query) {
        return new Promise((resolve, reject) => {
            this.open();
            this.db.query(query, (err, result) => {
                this.close();
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(`Query Failed: ${query} \nError: ${err.message}`));
                }
            });
        });
    }

    executeMultipleQuery(queryCollection) {
        return new Promise((resolve, reject) => {
            this.open();
            try {
                const queries = Object.values(queryCollection).join(";");
                this.db.query(queries, (err, result) => {
                    this.close();
                    if (!err) {
                        const output = {};
                        let i = 0;
                        Object.keys(queryCollection).forEach(key => {
                            output[key] = result[i++];
                        });
                        resolve(output);
                    } else {
                        reject(new Error(`Multiple query execution failed: ${err.message}`));
                    }
                });
            } catch (error) {
                this.close();
                reject(error);
            }
        });
    }

    InsertRowFromTable(tableFrom, tableTo, columns = "*", condition = "1=1") {
        return new Promise((resolve, reject) => {
            const insColumns = columns === "*" ? "" : `(${columns})`;
            const query = `INSERT INTO \`${tableTo}\` ${insColumns} SELECT ${columns} FROM \`${tableFrom}\` WHERE ${condition}`;
            this.open();
            this.db.query(query, (err, result) => {
                this.close();
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(`InsertRowFromTable failed: ${err.message}`));
                }
            });
        });
    }

    InsertRowFromData(tableName, data) {
        return new Promise((resolve, reject) => {
            try {
                const columns = Object.keys(data);
                const values = Object.values(data);
                const placeholders = columns.map(() => '?').join(',');
                const query = `INSERT INTO \`${tableName}\` (${columns.join(",")}) VALUES (${placeholders})`;
                this.open();
                this.db.query(query, values, (err, result) => { 
                    this.close();
                    if (!err) {
                        resolve(result);
                    } else {  
                        reject(new Error(`InsertRowFromData failed: ${err.message}`));
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    DeleteAllRows(tableName) {
        return this.getQueryResult(`TRUNCATE TABLE \`${tableName}\``);
    }

    BulkInsertFromJson(tableName, jsonData) {
        return new Promise((resolve, reject) => {
            try {
                const data = jsonData[0];
                const columns = Object.keys(data);
                let colValues = "";
                columns.forEach((key, index) => {
                    let type;
                    if (data[key] === true || data[key] === false) {
                        type = "BOOLEAN";
                    } else if (!isNaN(parseFloat(data[key]))) {
                        type = "DECIMAL(10,3)";
                    } else {
                        type = "VARCHAR(100)";
                    }
                    colValues += `${index > 0 ? "," : ""}${key} ${type} PATH '$.${key}'`;
                });
                const colString = columns.join(",");
                const query = `INSERT INTO \`${tableName}\` (${colString}) 
                    SELECT ${colString} 
                    FROM JSON_TABLE('${JSON.stringify(jsonData).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}', 
                    '$[*]' COLUMNS(${colValues})) AS a`;

                this.open();
                this.db.query(query, (err, result) => {
                    this.close();
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(new Error(`BulkInsertFromJson failed: ${err.message}`));
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    getJsonTable(jsonArray) {
        if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
            return "Invalid JSON array";
        }

        const firstObject = jsonArray[0];
        if (typeof firstObject !== "object" || firstObject === null) {
            return "Invalid JSON array";
        }

        const columns = Object.keys(firstObject).map(key => {
            const value = firstObject[key];
            let columnType;
            if (typeof value === "number") {
                columnType = Number.isInteger(value)
                    ? "INT"
                    : `DECIMAL(10, ${(value.toString().split('.')[1] || '').length || 2})`;
            } else if (!isNaN(parseFloat(value)) && !key.toLowerCase().includes("date")) {
                columnType = `DECIMAL(10, ${(value.toString().split('.')[1] || '').length || 2})`;
            } else {
                columnType = "VARCHAR(255)";
            }
            return `\`${key}\` ${columnType} PATH '$.${key}'`;
        });

        const jsonStr = JSON.stringify(jsonArray).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        return `
SELECT * FROM JSON_TABLE(
    '${jsonStr}',
    '$[*]'
    COLUMNS (
        ${columns.join(',\n        ')}
    )
) AS jt;`.trim();
    }
}

module.exports = MySqlDO;
