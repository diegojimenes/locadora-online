import express from 'express'
import router from './src/routes/routes'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDocs from 'swagger-jsdoc'
const app = express()
const port = 3001
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'locadora online',
            version: '1.0.0',
            description: 'sistema de locação de filmes',
            contact: {
                name: 'diego jimenes'
            },
            servers: ['http://localhost:3001']
        }
    },
    apis: ['./dist/src/controllers/*.js']
}

const swaggerDocs = swaggerJsDocs(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use(express.json())
app.use('/', router)

app.listen(port, () => {
    console.log(`server is listening on ${port}`)
})