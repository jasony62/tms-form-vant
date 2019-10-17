<template>
  <div class="editor">
    <van-panel title="动态表单" status="修改">
      <div>
        <tms-form :schemas="schemas" :data="data"></tms-form>
      </div>
      <div slot="footer">
        <van-button type="default" @click="submit()">提交</van-button>
      </div>
    </van-panel>
  </div>
</template>

<script>
import Vue from 'vue'
import { Panel as VanPanel, Button as VanButton } from 'vant'
Vue.use(VanPanel)
Vue.use(VanButton)

import { TmsForm } from '@/lib/form'

export default {
  components: { TmsForm, VanPanel, VanButton },
  props: { schemas: { type: Array }, data: { type: Object } },
  methods: {
    submit() {
      this.$parent.mode = 'viewer'
    }
  }
}
</script>