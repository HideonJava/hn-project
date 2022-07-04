<template>
  <div>
    <div
      ref="upgrade"
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
    this.chart = echarts.init(this.$refs['upgrade'], 'walden')
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
      if (data.length > 0) {
        this.chart.hideLoading()
        this.chart.setOption({
          // 这里面填写echart图的绘制代码
          title: {
            text: '承接升级问题数量',
            textVerticalAlign: 'bottom'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            type: 'scroll',
            right: '5%',
            orient: 'vertical'
          },
          series: [
            {
              name: '数量',
              type: 'pie',
              radius: '50%',
              labelLine: {
                length: 10
              },
              label: {
                formatter: '{b|{b}：}{c} ',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  a: {
                    color: '#6E7079',
                    lineHeight: 12,
                    align: 'center'
                  },
                  b: {
                    color: '#4C5058',
                    fontSize: 14,
                    fontWeight: 'bold',
                    lineHeight: 13
                  }
                }
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              },
              data: data
            }
          ]
        }, true)
      } else {
        this.chart.setOption({
          title: {
            text: '解决升级问题数量',
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
