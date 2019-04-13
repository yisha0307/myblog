import ajax from '../tools/ajax'
import _ from 'lodash'

const getAllPosts = () => {
    const result = ajax.get('/post/all').then(res => _.get(res, 'data.data') || [])
    return result
}
const postServices = {
    getAllPosts
}

export default postServices