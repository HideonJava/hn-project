
<template>
  <div id="chart">
    <div class="block">
      <el-date-picker
        v-model="value2"
        type="daterange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      />
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        type="success"
        icon="el-icon-check"
        circle
        @click="submit((staus = 'user'))"
      />
    </div>

    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
export default {
  name: 'AlarmCalcul',
  data() {
    return {
      series: [
        {
          name: '闭环率',
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'bar'
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top' // top, center, bottom
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(val) {
            return val + '%'
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#304758']
          }
        },

        xaxis: {
          categories: [
            'test',
            'test',
            'test',
            'test',
            'test',
            'test',
            'test',
            'test',
            'test',
            'test',
            'test',
            'test'
          ],
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5
              }
            }
          },
          tooltip: {
            enabled: true
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false,
            formatter: function(val) {
              return val + '%'
            }
          }
        },
        title: {
          text: '2月成员闭环率',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      },
      startTime: '2021/10/01',
      pickerOptions: {
        disabledDate(time) {
          const beginDate = new Date('2021/10/01').getTime()
          const endDate = new Date(this.endTime).getTime()
          const nowDate = new Date(time).getTime()
          return (nowDate < beginDate || nowDate > endDate)
        },
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value2: '',
      options: [
        {
          value: '选项4',
          label: '全部'
        }, {
          value: '选项1',
          label: '大客户组'
        }, {
          value: '选项2',
          label: '未成交客户组'
        }, {
          value: '选项3',
          label: '客户成功组'
        }],
      value: ''
    }
  },
  computed: {},
  methods: {},
  methods: {
    submit() {

    }
  }
}
</script>

<style scoped>
</style>
