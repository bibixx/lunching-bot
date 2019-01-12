import * as dotenv from 'dotenv';
import express from 'express';

import hello from './controllers/hello';

dotenv.config();

(async () => {
  const app = express();

  app.get('/hello', hello);

  const EXPRESS_PORT = process.env.PORT;

  app.listen(EXPRESS_PORT, () => {
    console.log(`App listening on port ${EXPRESS_PORT}`);
  });
})();
