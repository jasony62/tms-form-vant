<template>
  <div class="viewer">
    <van-panel title="动态表单">
      <div>
        <tms-form :schemas="schemas" :data="data" :readonly="true"></tms-form>
      </div>
      <div slot="footer">
        <van-button type="default" @click="edit()">修改</van-button>
      </div>
    </van-panel>
  </div>
</template>

<script>
import Vue from 'vue'
import { Panel as VanPanel, Button as VanButton } from 'vant'
Vue.use(VanPanel).use(VanButton)

import { TmsForm } from '@/lib'

export default {
  components: { TmsForm, VanPanel, VanButton },
  props: { schemas: { type: Array }, data: { type: Object } },
  methods: {
    edit() {
      this.$parent.mode = 'editor'
    }
  }
}
</script>