import 'reflect-metadata'
import express, { json } from 'express'
import routes from './config/routes'
import { AppDataSource } from '../infra/db/typeorm/helper/app-data-source'

const app = express()
app.use(json())


routes(app)

app.all('*', function (req,res) {
    res.status(408).json({
        message: 'invalid http verb'
    })
})

AppDataSource
    .getInstance()
    .initialize()
    .then(()=>app.listen(3000,()=>console.log('servidor iniciado')))
    .catch(error => console.log(error))
