const sql = require('mssql/msnodesqlv8');

const config = {
    connectionString: "Driver={ODBC Driver 18 for SQL Server};Server=(localdb)\\MSSQLLocalDB;Database=HealthHelp;Trusted_Connection=Yes;Encrypt=no"
};

module.exports = {
  sql,
  config
};
