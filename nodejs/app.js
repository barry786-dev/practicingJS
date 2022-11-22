const http = require('http');

const server = http.createServer((req, res) => {
  let body = [];
  console.log(req.method, req.url);
  req
    .on('data', (chunk) => {
      body.push(chunk);
      console.log('chunk:', chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      console.log('body:', body);
      let message = 'Unknown';
      if (body) {
        message = body.split('=')[1];
      }
      console.log('message:', message);

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(
        `<h1> Hi ${message}</h1><form action="message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>`
      );
      // res.end('<h1>Hello World</h1>');
      // res.end('Hello World from Node.js');
      res.end();
    });
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
