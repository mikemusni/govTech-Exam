import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

dotenv.config()

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  // eslint-disable-next-line n/no-path-concat
  entities: [__dirname + '/entities/*.{js,ts}', __dirname + '../dist/entities/*.{js,ts}'],
  // eslint-disable-next-line n/no-path-concat
  migrations: [__dirname + '/migrations/*.{js,ts}', __dirname + '../dist/entities/*.{js,ts}']
})

export default dataSource
