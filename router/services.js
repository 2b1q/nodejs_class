/*
* [router]
* Only for Education purpose
* Home work 1 service router
*/
//  setup HTTP status code constants
const   DEF_STATUS_CODE = 200 // default HTTP status code
      , DEF_FAIL_CODE = 500
      , DEF_NOT_FOUND_CODE = 404;

// add hw1 controller
const hw1_controller = require('../controllers/hw1_controller')

// NotFound rout handler
const notFound = (req, cb)=> cb(DEF_NOT_FOUND_CODE);

// setup router
const router = {
  hello: hw1_controller.hello
}

// export router/controller
module.exports = (req, res) => {
  // console.log('request', req); // debug req data
  // define route function
  const route = typeof(router[req.trimmedPath]) !== 'undefined'
                ? router[req.trimmedPath]
                : notFound;
  // route the request
  route(req, (statusCode, payload)=>{
    // setup statusCode from cb() or set default => 200
    statusCode = typeof(statusCode) === 'number'
                  ? statusCode
                  : DEF_STATUS_CODE;
    // setup payload from cb() or set default => emtpy obj. {}
    payload = typeof(payload) === 'object'
                  ? payload
                  : {};
    // serialize payload
    let strPayload = JSON.stringify(payload)
    // send response
    res.setHeader('Content-Type', 'application/json'); // setup JSON content type for REST API
    res.setHeader('X-Powered-By', 'node.js http server');
    res.writeHead(statusCode); // setup header
    res.end(strPayload); // end response with a payload
  })
}
