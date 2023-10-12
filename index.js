const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()


const app = express()
const PORT = process.env.PORT || 5000

// * cors setting *
const whitelist = ['http://localhost:5000']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Denied by CORS'))
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  app.use(cors())

  /* Set security HTTP headers */
  /* For Error ERR_BLOCKED_BY_RESPONSE.NotSameOrigin 200 
  */

  app.use(helmet({crossOriginResourcePolicy: false}))
} else {
  app.use(cors())
}

// * Accept Json & form-urlencoded *

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// * Routes *

// * API State
app.get('/', ({res}) => {
  return res.json({
    status: 'Up',
    maintenance: false,
  })
})

app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
})