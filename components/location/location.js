const app = getApp();
const common = require('../../utils/common.js');
Component({
  properties: {
    show: Boolean
  },
  methods: {
    opensetting(event) {
      console.log(event)
      this.triggerEvent('upDateLocation')
    }
  }
})