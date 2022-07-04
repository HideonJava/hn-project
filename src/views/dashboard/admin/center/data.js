import { GetMemberCloseRate, GetMemberRank } from '@/api/charts'

export function memberCloseRate(data) {
  return new Promise((resolve, reject) => {
    GetMemberCloseRate(data).then((res) => {
      const memberClose = {
        closeRate: [],
        users: [],
        pieData: [],
        sumRate: res.SumRate,
        sumNumber: res.SumNumber
      }
      let obj
      if (res.List.length > 0) {
        res.List.forEach((item) => {
          // 闭环率
          memberClose.closeRate.push(item.CloseRate)
          // 姓名
          memberClose.users.push(item.AssigneeName)

          obj = {
            value: item.Num,
            name: item.AssigneeName
          }
          memberClose.pieData.push(obj)
        })
        resolve(memberClose)
      } else {
        resolve(null)
      }
    })
  })
}

export async function memberRankPoint(data) {
  const memberRank = {
    ywRank: {
      users: [],
      datas: []
    },
    jjRank: {
      users: [],
      datas: []
    },
    jcRank: {
      users: [],
      datas: []
    }
  }
  return new Promise((resolve, reject) => {
    GetMemberRank(data).then(res => {
      if (res.Advance.length > 0) {
        res.Advance.forEach(item => {
          memberRank.jjRank.users.push(item.Name)
          memberRank.jjRank.datas.push(item.Rank)
        })
      }

      if (res.Rank.length > 0) {
        res.Rank.forEach(item => {
          memberRank.ywRank.users.push(item.Name)
          memberRank.ywRank.datas.push(item.Rank)
        })
      }

      if (res.Basic.length > 0) {
        res.Basic.forEach(item => {
          memberRank.jcRank.users.push(item.Name)
          memberRank.jcRank.datas.push(item.Rank)
        })
      }
      // memberRank.ywRank.datas.sort((a, b) => {
      //   if (a > b) {
      //     return 1
      //   } else {
      //     return -1
      //   }
      // })
      // memberRank.ywRank.users.sort((a, b) => {
      //   if (a > b) {
      //     return 1
      //   } else {
      //     return -1
      //   }
      // })
      resolve(memberRank)
    })
  })
}
