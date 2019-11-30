const Auth = require('./auth')

const data = {
  service: 'my service',
  role: 'my role',
  session: 'my session',
  secret: 'test secret',
  timestamp: 1575068419977
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
})

describe('Token Helper Success', () => {
  it('should generate a verified token', () => {
    const auth = new Auth(data)
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
