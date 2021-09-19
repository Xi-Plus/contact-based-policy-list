<template>
  <a class="linkbox" :href="fullSms">
    <div class="corebox smsbox">
      <div>{{ position.text }}</div>
      <div v-if="position.distance" style="font-size: 36px">距離約 {{ position.distance }}m</div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'SmsCard',
  props: {
    position: {
      type: Object,
      default: function () {
        return {
          text: '',
          sms: '',
          distance: null,
        }
      },
    },
  },
  computed: {
    fullSms() {
      return 'sms:1922?body=' + this.position.sms.replaceAll('\n', '%0A')
    },
  },
}
</script>
