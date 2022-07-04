<template>
  <div>
    <div ref="rate" :style="{ height: height, width: width }" />
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
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs['rate'], 'walden')
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
      if (data.closeRate.length > 0) {
        this.chart.hideLoading()
        this.chart.setOption({
          // 这里面填写echart图的绘制代码
          title: {
            text: '闭环率统计',
            subtext: '总计：' + data.sumRate + '%,' + '人均：' + (data.sumRate / data.users.length).toFixed(2) + '%',
            textVerticalAlign: 'bottom'
          },
          color: ['#6be6c1'],
          xAxis: {
            type: 'category',
            data: data.users,
            axisLabel: {
              rotate: 60
            },
            axisTick: {
              alignWithLabel: true
            }
          },
          yAxis: {
            type: 'value'
          },
          tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: function(params) {
              return params[0].name + ':' + params[0].value + '%'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          series: [
            {
              data: data.closeRate,
              type: 'bar',
              barWidth: '60%',
              showBackground: true,
              label: {
                show: true,
                position: 'top',
                formatter: function(val) {
                  return val.value + '%'
                }
              }
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
