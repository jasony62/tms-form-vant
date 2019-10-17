import Form from '@/lib/form/Form.vue'
import { mount } from '@vue/test-utils'

describe('tms-form', function() {
    describe('form', function() {
        it('组件渲染', () => {
            const wrapper = mount(Form, {
                propsData: {
                    data: { s1: 'before value' },
                    schemas: [{ id: 's1', type: 'shorttext' }]
                }
            })
            expect(wrapper.html()).toBe(
                '<form><div class="tms-form-schema"><div class="tms-form-shorttext"><div class="van-cell van-field"><div class="van-cell__value van-cell__value--alone"><div class="van-field__body"><input type="text" class="van-field__control"></div></div></div></div></div></form>'
            )
            const textInput = wrapper.find('input[type="text"]')
            expect(textInput.element.value).toBe('before value')
            textInput.setValue('after value')
            expect(wrapper.vm.data['s1']).toBe('after value')
            wrapper.destroy()
        })
    })
})
