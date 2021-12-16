const express = require('express')
const app = express()
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

require('dotenv').config()
require('express-async-errors')

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

app.use(express.json())

app.get('/',(req,res) => {
    res.send('<h1>Strore Api</h1><a href="/api/v1/products">products route </a>')
})

app.use('/api/v1/products',productsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)
 
const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening at port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
