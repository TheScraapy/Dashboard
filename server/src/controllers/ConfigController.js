module.exports = {
  async config(req, res) {
    res.send({
      "client": {
        "host": req.connection.remoteAddress.split(":")[3]
      },
      "server": {
        "current_time": Date.now(),
        "services": [{
          "name": "youtube",
          "widgets": [{
            "name": "subs",
            "description": "Display the subcount of given channel",
            "params": [{
              "name": "channel",
              "type": "string"
            }]
          },
          {
            "name": "views",
            "description": "Display the viewcount of given channel",
            "params": [{
              "name": "channel",
              "type": "string"
            }]
          },
          {
            "name": "videos",
            "description": "Display the videocount of given channel",
            "params": [{
              "name": "channel",
              "type": "string"
            }]
          }]
        },
        {
          "name": "twitch",
          "widgets": [{
            "name": "channels",
            "description": "Display the top 5 streams for a given game",
            "params": [{
              "name": "game",
              "type": "string"
            }]
          }]
        }]
      }
    })
  }
}