import request from '@/utils/request'
import Qs from 'qs'

// export function GetMemberCloseRate(data) {
//   return request({
//     url: 'api/JIRA/GetMemberCloseRate',
//     method: 'post',
//     data: Qs.stringify(data)
//   })
// }

export function GetMemberCloseRate(data) {
  return request({
    url: 'api/JIRA/GetMemberCloseRate',
    method: 'get',
    params: data
  })
}
