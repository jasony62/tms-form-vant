import Shorttext from './widget/shorttext'
import Longtext from './widget/longtext'
import Single from './widget/single'
import Multiple from './widget/multiple'
import Image from './widget/image'

class Schema {
    constructor() {}
    get component() {
        return {
            props: { data: { type: Object }, schema: { type: Object }, readonly: { type: Boolean, default: false } },
            render: function(h) {
                if (typeof this.schema !== 'object' || typeof this.schema.type !== 'string')
                    return h('div', { class: 'tms-form-schema' })

                let widget, comp
                switch (this.schema.type) {
                    case 'shorttext':
                        widget = new Shorttext(this.schema)
                        break
                    case 'longtext':
                        widget = new Longtext(this.schema)
                        break
                    case 'single':
                        widget = new Single(this.schema, { style: { 'margin-bottom': '8px' } })
                        break
                    case 'multiple':
                        widget = new Multiple(this.schema, { style: { 'margin-bottom': '8px' } })
                        break
                    case 'image':
                        widget = new Image(this.schema)
                        break
                }
                if (widget)
                    comp = h(this.readonly ? widget.viewer : widget.editor, {
                        props: { formData: this.data }
                    })
                else comp = `unknown schema: ${this.schema.type}`

                return h('div', { class: 'tms-form-schema' }, [comp])
            }
        }
    }
}

export { Schema }

export default Schema
