const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Hello World</h1>');
 // res.end('Hello World from Node.js');
});
server.listen(3000, 'localhost', () => {
  console.log('Server running at http://localhost:3000/');
});
/* const body = 'hello world';
response.setHeader('Content-Length', body.length);
response.setHeader('Content-Type', 'text/plain');
response.setHeader('Set-Cookie', 'type=ninja');
response.status(200);
///////////////////////////////////////////
response.writeHead(200, {
  'Content-Length': body.length,
  'Content-Type': 'text/plain',
  'Set-Cookie': 'type=ninja',
}); */
