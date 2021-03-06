const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const server = http.Server(app)
global.io = socketIO(server)
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

sequelize.sync()
	.then(() => {
		server.listen(config.port)
		console.log(`Server start on port ${config.port}`)
		require('./services/YoutubeService')
		require('./services/TwitchService')
	})
