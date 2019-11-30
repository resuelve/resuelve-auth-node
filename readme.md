Resuelve Auth
==================

Reesuelve Auth es la versión del resuelve-auth pero hecho 100% en node

### Modo de uso

```javascript
const Auth = require('@resuelve/auth')

const setup = {
  secret: 'test secret',  //requerido
  service: 'my service', // opcional
  role: 'my role', // opcional
  session: 'my session', // opcional
  timestamp: 1575068419977 // opcional
}
const auth = new Auth(setup)

const metaData = {} // cualquier objeto tipo JSON
const token = auth.generateToken(metaData)
const parsedData = auth.parseToken(token)

/* la respuesta de parsedData trae lo siguiente
parsedData = {
  meta: {}, // lo ingresado en metaData
  service: '' // lo mismo que definido en el setup
  role: '' // lo mismo que definido en el setup
  session: '' // lo mismo que definido en el setup
  timestamp: '' // lo mismo que definido en el setup o auto generado
}
*/
```
