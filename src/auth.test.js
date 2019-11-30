const Auth = require('./auth')

const data = {
  service: 'my service',
  role: 'my role',
  session: 'my session',
  secret: 'test secret',
  timestamp: new Date().getTime(),
  expiration: 3.6e6
}
const meta = {
  name: 'Bruce Wayne',
  nickname: 'Batman',
  avatar: 'https://gotham.com/batman.jpeg',
  email: 'batman@gotham.com'
}

describe('Token Helper Error', () => {
  it('should throw error when no secret defined', () => {
    expect(() => new Auth({})).toThrow()
  })
  it('should fail when token is invalid', () => {
    const auth = new Auth({ secret: 'test secret' })
    expect(auth.verifyToken('caca')).toBe(false)
  })
  it('should fail if signature does not match', () => {
    const otherAuth = new Auth({ secret: 'other secret' })
    const auth = new Auth({ secret: 'test secret' })
    const otherToken = otherAuth.generateToken()
    expect(auth.verifyToken(otherToken)).toBe(false)
  })
  it('should fail if token is expired', () => {
    const oldAuth = new Auth({ secret: 'test secret', expiration: -3.6e6 })
    const auth = new Auth({ secret: 'test secret' })
    const oldToken = oldAuth.generateToken()
    expect(auth.verifyToken(oldToken)).toBe(false)
  })
})

describe('Token Helper Success', () => {
  beforeEach(() => {
    delete global.window
  })
  it('should parse a token in browser', () => {
    global.window = {
      atob: (str) => Buffer.from(str, 'base64').toString('binary')
    }
    const auth = new Auth(data)
    const token = auth.generateToken()
    const dataNoSecret = { ...data }
    delete dataNoSecret.secret
    expect(auth.parseToken(token)).toEqual(dataNoSecret)
  })
  it('should generate a verified token', () => {
    const auth = new Auth(data)
    const token = auth.generateToken()
    expect(auth.verifyToken(token)).toBe(true)
  })
  it('should generate a verified token w/o expiration or timestamp', () => {
    const dta = { ...data }
    delete dta.expiration
    delete dta.timestamp
    const auth = new Auth(dta)
    const token = auth.generateToken()
    expect(auth.verifyToken(token)).toBe(true)
  })
  it('should return same data as provided', () => {
    const auth = new Auth(data)
    const token = auth.generateToken(meta)
    const parsedData = auth.parseToken(token)
    const dataNoSecret = { ...data }
    delete dataNoSecret.secret
    expect(parsedData).toEqual({ meta, ...dataNoSecret })
  })
})
