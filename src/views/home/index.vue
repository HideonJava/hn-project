<template>
  <div class="dashboard-editor-container">
    <DateTimePick :visble="false" @transTime="submit" />
    <div class="info-wrap">
      姓名：<el-tag type="success" effect="dark">{{ userInfo.name }}</el-tag>
      所属组织：<el-tag type="info" effect="dark">{{
        userInfo.departmentName
      }}</el-tag>
    </div>
    <panel-group :group="group" :panel-group="panelGroup" />

    <el-row
      v-if="
        userInfo.departmentName === '大客户组' ||
          userInfo.departmentName === '客户成功组' ||
          userInfo.departmentName === '未成交组'
      "
      :gutter="32"
    >
      <el-col :xs="36" :sm="14" :lg="20">
        <div class="chart-wrapper">
          <grouprank :ref="workObj.group" :obj="group" />
        </div>
      </el-col>
      <el-col :xs="36" :sm="14" :lg="4">
        <div class="chart-wrapper small-wrapper">
          <h2>本组排名</h2>
          <h1 style="padding: 0px 10px 0px 150px; font-size: 50px; color: red">
            {{ userInfo.rank }}
          </h1>
        </div>
        <div class="chart-wrapper small-wrapper">
          <h2 style="line-height: 30px">业务能力分: {{ userInfo.ywRank }}</h2>
          <p style="line-height: 30px;border: 0;">基础能力分: {{ userInfo.jcRank }}</p>
          <p style="line-height: 30px">进阶能力分: {{ userInfo.jjRank }}</p>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="36" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <change :ref="workObj.change" />
        </div>
      </el-col>
      <el-col :xs="36" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <handle :ref="workObj.handle" />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="36" :sm="14" :lg="12">
        <div class="chart-wrapper">
          <close :ref="workObj.close" />
        </div>
      </el-col>
      <el-col :xs="36" :sm="14" :lg="12">
        <div class="chart-wrapper">
          <upgrade :ref="workObj.upgrade" />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="36" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <month :ref="workObj.month" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from '@/components/PanelGroup/PanelGroup'
import DateTimePick from '@/components/DateTimePick/index'
import Grouprank from './components/grouprank'
import Handle from './components/handle'
import Close from './components/close'
import Upgrade from './components/upgrade'
import Change from './components/change'
import Month from './components/month'
import {
  memberRankPoint,
  rankByMonth,
  assigneeCustomer,
  assigneeTime,
  personMonthCase,
  upgradeCount,
  personDashboard
} from './center/data'
import { GetUserInfo } from '@/api/user'
import storageUtil from '@/utils/storage'

// TODO 路径调整

export default {
  name: 'WorkStation',
  components: {
    PanelGroup,
    Month,
    Change,
    Upgrade,
    Close,
    Handle,
    Grouprank,
    DateTimePick
  },
  data() {
    return {
      group: {
        startDate: '',
        endDate: '',
        groupName: ''
      },
      workObj: {
        group: 'group',
        handle: 'handle',
        close: 'close',
        upgrade: 'upgrade',
        change: 'change',
        month: 'month'
      },
      userInfo: {
        id: '',
        name: '',
        departmentName: '',
        rank: '',
        jcRank: '',
        ywRank: '',
        jjRank: ''
      },
      panelGroup: [
        { icon: 'bug', title: '报告故障数', val: 0, decimals: '', suffix: '' },
        { icon: 'bug', title: '闭环故障数', val: 0, decimals: '', suffix: '' },
        {
          icon: 'list',
          title: '闭环case平均时间',
          val: 0,
          decimals: 1,
          suffix: 'H'
        },
        { icon: 'form', title: '故障升级率', val: 0, decimals: 2, suffix: '%' }
      ]
    }
  },
  // created() {

  // },
  methods: {
    async submit(data) {
      const { startDate, endDate, groupName } = data
      this.group.startDate = startDate
      this.group.endDate = endDate
      this.group.groupName = groupName

      await GetUserInfo().then((res) => {
        const { ID, Display, DepartmentName } = res
        this.userInfo.id = ID
        this.userInfo.name = Display
        this.userInfo.departmentName = DepartmentName
        const obj = {
          startDate,
          endDate,
          userId: ID
        }
        personDashboard(obj).then((res) => {
          this.panelGroup[0].val = res.ReportCount
          this.panelGroup[1].val = res.ClosedCount
          this.panelGroup[2].val = res.ClosedTime
          this.panelGroup[3].val = res.UpgradeRate
        })
        if (
          DepartmentName === '大客户组' ||
          DepartmentName === '客户成功组' ||
          DepartmentName === '未成交组'
        ) {
          memberRankPoint({ startDate, endDate, groupName: DepartmentName }).then(
            (res) => {
              const index = res.users.findIndex((item) => item === Display)
              // console.log(res.users.findIndex((item) => item === Display))
              // console.log(res.users)
              this.userInfo.rank = index + 1
              this.userInfo.ywRank =
                parseFloat(res.jjRank[index]) + parseFloat(res.jcRank[index])
              this.userInfo.jjRank = res.jjRank[index] / 0.6
              this.userInfo.jcRank = res.jcRank[index] / 0.4
              this.$refs[this.workObj.group].initChart(res)
            }
          )
        }

        personMonthCase({ endDate, userId: obj.userId }).then((res) => {
          this.$refs[this.workObj.month].initChart(res)
        })

        if (
          DepartmentName === '大客户组' ||
          DepartmentName === '客户成功组' ||
          DepartmentName === '未成交组'
        ) {
          rankByMonth({ endDate, userId: obj.userId }).then((res) => {
            this.$refs[this.workObj.change].initChart(res)
          })
        } else {
          this.$refs[this.workObj.change].initChart()
        }

        assigneeCustomer(obj).then((res) => {
          this.$refs[this.workObj.handle].initChart(res)
        })

        assigneeTime(obj).then((res) => {
          this.$refs[this.workObj.close].initChart(res)
        })

        upgradeCount(obj).then((res) => {
          this.$refs[this.workObj.upgrade].initChart(res)
        })

        storageUtil.saveUserInfo(this.userInfo)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

.small-wrapper {
  padding: 10px !important;
  height: 191px;
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

.info-wrap {
  position: relative;
  left: 80% !important;
  bottom: 35px;
}
</style>
