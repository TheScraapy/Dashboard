const {Widget} = require('../models')
const fetch = require('node-fetch')

async function getLastestStats() {
  try {
    const widgets = await Widget.findAll({
      attributes: ['widget', 'data'],
      where: {
        widget: ["subs", "views", "videos"]
      },
      raw: true
    })

    widgets.forEach(widget => {
      fetch("https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=" + widget.data + "&key=AIzaSyB3LpU-GDjr7j2HXoJQdBB8O_TM21V5_4k")
        .then(res => res.json())
        .then(result => {
          console.log(widget.widget + '-' + widget.data)
          switch (widget.widget) {
            case 'subs':
              io.emit('subs-' + widget.data, result.items[0].statistics.subscriberCount)
            case 'views':
              io.emit('views-' + widget.data, result.items[0].statistics.viewCount)
            case 'videos':
              io.emit('videos-' + widget.data, result.items[0].statistics.videoCount)
          }
        })
        .catch(function() {
          console.log("Request on Youtube API failed")
        })
    })
    setTimeout(() => {
      getLastestStats()
    }, 5000)
  } catch (err) {
    console.log("Youtube webservice failed")
  }
}

getLastestStats()