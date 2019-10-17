const { props } = require('./common')
const AS_EDITOR_OPTIONS = Symbol('as_editor_options')
const AS_VIEWER_OPTIONS = Symbol('as_viewer_options')

class Multiple {
    constructor(schema, { style } = {}) {
        this.schema = schema
        this.style = style
    }
    get editor() {
        if (!this[AS_EDITOR_OPTIONS]) {
            const { schema, style } = this
            this[AS_EDITOR_OPTIONS] = {
                props,
                render() {
                    const formData = this.formData
                    const initValue = Array.isArray(formData[schema.id]) ? formData[schema.id] : []
                    const checkboxs = schema.ops.map(op => {
                        let checkboxConfigs = {
                            on: {
                                click: function() {
                                    let newValue = formData[schema.id]
                                    if (newValue) {
                                        if (newValue.includes(op.v)) {
                                            newValue.splice(newValue.indexOf(op.v), 1)
                                        } else {
                                            newValue.push(op.v)
                                        }
                                    }
                                }
                            },
                            style
                        }
                        return (
                            <van-checkbox name={op.v} {...checkboxConfigs}>
                                {op.l}
                            </van-checkbox>
                        )
                    })
                    return (
                        <van-cell-group class="tms-form-multiple">
                            <van-cell value={schema.title}></van-cell>
                            <van-cell>
                                <van-checkbox-group value={initValue}>{checkboxs}</van-checkbox-group>
                            </van-cell>
                        </van-cell-group>
                    )
                }
            }
        }

        return this[AS_EDITOR_OPTIONS]
    }
    get viewer() {
        if (!this[AS_VIEWER_OPTIONS]) {
            const { schema } = this
            this[AS_VIEWER_OPTIONS] = {
                props,
                render() {
                    const formData = this.formData
                    const currentValue = Array.isArray(formData[schema.id]) ? formData[schema.id] : []
                    let valueLabel
                    if (Array.isArray(currentValue) && currentValue.length) {
                        let valueOps = schema.ops.filter(op => currentValue.includes(op.v))
                        valueLabel = valueOps.map(op => op.l).join(',')
                    } else {
                        valueLabel = ''
                    }

                    return (
                        <van-cell-group class="tms-form-multiple">
                            <van-cell title={schema.title} value={valueLabel}></van-cell>
                        </van-cell-group>
                    )
                }
            }
        }

        return this[AS_VIEWER_OPTIONS]
    }
}

export { Multiple }

export default Multiple
