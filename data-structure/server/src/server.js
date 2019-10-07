import 'dotenv/config';
import chalk from 'chalk';

import app from './app';
import { port } from '../../config';

app.listen(port, () => console.log(`The server is listning on port ${chalk.green(port)}`));
