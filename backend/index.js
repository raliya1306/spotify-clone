const express = require('express')
const config = require('./utils/config')

const app = express()

app.listen(config.PORT, () => {
    console.log(`Server running at port ${config.PORT}`)
})