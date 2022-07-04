<template>
  <div>
    <div ref="trans" :style="{ height: height, width: width }" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import ResizeMixin from '../../../../components/Charts/mixins/resize'

export default {
  mixins: [ResizeMixin],
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    // this.chart = echarts.init(this.$refs['trans'], 'walden')
    // this.chart.showLoading({
    //   text: '加载中...',
    //   color: '#09F7F7',
    //   textColor: '#909399',
    //   fontSize: '14px'
    // })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart(data) {
      if (data.jcRank.datas.length > 0) {
        this.chart = echarts.init(this.$refs['trans'], 'walden')
        this.chart.showLoading({
          text: '加载中...',
          color: '#09F7F7',
          textColor: '#909399',
          fontSize: '14px'
        })
        this.chart.hideLoading()
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // Use axis to trigger tooltip
              type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          color: ['#7bd9a5'],
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: data.jcRank.users
          },
          series: [
            {
              name: '基础能力分',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: data.jcRank.datas
            }
          ]
        }, true)
      } else {
        this.chart.setOption({}, true)
        this.chart.showLoading({
          text: '暂无数据',
          color: '#fff',
          textColor: '#909399',
          fontSize: '14px'
        })
      }
    }
  }
}
</script>
<style>
</style>
