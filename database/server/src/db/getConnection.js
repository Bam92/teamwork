import { Pool } from 'pg';

import { db_connection } from '../../../../config';

const pool = new Pool({
  connectionString: db_connection,
});

export default pool;
