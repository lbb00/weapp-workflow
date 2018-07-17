import { get, post } from '../utils/request'

const getAny = () => {
  return get({
    url: ''
  })
}

const postAny = () => {
  return post({
    url: ''
  })
}

export {
  getAny,
  postAny
}
