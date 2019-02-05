<template>
  <div>
    <div v-if="!$store.state.isUserLoggedIn">
      <h1 class="pb-5">Welcome to RainbowDashboard, please Login/Register</h1>
      <img src="../assets/logo.png">
    </div>
    <div id="widgetcontainer" v-if="$store.state.isUserLoggedIn">
      <div v-for="widget in widgets" :key="widget.socket">
        <Widget>
          <WidgetHeading :Title="widget[5]" :TextColor="true" :DeleteButton="true" :ColorBox="true" :Reset="true" :Expand="true" :Collapse="true"></WidgetHeading>
            <WidgetBody>
              <div v-if="!widget[0].startsWith('channel')">
                <h1>{{widget[3]}}</h1>
                <h2>{{widget[1]}} {{widget[4]}}</h2>
                <h3>Last update : {{widget[2]}}</h3>
              </div>
              <div v-if="widget[0].startsWith('channel')">
                <h1>{{widget[3]}}</h1>
                <h2 v-for="streams in widget[1]" :key="streams">
                  {{streams}}
                </h2>
                <h3>Last update : {{widget[2]}}</h3>
              </div>
            </WidgetBody>
          </Widget>
      </div>

      <v-menu offset-y>
      <v-btn slot="activator" relative dark fab bottom right color="green">
        <v-icon>+</v-icon>
          </v-btn>
        <v-list>
          <v-list-tile v-for="(item, index) in this.items" :key="index" @click="testDropdownMenu(item.title)">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>

    <v-dialog v-model="YoutubeModal" width="500">
      <v-card>
        <v-card-title class="headline red lighten-2 white--text" primary-title center>Youtube</v-card-title>
          <div class="pt-4">
            <input id="subs" type="radio" v-model="YoutubeRadio" name="youtube" value="subs"/>
            <label for="subs">Subs</label><br/>
            <input id="views" type="radio" v-model="YoutubeRadio" name="youtube" value="views"/>
            <label for="views">Views</label><br/>
            <input id="videos" type="radio" v-model="YoutubeRadio" name="youtube" value="videos"/>
            <label for="videos">Videos</label><br/>
          </div>
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-text-field label="Channel" v-model="channelname" />
          </div>
        <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="createWidget()">Submit</v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="TwitchModal" width="500">
      <v-card>
        <v-card-title class="headline purple lighten-2 white--text" primary-title center>Twitch</v-card-title>
        <v-card-text>Select game</v-card-text>
        <div class="pb-3">
          <input id="pubg" type="radio" v-model="twitchradio" name="twitch" value="493057"/>
          <label for="pubg">Player Unknown's Battlegrounds</label><br/>
          <input id="csgo" type="radio" v-model="twitchradio" name="twitch" value="32399"/>
          <label for="csgo">Counter Strike: Global Offensive</label><br/>
          <input id="fartnite" type="radio" v-model="twitchradio" name="twitch" value="33214"/>
          <label for="fartnite">Fortnite</label><br/>
        </div>
        <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="createWidget()">Submit</v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="UpdateModal" width="500">
      
    </v-dialog>

  </div>
</template>

<script>
import io from 'socket.io-client'
import WidgetManager from '@/services/WidgetManager'
export default {
  data () {
    return {
      socket: null,
      YoutubeModal: false,
      TwitchModal: false,
      UpdateModal: false,
      channelname: null,
      YoutubeRadio: null,
      twitchradio: null,
      service: null,
      items: [
        { title: 'Youtube' },
        { title: 'Twitch' }
      ],
      widgets: {},
      id_counter: 0,
      addWidgetToBase: true
    }
  },
  async mounted() {
      this.socket = io('http://localhost:8081')
      var widgettosend = ""
      var datatosend = ""
      if (this.$store.state.isUserLoggedIn) {
        
        const response = await WidgetManager.widget({
          email: this.$store.state.user.email,
        })
        this.addWidgetToBase = false
        for (var item in response.data) {
          switch(response.data[item].widget) {
            case "subs":
              this.YoutubeRadio = response.data[item].widget
              this.channelname = response.data[item].data
              break
            case "views":
              this.YoutubeRadio = response.data[item].widget
              this.channelname = response.data[item].data
              break
            case "videos":
              this.YoutubeRadio = response.data[item].widget
              this.channelname = response.data[item].data
              break
            case "channels":
              this.twitchradio = response.data[item].data
              break
            default:
              break
          }
          this.createWidget()
        }
        this.addWidgetToBase = true
      }
  },
  methods: {
    testDropdownMenu(title) {
      if (title == 'Youtube') {
        this.service = title
        this.YoutubeModal = true
      } else if (title == 'Twitch') {
        this.service = title
        this.TwitchModal = true
      }
    },
    async createWidget() {
      if ((this.channelname != null && this.YoutubeRadio != null) || this.twitchradio != null) {
        this.YoutubeModal = false
        this.TwitchModal = false
        var emailtosend = this.$store.state.user.email
        if (this.twitchradio == null) {
          var widgettosend = this.YoutubeRadio
          var datatosend = this.channelname
        } else {
          var widgettosend = "channels"
          var datatosend = this.twitchradio
        }

        if (this.addWidgetToBase == true) {
          const response = await WidgetManager.add({
            email: emailtosend,
            widget: widgettosend,
            data: datatosend
          })
        }

        const socket_id = widgettosend + '-' + datatosend
        const unique_id = datatosend + this.id_counter
        this.id_counter++
        
        var widgetTitle = ""
        var datatype = ""
        switch(widgettosend) {
          case "subs":
            widgetTitle = "Youtube Subscriber Counter"
            datatype = "subscribers"
            break
          case "views":
            widgetTitle = "Youtube Views Counter"
            datatype = "views"
            break
          case "videos":
            widgetTitle = "Youtube Video Counter"
            datatype = "videos"
            break
          case "channels":
            widgetTitle = "Top 5 Twitch streams"
            datatype = ""
            break
          default:
            break
        }

        if (socket_id.startsWith('channel')) {
          this.widgets[unique_id] = [socket_id, [], new Date().toLocaleString(), datatosend, datatype, widgetTitle]
        } else  {
          this.widgets[unique_id] = [socket_id, 0, new Date().toLocaleString(), datatosend, datatype, widgetTitle]
        }
        switch(datatosend) {
          case "493057":
            this.widgets[unique_id][3] = "Player Unknown's Battlegrounds"
            break
          case "32399":
            this.widgets[unique_id][3] = "Counter Strike: Global Offensive"
            break
          case "33214":
            this.widgets[unique_id][3] = "Fortnite"
            break
          default:
            break
        }

        this.socket.on(this.widgets[unique_id][0], (data) => {
          if (this.widgets[unique_id][0].startsWith('channel')) {
            this.widgets[unique_id][1][0] = "1 - Title : " + data[1].title + ", viewers : " + data[1].viewers
            this.widgets[unique_id][1][1] = "2 - Title : " + data[2].title + ", viewers : " + data[2].viewers
            this.widgets[unique_id][1][2] = "3 - Title : " + data[3].title + ", viewers : " + data[3].viewers
            this.widgets[unique_id][1][3] = "4 - Title : " + data[4].title + ", viewers : " + data[4].viewers
            this.widgets[unique_id][1][4] = "5 - Title : " + data[5].title + ", viewers : " + data[5].viewers
          } else {
            this.widgets[unique_id][1] = data
          }
          this.widgets[unique_id][2] = new Date().toLocaleString()
          this.UpdateModal = true
          this.UpdateModal = false
        })

        this.channelname =  null
        this.YoutubeRadio = null
        this.twitchradio = null
        this.service = null

      } else {
        console.log("Please choose widget AND channel OR a game")
      }
    }
  }
}
</script>

<style scoped>
</style>
