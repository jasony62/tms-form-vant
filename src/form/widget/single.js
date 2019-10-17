const { props } = require('./common')
const AS_EDITOR_OPTIONS = Symbol('as_editor_options')
const AS_VIEWER_OPTIONS = Symbol('as_viewer_options')

class Single {
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
                    const initValue = typeof formData[schema.id] === 'string' ? formData[schema.id] : ''
                    const radios = schema.ops.map(op => {
                        let radioConfigs = {
                            on: {
                                click: function() {
                                    formData[schema.id] = op.v
                                }
                            },
                            style
                        }
                        return (
                            <van-radio name={op.v} {...radioConfigs}>
                                {op.l}
                            </van-radio>
                        )
                    })
                    return (
                        <van-cell-group class="tms-form-single">
                            <van-cell value={schema.title}></van-cell>
                            <van-cell>
                                <van-radio-group value={initValue}>{radios}</van-radio-group>
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
                    const currentValue = typeof formData[schema.id] === 'string' ? formData[schema.id] : ''
                    let valueLabel
                    if (currentValue) {
                        let valueOp = schema.ops.find(op => op.v === currentValue)
                        valueLabel = valueOp ? valueOp.l : ''
                    } else {
                        valueLabel = ''
                    }

                    return (
                        <van-cell-group class="tms-form-single">
                            <van-cell title={schema.title} value={valueLabel}></van-cell>
                        </van-cell-group>
                    )
                }
            }
        }

        return this[AS_VIEWER_OPTIONS]
    }
}

export { Single }

export default Single
