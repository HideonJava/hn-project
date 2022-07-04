<template>
  <div class="dashboard-editor-container">

    <DateTimePick @transTime="submit" />

    <panel-group :group="group" :panel-group="panelGroup" />

    <el-row :gutter="32">
      <el-col :xs="36" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <charts :ref="closeObj.rate" :group="group" />
        </div>
      </el-col>
      <el-col :xs="36" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <pie-charts :ref="closeObj.pie" :group="group" />
        </div>
      </el-col>
    </el-row>
    <el-row v-show="group.groupName === '大客户组' || group.groupName === '客户成功组' || group.groupName === '未成交组'" :gutter="32">
      <el-col :xs="36" :sm="14" :lg="8">
        <div class="chart-wrapper">
          <funnel-chart :ref="rankObj.funnel" />
        </div>
      </el-col>
      <el-col :xs="36" :sm="14" :lg="8">
        <div class="chart-wrapper">
          <trans-chart :ref="rankObj.trans" />
        </div>
      </el-col>
      <el-col :xs="36" :sm="14" :lg="8">
        <div class="chart-wrapper">
          <a-rank-chart :ref="rankObj.arank" />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="36" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <report-chart :group="group" />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="36" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <closed-chart :group="group" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Charts from './components/charts'
import PieCharts from './components/pieCharts'
import TransChart from './components/transChart'
import ARankChart from './components/aRankChart'
import ClosedChart from './components/closedChart'
import FunnelChart from './components/funnelChart'
import ReportChart from './components/reportChart'
import DateTimePick from '@/components/DateTimePick/index'
import PanelGroup from '@/components/PanelGroup/PanelGroup'
import { GetCaseTotal, GetOutRate } from '@/api/charts'
import { memberCloseRate, memberRankPoint } from './center/data'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    Charts,
    PieCharts,
    TransChart,
    DateTimePick,
    ARankChart,
    ClosedChart,
    ReportChart,
    FunnelChart
  },
  data() {
    return {
      group: {
        startDate: '',
        endDate: '',
        groupName: ''
      },
      rankObj: {
        trans: 'trans',
        funnel: 'funnel',
        arank: 'arank'
      },
      closeObj: {
        rate: 'rate',
        pie: 'pie'
      },
      panelGroup: [
        { icon: 'bug', title: '闭环故障总量', val: 0, decimals: '', suffix: '' },
        { icon: 'bug', title: '报告故障总数', val: 0, decimals: '', suffix: '' },
        { icon: 'list', title: '报告需求总数', val: 0, decimals: '', suffix: '' },
        { icon: 'form', title: '故障总体流出率', val: 0, decimals: 2, suffix: '%' }
      ]
    }
  },
  methods: {
    async submit(data) {
      const { startDate, endDate, groupName } = data
      this.group.startDate = startDate
      this.group.endDate = endDate
      this.group.groupName = groupName
      try {
        await memberCloseRate(data).then(res => {
          Object.keys(this.closeObj).forEach((key) => {
            this.$refs[this.closeObj[key]].initChart(res)
          })
        })

        if (groupName === '大客户组' || groupName === '客户成功组' || groupName === '未成交组') {
          await memberRankPoint({ startDate, endDate, groupName, isDesc: 'false' }).then(res => {
            Object.keys(this.rankObj).forEach((key) => {
              this.$refs[this.rankObj[key]].initChart(res)
            })
          })
        }

        await GetCaseTotal(data).then(res => {
          this.panelGroup[0].val = res.Finished
          this.panelGroup[1].val = res.ReportCase
          this.panelGroup[2].val = res.ReportNeed
        })

        await GetOutRate(data).then(res => {
          this.panelGroup[3].val = res
        })
      } catch (error) {
        console.log(error)
      }
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

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
