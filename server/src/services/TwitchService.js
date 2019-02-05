const { Widget } = require('../models')
const curl = require('curlrequest')

async function getLastestStats() {
  try {
    const widgets = await Widget.findAll({
      attributes: ['widget', 'data'],
      where: {
        widget: ["channels"]
      },
      raw: true
    })

    widgets.forEach(widget => {
      const options = {
        url: 'https://api.twitch.tv/helix/streams?first=5&game_id=' + widget.data,
        headers: {
          'Client-ID': 'bfci3n8hazfij1fn7xbgl8dbwvd688'
        }
      }
      curl.request(options, function (err, res) {
        if (err) {
          console.log(err)
        } else {
          var i = 1
          var json = {}

          const in_json = JSON.parse(res)
          if (typeof in_json.data == 'undefined') {
            console.log('Request on Twitch API failed')
          } else {
          in_json.data.forEach(channel => {
            json[i++] = {
              title: channel.title,
              viewers: channel.viewer_count
            }
          });
          console.log('channels-' + widget.data)
          io.emit('channels-' + widget.data, json)
        }
      }
    })
  })
  setTimeout(() => {
    getLastestStats()
  }, 10000)
} catch (err) {
  console.log("Twitch webservice failed")
}
  }

getLastestStats()