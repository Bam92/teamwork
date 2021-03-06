import { Pool } from 'pg';

import { db_connection, db_connection_test, environment } from '../../../../config';

const pool = new Pool({
  connectionString: environment === 'test' ? db_connection_test : db_connection,

});

export default pool;
