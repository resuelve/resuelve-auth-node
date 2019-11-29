const TokenHelper = require('./auth')

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
    expect(() => new TokenHelper({})).toThrow()
  })
  it('should fail when token is invalid', () => {
    const tokenHelper = new TokenHelper({ secret: 'test secret' })
    expect(tokenHelper.verifyToken('caca')).toBe(false)
  })
})

describe('Token Helper Success', () => {
  it('should generate a verified token', () => {
    const tokenHelper = new TokenHelper(data)
    const token = tokenHelper.generateToken()
    expect(tokenHelper.verifyToken(token)).toBe(true)
  })
  it('should return same data as provided', () => {
    const tokenHelper = new TokenHelper(data)
    const token = tokenHelper.generateToken(meta)
    const parsedData = tokenHelper.parseToken(token)
    const dataNoSecret = { ...data }
    delete dataNoSecret.secret
    expect(parsedData).toEqual({ meta, ...dataNoSecret })
  })
})
