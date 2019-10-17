import Vue from 'vue'
import CellGroup from 'vant/lib/cell-group'
import Cell from 'vant/lib/cell'
import VanCheckboxGroup from 'vant/lib/checkbox-group'
import VanCheckbox from 'vant/lib/checkbox'
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(VanCheckboxGroup)
Vue.use(VanCheckbox)

import Multiple from '@/lib/form/widget/multiple'

import { mount } from '@vue/test-utils'

describe('tms-form', function() {
    describe('multiple', function() {
        describe('editor', function() {
            it('组件渲染', () => {
                let widget = new Multiple({
                    id: 'foo',
                    type: 'multiple',
                    title: '多选题',
                    ops: [{ l: '选项1', v: 'v1' }, { l: '选项2', v: 'v2' }]
                })
                let comp = Vue.component('tms-form-multiple', widget.editor)
                const wrapper = mount(comp)
                expect(wrapper.html()).toBe(
                    '<div class="van-cell-group van-hairline--top-bottom tms-form-multiple"><div class="van-cell"><div class="van-cell__value van-cell__value--alone"><span>多选题</span></div></div><div class="van-cell"><div class="van-cell__value van-cell__value--alone"><div class="van-checkbox-group"><div role="checkbox" tabindex="0" aria-checked="false" class="van-checkbox"><div class="van-checkbox__icon van-checkbox__icon--round"><i class="van-icon van-icon-success"><!----></i></div><span class="van-checkbox__label">选项1</span></div><div role="checkbox" tabindex="0" aria-checked="false" class="van-checkbox"><div class="van-checkbox__icon van-checkbox__icon--round"><i class="van-icon van-icon-success"><!----></i></div><span class="van-checkbox__label">选项2</span></div></div></div></div></div>'
                )
                wrapper.destroy()
            })
            it('使用组件', () => {
                let widget = new Multiple({
                    id: 'foo',
                    type: 'multiple',
                    title: '多选题',
                    ops: [{ l: '选项1', v: 'v1' }, { l: '选项2', v: 'v2' }]
                })
                Vue.component('tms-form-multiple', widget.editor)
                let form = Vue.component('tms-form', {
                    props: {
                        data: {
                            type: Object,
                            default: () => {
                                return { foo: ['v1'] }
                            }
                        }
                    },
                    render(h) {
                        let formData = this.data
                        return h('form', [h('tms-form-multiple', { props: { formData } })])
                    }
                })
                const wrapper = mount(form)
                expect(wrapper.html()).toBe(
                    '<form><div class="van-cell-group van-hairline--top-bottom tms-form-multiple"><div class="van-cell"><div class="van-cell__value van-cell__value--alone"><span>多选题</span></div></div><div class="van-cell"><div class="van-cell__value van-cell__value--alone"><div class="van-checkbox-group"><div role="checkbox" tabindex="0" aria-checked="true" class="van-checkbox"><div class="van-checkbox__icon van-checkbox__icon--round van-checkbox__icon--checked"><i class="van-icon van-icon-success"><!----></i></div><span class="van-checkbox__label">选项1</span></div><div role="checkbox" tabindex="0" aria-checked="false" class="van-checkbox"><div class="van-checkbox__icon van-checkbox__icon--round"><i class="van-icon van-icon-success"><!----></i></div><span class="van-checkbox__label">选项2</span></div></div></div></div></div></form>'
                )
                const icons = wrapper.findAll('.van-checkbox__icon')
                icons.at(1).trigger('click')
                expect(wrapper.vm.data.foo).toEqual(['v1', 'v2'])
                icons.at(0).trigger('click')
                expect(wrapper.vm.data.foo).toEqual(['v2'])
                wrapper.destroy()
            })
        })
        describe('viewer', function() {
            it('组件渲染', () => {
                let widget = new Multiple({
                    id: 'foo',
                    type: 'multiple',
                    title: '多选题',
                    ops: [{ l: '选项1', v: 'v1' }, { l: '选项2', v: 'v2' }, { l: '选项3', v: 'v3' }]
                })
                let comp = Vue.component('tms-form-multiple', widget.viewer)
                const wrapper = mount(comp, { propsData: { formData: { foo: ['v1', 'v3'] } } })
                expect(wrapper.html()).toBe(
                    '<div class="van-cell-group van-hairline--top-bottom tms-form-multiple"><div class="van-cell"><div class="van-cell__title"><span>多选题</span></div><div class="van-cell__value"><span>选项1,选项3</span></div></div></div>'
                )
                wrapper.destroy()
            })
        })
    })
})
