/*
* [Node.js simple app]
* Only for Education purpose
* Home work 1 services
*/

const cfg = require('./config/config');
const router = require('./router/services')
const { http, // http server
        url, // URL parser
        stringDecoder // req/payload decoder
      } = cfg.libs,
      port = cfg.port;

// http server instantiation
const server = http.createServer((req,res) => app(req,res));
// listen HTTP server
server.listen(port)

// server events ['error', 'listening'] handlers
server
  .on('listening', () => {
    let { address, port } = server.address()
    console.log(`http server listen on ${address}:${port}`)
  })
  .on('error', (err) => {
        console.error('http server error:', err);
        process.exit(1); // if 'error' exit process with code '1'
  })

// setup simple HTTP server app
const app = (req,res) => {
  const pUrl = url.parse(req.url, true), // get URL and parse it
        path = pUrl.pathname, // get pa
        tPath = path.replace(/^\/+|\/+$/g,''),
        query_obj = pUrl.query, // query object
        method = req.method.toLowerCase(), // get HTTP Method
        headers = req.headers, // get HTTP headers
        decoder = new stringDecoder('utf-8'); // UTF8 payload decoder
  // data buffer container
  let data_buffer = '';
  // request data handler (add decoded incoming data to buffer)
  req.on('data', data => data_buffer += decoder.write(data));
  // req 'end' handler
  req.on('end', ()=> {
    data_buffer += decoder.end();
    // construct parsed query object
    const request = {
      parsedUrl: pUrl,
      path: path,
      trimmedPath: tPath,
      query: query_obj,
      method: method,
      headers: headers,
      payload: data_buffer
    }
    // attach router
    router(request, res)
  })
}
