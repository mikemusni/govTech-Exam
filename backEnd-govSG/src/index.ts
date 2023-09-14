import dotenv from 'dotenv'
import http from 'http'
import config from './config'
import postgresConfig from './ormConfig'

dotenv.config()

const port = process.env.PORT
const server = http.createServer(config)

postgresConfig.initialize()
  .then(async () => {
    console.log('[database]: Connected')

    server.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('[database]: Error connecting to database:', error)
  })
