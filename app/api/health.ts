import { NextApiRequest, NextApiResponse } from 'next';

let startTime = Date.now();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentTime = Date.now();
  const uptime = Math.floor((currentTime - startTime) / 1000);

  res.status(200).json({
    status: "ok",
    uptime: uptime
  });
}