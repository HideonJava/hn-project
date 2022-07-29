<template>
  <div class="dashboard-editor-container">

    <DateTimePick @transTime="submit" :visble="false" />

    <panel-group :group="group" :panel-group="panelGroup" />

    <el-row :gutter="32">
      <el-col :xs="36" :sm="24" :lg="12">
        <div class="chart-wrapper">
          
        </div>
      </el-col>
      <el-col :xs="36" :sm="24" :lg="12">
        <div class="chart-wrapper">
          
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="36" :sm="14" :lg="8">
        <div class="chart-wrapper">
          
        </div>
      </el-col>
      <el-col :xs="36" :sm="14" :lg="8">
        <div class="chart-wrapper">
          
        </div>
      </el-col>
      <el-col :xs="36" :sm="14" :lg="8">
        <div class="chart-wrapper">
          
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="36" :sm="24" :lg="24">
        <div class="chart-wrapper">
          
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="36" :sm="24" :lg="24">
        <div class="chart-wrapper">
          
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DateTimePick from '@/components/DateTimePick/index'
import PanelGroup from '@/components/PanelGroup/PanelGroup'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    DateTimePick
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
        { icon: 'bug', title: '报告需求总数', val: 0, decimals: '', suffix: '' },
        { icon: 'bug', title: '报告故障总数', val: 0, decimals: '', suffix: '' },
        { icon: 'list', title: '紧急问题数', val: 0, decimals: '', suffix: '' },
        { icon: 'form', title: '共性问题数', val: 0, decimals: 2, suffix: '%' }
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
