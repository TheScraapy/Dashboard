const {Widget} = require('../models')

module.exports = {
  async add (req, res) {
    try {
      const widget = await Widget.create(req.body)
      res.send(widget.toJSON())
    } catch (err) {
      res.status(500).send({
        error: 'Unable to create widget'
      })
    }
  },
  async remove (req, res) {
    try {
      const {email, widget, data} = req.body
      await Widget.destroy({
        where: {
          email: email,
          widget: widget,
          data: data
        }
      }).then(function(rowsDeleted) {
        if (rowsDeleted == 0)
          res.status(500).send({
            error: 'Unable to delete widget'
          })
      })
      res.send({
        success: 'Successfully deleted widget'
      })
    } catch (err) {
      res.status(500).send({
        error: 'Unable to delete widget'
      })
    }
  },
  async widget (req, res) {
    try {
      const {email} = req.body
      const results = await Widget.findAll({
        where: {
          email: email
        },
        raw: true
      })
      res.send(results)
    } catch (err) {
      res.status(500).send({
        error: 'Unable to get widget list'
      })
    }
  }
}