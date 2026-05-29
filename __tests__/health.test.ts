import fetch from 'node-fetch';

describe('/health endpoint', () => {
  it('should return status "ok" and uptime in seconds', async () => {
    const res = await fetch('http://localhost:3000/api/health');
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty('status', 'ok');
    expect(json).toHaveProperty('uptime');
    expect(typeof json.uptime).toBe('number');
    expect(json.uptime).toBeGreaterThanOrEqual(0);
  });
});