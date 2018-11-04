/*
* [controller]
* Only for Education purpose
* Home work 1 services
*/
const hw1_service = require('../models/hw1_service')

// hello controller
// cb(statusCode, payload)
exports.hello = (req, cb) => {
  console.log('Request routed to "hello" controller');
  const ua = req.headers['user-agent'] || 'unknown'
  console.log('client "user-agent" header: ', ua);
  hw1_service.hello(ua)
    .then(resp => cb(200, resp))
    .catch(()=> cb(500, { error: 'somsing going wrong' }))
}
