import { mock } from 'mockjs'

const getData = mock({
  'list|1-10': [{
    'id|+1': 1,
    email: '@EMAIL',
  }],
})

const postData = mock({
  'list|1-10': [{
    'id|+1': 1,
    email: '@EMAIL',
  }],
})

// 拦截规则
mock('/api/get', 'get', () => getData)

mock('/api/post', 'post', () => postData)
