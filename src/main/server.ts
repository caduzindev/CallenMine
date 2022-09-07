import 'reflect-metadata'
import express from 'express'
import routes from './config/routes'
import { AppDataSource } from '../infra/db/typeorm/helper/app-data-source'

const app = express()

routes(app)

AppDataSource
    .getInstance()
    .initialize()
    .then(()=>app.listen(3000,()=>console.log('servidor iniciado')))
    .catch(error => console.log(error))
