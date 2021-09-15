<template>
  <a class="linkbox" :href="fullMessage">
    <div class="corebox smsbox">{{ text }}</div>
  </a>
</template>

<script>
export default {
  name: 'SmsCard',
  props: {
    text: String,
    message: String,
  },
  computed: {
    fullMessage() {
      return 'sms:1922?body=' + this.message.replaceAll('\n', '%0A')
    },
  },
}
</script>
