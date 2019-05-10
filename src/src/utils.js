export const searchToQuery = str => {
    let args = {}
    let query = str.substring(1)
    let pairs = query.split('&')
    for (let i = 0; i < pairs.length; i++) {
        let pos = pairs[i].indexOf('=')
        if (!~pos) continue
        let name = pairs[i].substring(0, pos)
        let value = pairs[i].substring(pos + 1)
        value = decodeURIComponent(value)
        args[name] = value
    }
    return args
}