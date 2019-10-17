import Vue from 'vue'
import CellGroup from 'vant/lib/cell-group'
import Cell from 'vant/lib/cell'
import RadioGroup from 'vant/lib/radio-group'
import Radio from 'vant/lib/radio'
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(RadioGroup)
Vue.use(Radio)

import Single from '@/lib/form/widget/single'

import { mount } from '@vue/test-utils'

describe('tms-form', function() {
    describe('single', function() {
        describe('editor', function() {
            it('组件渲染', () => {
                let widget = new Single({
                    id: 'foo',
                    type: 'single',
                    title: '单选题',
                    ops: [{ l: '选项1', v: 'v1' }, { l: '选项2', v: 'v2' }]
                })
                let comp = Vue.component('tms-form-single', widget.editor)
                const wrapper = mount(comp)
                expect(wrapper.html()).toBe(
                    '<div class="van-cell-group van-hairline--top-bottom tms-form-single"><div class="van-cell"><div class="van-cell__value van-cell__value--alone"><span>单选题</span></div></div><div class="van-cell"><div class="van-cell__value van-cell__value--alone"><div role="radiogroup" class="van-radio-group"><div role="radio" tabindex="-1" aria-checked="false" class="van-radio"><div class="van-radio__icon van-radio__icon--round"><i class="van-icon van-icon-success"><!----></i></div><span class="van-radio__label">选项1</span></div><div role="radio" tabindex="-1" aria-checked="false" class="van-radio"><div class="van-radio__icon van-radio__icon--round"><i class="van-icon van-icon-success"><!----></i></div><span class="van-radio__label">选项2</span></div></div></div></div></div>'
                )
                wrapper.destroy()
            })
            it('使用组件', () => {
                let widget = new Single({
                    id: 'foo',
                    type: 'single',
                    title: '单选题',
                    ops: [{ l: '选项1', v: 'v1' }, { l: '选项2', v: 'v2' }]
                })
                Vue.component('tms-form-single', widget.editor)
                let form = Vue.component('tms-form', {
                    props: {
                        data: {
                            type: Object,
                            default: () => {
                                return { foo: 'v1' }
                            }
                        }
                    },
                    render(h) {
                        let formData = this.data
                        return h('form', [h('tms-form-single', { props: { formData } })])
                    }
                })
                const wrapper = mount(form)
                expect(wrapper.html()).toBe(
                    '<form><div class="van-cell-group van-hairline--top-bottom tms-form-single"><div class="van-cell"><div class="van-cell__value van-cell__value--alone"><span>单选题</span></div></div><div class="van-cell"><div class="van-cell__value van-cell__value--alone"><div role="radiogroup" class="van-radio-group"><div role="radio" tabindex="0" aria-checked="true" class="van-radio"><div class="van-radio__icon van-radio__icon--round van-radio__icon--checked"><i class="van-icon van-icon-success"><!----></i></div><span class="van-radio__label">选项1</span></div><div role="radio" tabindex="-1" aria-checked="false" class="van-radio"><div class="van-radio__icon van-radio__icon--round"><i class="van-icon van-icon-success"><!----></i></div><span class="van-radio__label">选项2</span></div></div></div></div></div></form>'
                )
                const icons = wrapper.findAll('.van-radio__icon')
                icons.at(1).trigger('click')
                expect(wrapper.vm.data.foo).toBe('v2')
                wrapper.destroy()
            })
        })
        describe('viewer', function() {
            it('组件渲染', () => {
                let widget = new Single({
                    id: 'foo',
                    type: 'single',
                    title: '单选题',
                    ops: [{ l: '选项1', v: 'v1' }, { l: '选项2', v: 'v2' }, { l: '选项3', v: 'v3' }]
                })
                let comp = Vue.component('tms-form-single', widget.viewer)
                const wrapper = mount(comp, { propsData: { formData: { foo: 'v2' } } })
                expect(wrapper.html()).toBe(
                    '<div class="van-cell-group van-hairline--top-bottom tms-form-single"><div class="van-cell"><div class="van-cell__title"><span>单选题</span></div><div class="van-cell__value"><span>选项2</span></div></div></div>'
                )
                wrapper.destroy()
            })
        })
    })
})
