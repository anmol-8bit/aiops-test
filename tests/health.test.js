const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/health',
  method: 'GET'
};

const req = http.request(options, res => {
  let data = '';

  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => {
    const jsonResponse = JSON.parse(data);
    console.assert(jsonResponse.status === 'ok', 'Expected status to be "ok"');
    console.assert(typeof jsonResponse.uptime === 'number', 'Expected uptime to be a number');
    console.log('Test passed: /health endpoint is working correctly.');
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();