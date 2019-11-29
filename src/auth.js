const crypto = require('crypto')

class TokenHelper {
  constructor (meta) {
    if (!meta || !meta.secret) throw new Error('secret is required')
    this.meta = meta
  }

  _signature (string) {
    return crypto
      .createHmac('sha256', this.meta.secret)
      .update(string)
      .digest('hex')
      .toUpperCase()
  }

  _data2string (data, timestamp = new Date().getTime()) {
    const payload = {
      service: this.meta.service,
      role: this.meta.role,
      session: this.meta.session,
      timestamp: this.meta.timestamp || timestamp,
      meta: data
    }
    const string = JSON.stringify(payload)
    const base64 = Buffer.from(string).toString('base64')
    return base64
      .replace(/\//g, '_')
      .replace(/\+/g, '-')
  }

  parseToken (token) {
    const [data] = token.split('.')
    const cleaned = data.replace(/_/g, '/').replace(/-/g, '+')
    const base64 = Buffer.from(cleaned, 'base64').toString('binary')
    const encoded = [...base64]
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
    const decoded = decodeURIComponent(encoded)
    return JSON.parse(decoded)
  }

  verifyToken (token) {
    const [, sign] = token.split('.')
    let dataParsed
    try {
      dataParsed = this.parseToken(token)
    } catch (error) {
      dataParsed = error
    }
    const string = this._data2string(dataParsed.meta, dataParsed.timestamp)
    const signature = this._signature(string)
    return sign === signature
  }

  generateToken (data) {
    const string = this._data2string(data)
    const signature = this._signature(string)
    return `${string}.${signature}`
  }
}

module.exports = TokenHelper
