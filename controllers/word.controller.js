const https = require('https')
const functions = {
  httpsGetCall: async (_url) => {
    return new Promise((resolve) => {
      const url = new URL(_url)
      const options = {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        'Content-Type': 'text/html',
      }
      https.get(options, (res) => {
        res.setEncoding('utf8')
        res.on('data', (d) => {
          resolve(d)
        })
      })
    })
  },
  httpPostCall: async (url, data) => {
    const newUrl = new URL(url)
    try {
      const options = {
        hostname: newUrl.hostname,
        port: newUrl.port,
        path: newUrl.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'text/html',
          'Content-Length': data.length,
        },
      }

      const req = https.request(options, (res) => {
        res.setEncoding('utf8')
      })

      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`)
        throw Error(`problem with request: ${e.message}`)
      })

      req.write(data)
      req.end()
      return 'Post Complete'
    } catch (e) {
      console.error('Error in httpPostCall', e)
    }
  },
  httpDeleteCall: async (url) => {
    const newUrl = new URL(url)
    try {
      const options = {
        hostname: newUrl.hostname,
        port: newUrl.port,
        path: newUrl.pathname,
        method: 'DELETE',
        headers: {
          'Content-Type': 'text/html',
        },
      }

      const req = https.request(options, (res) => {
        res.setEncoding('utf8')
      })

      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`)
        throw Error(`problem with request: ${e.message}`)
      })

      req.end()
      return 'Delete Complete'
    } catch (e) {
      console.error('Error in httpDeleteCall', e)
    }
  },
}
module.exports = functions
