const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const WidgetController = require('./controllers/WidgetController')
const ConfigController = require('./controllers/ConfigController')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.post('/add',
    WidgetController.add)

  app.post('/remove',
    WidgetController.remove)

  app.post('/widget',
    WidgetController.widget)

  app.get('/about.json',
    ConfigController.config)
}