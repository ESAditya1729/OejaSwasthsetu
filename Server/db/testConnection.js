const { sql, config } = require('./dbConfig');

async function testConnection() {
  try {
    await sql.connect(config);
    console.log('✅ SQL Server connection successful!');
    process.exit(0); // Exit cleanly
  } catch (err) {
    console.error('❌ SQL Server connection failed:', err);
    process.exit(1); // Exit with error
  }
}

testConnection();
