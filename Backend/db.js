const { Pool } = require('pg');

// Pool for the first database
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'zerohero234',
    password: 'aman123',
    port: 5432,
});

// Pool for the second database
const pool2 = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'digimenu',
    password: 'aman123',
    port: 5432,
});

module.exports = { pool, pool2 };
