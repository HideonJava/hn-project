<template>
  <div>
    <div ref="group" :style="{ height: height, width: width }" />
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
      default: '400px'
    },
    obj: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs['group'], 'walden')
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
            text: this.obj.groupName + '组' + this.parseTime(this.obj.endDate) + '月业务能力分',
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
              type: 'category',
              axisLabel: {
                rotate: 60
              },
              data: data.users
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '进阶分',
              type: 'bar',
              stack: 'Ad',
              color: '#4ea397',
              emphasis: {
                focus: 'series'
              },
              data: data.jjRank
            },
            {
              name: '基础分',
              type: 'bar',
              stack: 'Ad',
              color: '#f58db2',
              emphasis: {
                focus: 'series'
              },
              data: data.jcRank
            }
          ]
        }, true)
      } else {
        this.chart.setOption({
          title: {
            text: this.obj.groupName + '组' + this.parseTime(this.obj.endDate) + '月业务能力分',
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
    },
    parseTime(date) {
      const nVal = new Date(date)
      const parseObj = {
        month: nVal.getMonth() + 1
      }
      return parseObj.month
    }
  }
}
</script>
<style>
</style>
