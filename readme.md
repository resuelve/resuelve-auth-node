Token Helper
==================

Token Helper es la versión del resuelve-auth pero hecho 100% en node

### Modo de uso

```javascript
const TokenHelper = require('@resuelve/token-helper')
const setup = {
  secret: 'test secret',  //requerido
  service: 'my service', // opcional
  role: 'my role', // opcional
  session: 'my session', // opcional
  timestamp: 1575068419977 // opcional
}
const metaData = {} // cualquier objeto tipo JSON
const tokenHelper = new TokenHelper(setup)
const token = tokenHelper.generateToken(metaData)
const parsedData = tokenHelper.parseToken(token)
parsedData = {
  meta: {}, // metaData
  service: '' // lo mismo que definido en el setup
  role: '' // lo mismo que definido en el setup
  session: '' // lo mismo que definido en el setup
  timestamp: '' // lo mismo que definido en el setup o auto generado
}
```
