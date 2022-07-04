import { GetUpgradeCount, GetMemberRank, GetAssigneeTime, GetAssigneeCustomer, GetPersonMonthCase, GetRankByMonth, GetPersonDashboard } from '@/api/charts'

export async function memberRankPoint(data) {
  const memberRank = {
    jjRank: [],
    jcRank: [],
    users: []
  }
  return new Promise((resolve, reject) => {
    GetMemberRank(data).then(res => {
      if (res.Rank.length > 0) {
        res.Rank.forEach(item => {
          memberRank.users.push(item.Name)
          memberRank.jjRank.push((item.Advance * 0.6).toFixed(1))
          memberRank.jcRank.push((item.Basic * 0.4).toFixed(1))
        })
      }
      resolve(memberRank)
    })
  })
}

export async function rankByMonth(data) {
  const change = {
    date: [],
    rank: []
  }
  return new Promise((resolve, reject) => {
    GetRankByMonth(data).then(res => {
      res.forEach((item) => {
        change.date.push(item.RecordTime)
        change.rank.push(item.Rank)
      })
      resolve(change)
    })
  })
}

export async function assigneeCustomer(data) {
  const customer = []
  return new Promise((resolve, reject) => {
    GetAssigneeCustomer(data).then(res => {
      res.forEach((item) => {
        const obj = {
          name: item.Customer,
          value: item.Counts
        }
        customer.push(obj)
      })
      resolve(customer)
    })
  })
}

export async function assigneeTime(data) {
  const time = []
  return new Promise((resolve, reject) => {
    GetAssigneeTime(data).then(res => {
      res.forEach((item) => {
        const obj = {
          name: item.Title,
          value: item.Count
        }
        time.push(obj)
      })
      resolve(time)
    })
  })
}

export async function upgradeCount(data) {
  const nums = []
  return new Promise((resolve, reject) => {
    GetUpgradeCount(data).then(res => {
      res.forEach((item) => {
        const obj = {
          name: item.Display,
          value: item.Counts
        }
        nums.push(obj)
      })
      resolve(nums)
    })
  })
}

export async function personMonthCase(data) {
  const obj = {
    date: [],
    upgrade: [],
    finish: []
  }
  return new Promise((resolve, reject) => {
    GetPersonMonthCase(data).then(res => {
      res.forEach((item) => {
        obj.date.push(item.Date)
        obj.upgrade.push(item.Upgrade)
        obj.finish.push(item.Finish)
      })
      resolve(obj)
    })
  })
}

export async function personDashboard(data) {
  return new Promise((resolve, reject) => {
    GetPersonDashboard(data).then(res => {
      resolve(res)
    })
  })
}
