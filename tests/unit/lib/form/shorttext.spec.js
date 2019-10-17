import Vue from 'vue'
import Field from 'vant/lib/field'
import CellGroup from 'vant/lib/cell-group'
import Cell from 'vant/lib/cell'
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(Field)

import Shorttext from '@/lib/form/widget/shorttext'

import { mount } from '@vue/test-utils'

import sanitizeHtml from 'sanitize-html'
sanitizeHtml.defaults.allowedTags.push('img')

describe('tms-form', function() {
    describe('shorttext', function() {
        describe('editor', function() {
            it('组件渲染', () => {
                let widget = new Shorttext({ id: 'foo', type: 'shorttext', title: '单行填写题' })
                let comp = Vue.component('tms-form-shorttext', widget.editor)
                const wrapper = mount(comp)
                expect(wrapper.html()).toBe(
                    '<div class="van-cell-group van-hairline--top-bottom tms-form-shorttext"><div class="van-cell van-field"><div class="van-cell__title van-field__label"><span>单行填写题</span></div><div class="van-cell__value"><div class="van-field__body"><input type="text" class="van-field__control"></div></div></div></div>'
                )
                wrapper.destroy()
            })
            it('使用组件', () => {
                let widget = new Shorttext({ id: 'foo', type: 'shorttext', title: '单行填写题' })
                Vue.component('tms-form-shorttext', widget.editor)
                let form = Vue.component('tms-form', {
                    props: {
                        data: {
                            type: Object,
                            default: () => {
                                return { foo: 'before value' }
                            }
                        }
                    },
                    render(h) {
                        let formData = this.data
                        return h('form', [h('tms-form-shorttext', { props: { formData } })])
                    }
                })
                const wrapper = mount(form)
                expect(wrapper.html()).toBe(
                    '<form><div class="van-cell-group van-hairline--top-bottom tms-form-shorttext"><div class="van-cell van-field"><div class="van-cell__title van-field__label"><span>单行填写题</span></div><div class="van-cell__value"><div class="van-field__body"><input type="text" class="van-field__control"></div></div></div></div></form>'
                )
                const textInput = wrapper.find('input[type="text"]')
                expect(textInput.element.value).toBe('before value')
                textInput.setValue('after value')
                expect(wrapper.vm.data.foo).toBe('after value')
                wrapper.destroy()
            })
            it('使用组件-过滤输入内容', () => {
                let widget = new Shorttext({ id: 'foo', type: 'shorttext', title: '单行填写题' })
                Vue.component('tms-form-shorttext', widget.editor)
                let form = Vue.component('tms-form', {
                    props: {
                        data: {
                            type: Object,
                            default: () => {
                                return { foo: '' }
                            }
                        }
                    },
                    render(h) {
                        let formData = this.data
                        return h('form', [h('tms-form-shorttext', { props: { formData } })])
                    }
                })
                const wrapper = mount(form)
                const textInput = wrapper.find('input[type="text"]')
                textInput.setValue('<img src=x onerror=alert("img") />')
                expect(wrapper.vm.data.foo).toBe('<img src="x" />')
                wrapper.destroy()
            })
        })
        describe('viewer', function() {
            it('组件渲染', () => {
                let widget = new Shorttext({ id: 'foo', type: 'shorttext', title: '单行填写题' })
                let comp = Vue.component('tms-form-shorttext', widget.viewer)
                const wrapper = mount(comp, { propsData: { formData: { foo: 'current value' } } })
                expect(wrapper.html()).toBe(
                    '<div class="van-cell-group van-hairline--top-bottom tms-form-shorttext"><div class="van-cell"><div class="van-cell__title"><span>单行填写题</span></div><div class="van-cell__value"><span>current value</span></div></div></div>'
                )
                wrapper.destroy()
            })
            it('组件渲染-过滤显示内容', () => {
                let widget = new Shorttext({ id: 'foo', type: 'shorttext', title: '单行填写题' })
                let comp = Vue.component('tms-form-shorttext', widget.viewer)
                const wrapper = mount(comp, { propsData: { formData: { foo: '<img src=x onerror=alert("img") />' } } })
                expect(wrapper.html()).toBe(
                    '<div class="van-cell-group van-hairline--top-bottom tms-form-shorttext"><div class="van-cell"><div class="van-cell__title"><span>单行填写题</span></div><div class="van-cell__value"><span>&lt;img src="x" /&gt;</span></div></div></div>'
                )
                wrapper.destroy()
            })
        })
    })
})
