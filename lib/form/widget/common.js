const PROTO_PROPS = {
    formData: {
        type: Object,
        default: () => {
            return {}
        }
    }
}

let props = Object.assign({}, PROTO_PROPS)

export { props }
