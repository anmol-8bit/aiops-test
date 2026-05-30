import { createMocks } from 'node-mocks-http';
import handler from '../../api/health';

describe('/health endpoint', () => {
    it('should return status and uptime on GET request', async () => {
        const { req, res } = createMocks({ method: 'GET' });
        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);

        const data = JSON.parse(res._getData());
        expect(data).toHaveProperty('status', 'healthy');
        expect(data).toHaveProperty('uptime');
        expect(typeof data.uptime).toBe('number');
    });

    it('should return 405 on non-GET request', async () => {
        const { req, res } = createMocks({ method: 'POST' });
        await handler(req, res);

        expect(res._getStatusCode()).toBe(405);
        const data = JSON.parse(res._getData());
        expect(data).toHaveProperty('message', 'Method Not Allowed');
    });
});