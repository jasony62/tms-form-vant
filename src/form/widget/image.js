const { props } = require('./common')
const AS_EDITOR_OPTIONS = Symbol('as_editor_options')
const AS_VIEWER_OPTIONS = Symbol('as_viewer_options')

class Image {
    constructor(schema) {
        this.schema = schema
    }
    get editor() {
        if (!this[AS_EDITOR_OPTIONS]) {
            const schema = this.schema
            this[AS_EDITOR_OPTIONS] = {
                props,
                render() {
                    let formValue = this.formData
                    const uploaderProps = {
                        fileList: formValue[schema.id],
                        afterRead: function(file) {
                            this.fileList && this.fileList.push(file)
                        }
                    }
                    return (
                        <van-cell-group class="tms-form-image">
                            <van-cell value={schema.title}></van-cell>
                            <van-uploader multiple {...{ props: uploaderProps }}></van-uploader>
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
                    const formData = this.formData
                    const currentValue = Array.isArray(formData[schema.id]) ? formData[schema.id] : []
                    const images = currentValue.map(v => {
                        return <van-image src={v} />
                    })

                    return (
                        <van-cell-group class="tms-form-image">
                            <van-cell value={schema.title}></van-cell>
                            {images}
                        </van-cell-group>
                    )
                }
            }
        }

        return this[AS_VIEWER_OPTIONS]
    }
}

export { Image }

export default Image
