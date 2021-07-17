import JX3_EMOTION from '@jx3box/jx3box-emotion'

function formatContent(val) {
    val = val.trim()
    const ins = new JX3_EMOTION(val)

    return ins.code
}

export {
    formatContent
}