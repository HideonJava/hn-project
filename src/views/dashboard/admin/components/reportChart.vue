<template>
  <div>
    <div id="report" :style="{ height: height, width: width }" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { GetReportTend } from '@/api/charts'
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
    },
    group: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    group: {
      deep: true,
      handler: 'initChart'
    }
  },
  mounted() {
    this.chart = echarts.init(document.getElementById('report'), 'wonderland')
    this.$nextTick(() => {
      this.initChart()
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
    initChart() {
      const data = {
        startDate: this.group.startDate,
        endDate: this.group.endDate,
        groupName: this.group.groupName
      }
      this.chart.showLoading({
        text: '加载中...',
        color: '#09F7F7',
        textColor: '#909399',
        fontSize: '14px'
      })
      this.submit(data)
    },
    submit(data) {
      GetReportTend(data).then((res) => {
        if (res) {
          const detail = []
          const date = []
          const total = []
          const result = []
          res.Series.forEach(item => {
            const sers = {
              name: item.Name,
              type: 'bar',
              stack: 'Ad',
              emphasis: {
                focus: 'series'
              },
              data: item.Data
            }
            total.push(item.Data)
            detail.push(sers)
          })
          for (let i = 0; i < total.length; i++) {
            total[i].forEach((value, index) => {
              if (isNaN(result[index])) {
                result[index] = 0
              }
              result[index] += value
            })
          }
          const ceshi = {
            data: result,
            type: 'line',
            name: '总数',
            emphasis: {
              focus: 'series'
            },
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            }
          }
          detail.push(ceshi)
          res.Xaxis.forEach(item => {
            date.push(this.parseTime(item))
          })
          this.chart.hideLoading()
          this.chart.setOption({
            title: {
              show: true,
              text: '报告趋势(近30天)(' + date[0] + '至' + date[date.length - 1] + ')'
            },
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
                data: date
              }
            ],
            yAxis: [
              {
                name: '数量',
                type: 'value'
              }
            ],
            series: detail
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
      })
    },
    parseTime(date) {
      const nVal = new Date(date)
      const parseObj = {
        month: nVal.getMonth() + 1,
        date: nVal.getDate()
      }
      return parseObj.month + '-' + parseObj.date
    }
  }
}
</script>
<style>
</style>
