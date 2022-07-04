import request from '@/utils/request'
// dashboard  主控制台

export function GetMemberCloseRate(data) {
  return request({
    url: 'api/JIRA/GetMemberCloseRate',
    method: 'get',
    params: data
  })
}

export function GetMemberBaseRank(data) {
  return request({
    url: 'api/JIRA/GetMemberBaseRank',
    method: 'get',
    params: data
  })
}

export function GetMemberAdvancedRank(data) {
  return request({
    url: 'api/JIRA/GetMemberAdvancedRank',
    method: 'get',
    params: data
  })
}

export function GetMemberRank(data) {
  return request({
    url: 'api/JIRA/GetMemberRank',
    method: 'get',
    params: data
  })
}

export function GetClosedTend(data) {
  return request({
    url: 'api/JIRA/GetClosedTend',
    method: 'get',
    params: data
  })
}

export function GetReportTend(data) {
  return request({
    url: 'api/JIRA/GetReportTend',
    method: 'get',
    params: data
  })
}

export function GetOutRate(data) {
  return request({
    url: 'api/JIRA/GetOutRate',
    method: 'get',
    params: data
  })
}

export function GetCaseTotal(data) {
  return request({
    url: 'api/JIRA/GetCaseTotal',
    method: 'get',
    params: data
  })
}

// workstation  个人工作平台

export function GetPersonDashboard(data) {
  return request({
    url: 'api/JIRA/GetPersonDashboard',
    method: 'get',
    params: data
  })
}

export function GetRankByMonth(data) {
  return request({
    url: 'api/JIRA/GetRankByMonth',
    method: 'get',
    params: data
  })
}

export function GetPersonMonthCase(data) {
  return request({
    url: 'api/JIRA/GetPersonMonthCase',
    method: 'get',
    params: data
  })
}

export function GetAssigneeCustomer(data) {
  return request({
    url: 'api/JIRA/GetAssigneeCustomer',
    method: 'get',
    params: data
  })
}

export function GetAssigneeTime(data) {
  return request({
    url: 'api/JIRA/GetAssigneeTime',
    method: 'get',
    params: data
  })
}

export function GetUpgradeCount(data) {
  return request({
    url: 'api/JIRA/GetUpgradeCount',
    method: 'get',
    params: data
  })
}
