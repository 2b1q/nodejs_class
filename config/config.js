const PROD = 'production', STAGING = 'staging'
const prod_cfg = {}
const staging_cfg = {
  port: 3000,
  endpoints: ['/hello'],
  libs: {
    http: require('http'),
    url: require('url'),
    stringDecoder: require('string_decoder').StringDecoder
  }
}

// export config
module.exports = process.env.NODE_ENV === PROD
? prod_cfg
: staging_cfg
