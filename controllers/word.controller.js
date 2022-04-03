const https = require('https')
const functions = {
  httpsGetCall: async (_url) => {
    return new Promise((resolve) => {
      const url = new URL(_url)
      const options = {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
      }
      https.get(options, (res) => {
        res.setEncoding('utf8')
        res.on('data', (d) => {
          resolve(d)
        })
      })
    })
  },
}
module.exports = functions
