const express = require('express')
const app = express()
const router = require('./routes')

app.use(express.json())
app.use(router)

const port = 3000
app.listen(port, () => console.log(`Servidor iniciado em http://localhost:${port}`))