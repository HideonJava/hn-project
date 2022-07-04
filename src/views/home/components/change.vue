<template>
  <div>
    <div
      ref="change"
      :style="{ height: height, width: width }"
    />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import ResizeMixin from '@/components/Charts/mixins/resize'

export default {
  mixins: [ResizeMixin],
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs['change'], 'walden')
    this.chart.showLoading({
      text: '加载中...',
      color: '#09F7F7',
      textColor: '#909399',
      fontSize: '14px'
    })
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
      // const department = this.$store.getters.department
      // console.log(department)
      if (data) {
        this.chart.hideLoading()
        this.chart.setOption({
          // 这里面填写echart图的绘制代码
          title: {
            text: '月度业务能力变化曲线',
            textVerticalAlign: 'bottom'
          },
          tooltip: {
            trigger: 'item'
          },
          xAxis: {
            type: 'category',
            data: data.date
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: data.rank,
              type: 'line',
              label: {
                show: true,
                color: 'black',
                fontSize: '30px',
                position: 'top'
              }
            }
          ]
        }, true)
      } else {
        this.chart.hideLoading()
        this.chart.setOption({
          title: {
            text: '月度业务能力变化曲线',
            textVerticalAlign: 'bottom'
          }
        }, true)
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
