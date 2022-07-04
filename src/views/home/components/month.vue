<template>
  <div>
    <div ref="month" :style="{ height: height, width: width }" />
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
    this.chart = echarts.init(this.$refs['month'], 'walden')
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
      if (data) {
        this.chart.hideLoading()
        this.chart.setOption({
          // 这里面填写echart图的绘制代码
          title: {
            text: data.date[0] + '~' + data.date[data.date.length - 1] + '经办case数量',
            textVerticalAlign: 'bottom'
          },
          color: ['#6be6c1'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              name: '日期',
              axisLabel: {
                rotate: 60
              },
              type: 'category',
              data: data.date
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '升级',
              type: 'bar',
              stack: 'Ad',
              color: '#4ea397',
              emphasis: {
                focus: 'series'
              },
              data: data.upgrade
            },
            {
              name: '闭环',
              type: 'bar',
              stack: 'Ad',
              color: '#f58db2',
              emphasis: {
                focus: 'series'
              },
              data: data.finish
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
