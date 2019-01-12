import { Request, Response } from 'express';

import * as client from 'src/db/index';

export default async (req: Request, res: Response) => {
  const msg: any = await client.query('SELECT $1::text as message', ['Hello world!']);
  const now: any = await client.query('SELECT NOW() as message');

  res.json({
    data: [
      msg.rows[0].message,
      now.rows[0].message,
    ],
  });
};
