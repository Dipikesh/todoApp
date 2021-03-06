const express = require(`express`)
const createError = require(`http-errors`)
const app = express()
const cors = require('cors')

const logger = require('./config/logger')

const httpLogger = require('./config/httpLogger')
const routes = require('./routes')

require(`dotenv`).config()


require('./config/conn');

//To which origin , you want to share your resources
app.options('*', cors({ origin: '*', optionsSuccessStatus: 200 }))
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }))

app.use(httpLogger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use('/api', routes)

app.use((req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  var errorType = createError.isHttpError(err)
  var joiError = err.isJoi;

  if (!errorType && !joiError) {
    logger.error(`Programatic Error, Shutting down due to ${err.stack}`)
    process.exit(1)
  }
  

  res.status(err.status || 500)
  res.json({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  logger.info(`Server is runnin on port ${PORT}`)
})

process.once('SIGUSR2', function () {
  process.kill(process.pid, 'SIGUSR2')
})

process.on('SIGINT', function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, 'SIGINT')
})

// process.on("unhandledRejection", (error, p) => {
//   // Prints "unhandledRejection woops!"
//   logger.error("UnhandledRejection" + error.stack + "reason" + p);
//   process.exit(1);
// });
