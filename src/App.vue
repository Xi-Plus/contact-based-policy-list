<template>
  <div>
    如有錯誤、缺漏、其他建議請在<a
      href="https://github.com/Xi-Plus/contact-based-policy-list/issues"
      target="_blank"
      >Github</a
    >、 <a href="http://t.me/xiplus" target="_blank">Telegram</a>、<a
      href="http://m.me/xiplus.dev"
      >Facebook Messenger</a
    >回報。
  </div>
  <div>
    <div
      class="linkbox corebox"
      style="background-color: #00ffff"
      @click="useGPS"
    >
      <div>GPS定位</div>
      <div v-if="gpsStatus"><br />{{ gpsStatus }}</div>
      <div v-if="userCoords">
        <span style="font-size: 50px">目前位置</span><br>
        <span style="font-size: 60px">{{ userCoords.latitude.toFixed(7) }}</span><br>
        <span style="font-size: 60px">{{ userCoords.longitude.toFixed(7) }}</span>
      </div>
    </div>
    <sms-card
      v-for="position in flattenPositions"
      v-bind:key="position.text"
      v-bind:message="position.sms"
      v-bind:text="position.text"
    ></sms-card>
    {{ sortedPositions }}
  </div>
</template>

<script>
import { getDistance } from 'geolib';
import SmsCard from './components/SmsCard.vue';
import positions from './data.js';

export default {
  components: { SmsCard },
  name: 'App',
  data() {
    return {
      gpsStatus: '',
      positions: positions,
      userCoords: null,
    };
  },
  computed: {
    sortedPositions() {
      if (this.userCoords === null) {
        return positions;
      }
      var res = this.positions.map((pos) => {
        pos.distance = getDistance(pos.coords, this.userCoords);
        return pos;
      });
      res.sort((a, b)=> {
        return a.distance - b.distance;
      });
      return res;
    },
    flattenPositions() {
      var flattenArray = [];
      for (const position of this.sortedPositions) {
        flattenArray.push({
          text: position.text,
          sms: position.sms,
        });
        if (position.subPositions) {
          for (const subPosition of position.subPositions) {
            flattenArray.push({
              text: subPosition.text,
              sms: subPosition.sms,
            });
          }
        }
      }
      return flattenArray;
    },
  },
  methods: {
    useGPS() {
      if (!navigator.geolocation) {
        this.gpsStatus = '您目前使用的瀏覽器不支援定位';
      } else {
        this.gpsStatus = '定位中...';

        let self = this;

        var success = function(position) {
          self.userCoords = { latitude: position.coords.latitude, longitude: position.coords.longitude };
          self.gpsStatus = '';
        };

        var error = function() {
          self.gpsStatus = '定位失敗';
          // self.userCoords = { latitude: 24.787618, longitude: 120.997957 };
        };

        const options = {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 27000,
        };
        navigator.geolocation.getCurrentPosition(success, error, options);
      }
    },
  },
};
</script>

<style>
.linkbox {
  text-decoration: none;
  float: left;
}

.corebox {
  cursor: pointer;
  height: 400px;
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 72px;
  margin: 10px;
}

.smsbox {
  color: black;
  background-color: greenyellow;
  white-space: pre;
}
</style>
