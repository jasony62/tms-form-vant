import Vue from 'vue'
import Uploader from 'vant/lib/uploader'
import VanImage from 'vant/lib/image'
import CellGroup from 'vant/lib/cell-group'
import Cell from 'vant/lib/cell'
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(Uploader)
Vue.use(VanImage)

import Image from '@/lib/form/widget/image'

import { mount } from '@vue/test-utils'

describe('tms-form', function() {
    describe('image', function() {
        describe('editor', function() {
            it('组件渲染', () => {
                let widget = new Image({ id: 'foo', type: 'image', title: '上传图片' })
                let comp = Vue.component('tms-form-image', widget.editor)
                const wrapper = mount(comp)
                expect(wrapper.html()).toBe(
                    '<div class="van-cell-group van-hairline--top-bottom tms-form-image"><div class="van-cell"><div class="van-cell__value van-cell__value--alone"><span>上传图片</span></div></div><div class="van-uploader"><div class="van-uploader__wrapper"><div class="van-uploader__upload"><i class="van-icon van-icon-plus van-uploader__upload-icon"><!----></i><input multiple="multiple" type="file" accept="image/*" class="van-uploader__input"></div></div></div></div>'
                )
                wrapper.destroy()
            })
        })
        describe('viewer', function() {
            it('组件渲染', () => {
                let widget = new Image({ id: 'foo', type: 'image', title: '上传图片' })
                let comp = Vue.component('tms-form-image', widget.viewer)
                const wrapper = mount(comp, { propsData: { formData: { foo: ['v1'] } } })
                expect(wrapper.html()).toBe(
                    '<div class="van-cell-group van-hairline--top-bottom tms-form-image"><div class="van-cell"><div class="van-cell__value van-cell__value--alone"><span>上传图片</span></div></div><div class="van-image"><img src="v1" class="van-image__img"><div class="van-image__loading"><i class="van-icon van-icon-photo-o" style="font-size: 22px;"><!----></i></div></div></div>'
                )
                wrapper.destroy()
            })
        })
    })
})
