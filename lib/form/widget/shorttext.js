const { props } = require('./common')
const AS_EDITOR_OPTIONS = Symbol('as_editor_options')
const AS_VIEWER_OPTIONS = Symbol('as_viewer_options')

const sanitizeHtml = require('sanitize-html')

class Shorttext {
    constructor(schema) {
        this.schema = schema
    }
    get editor() {
        if (!this[AS_EDITOR_OPTIONS]) {
            const schema = this.schema
            this[AS_EDITOR_OPTIONS] = {
                props,
                render() {
                    const formData = this.formData
                    const initValue = typeof formData[schema.id] === 'string' ? formData[schema.id] : ''
                    const configs = {
                        on: {
                            input: function(newVal) {
                                let sanitized = sanitizeHtml(newVal)
                                formData[schema.id] = sanitized
                            }
                        }
                    }
                    return (
                        <van-cell-group class="tms-form-shorttext">
                            <van-field label={schema.title} value={initValue} {...configs}></van-field>
                        </van-cell-group>
                    )
                }
            }
        }

        return this[AS_EDITOR_OPTIONS]
    }
    get viewer() {
        if (!this[AS_VIEWER_OPTIONS]) {
            const schema = this.schema
            this[AS_VIEWER_OPTIONS] = {
                props,
                render() {
                    const currentValue = this.formData ? this.formData[schema.id] : ''
                    const sanitized = typeof currentValue === 'string' ? sanitizeHtml(currentValue) : ''
                    return (
                        <van-cell-group class="tms-form-shorttext">
                            <van-cell title={schema.title} value={sanitized}></van-cell>
                        </van-cell-group>
                    )
                }
            }
        }
        return this[AS_VIEWER_OPTIONS]
    }
}

export { Shorttext }

export default Shorttext
