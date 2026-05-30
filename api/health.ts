import { NextApiRequest, NextApiResponse } from 'next';

let startTime = Date.now();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const uptime = Math.floor((Date.now() - startTime) / 1000);
        res.status(200).json({ status: 'healthy', uptime });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}