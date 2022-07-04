<template>
  <div class="block">
    <el-date-picker
      v-model="value2"
      type="daterange"
      value-format="yyyy-MM-dd"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
    />
    <el-select v-if="visble" v-model="value" placeholder="请选择" :disabled="isSelected">
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
</template>

<script>
import { GetAllDepartment } from '@/api/user'

export default {
  name: 'DateTimePick',
  props: {
    visble: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      startTime: '2021/10/01',
      pickerOptions: {
        disabledDate(time) {
          const beginDate = new Date('2021/10/01').getTime()
          const ms = new Date().getTime() - 24 * 60 * 60 * 1000
          const endDate = new Date(ms)
          // const endDate = new Date(time).getTime()
          const nowDate = new Date(time).getTime()
          return nowDate < beginDate || nowDate > endDate
        },
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 8)
              // console.log(end)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 31)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 91)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      isSelected: true,
      value2: '',
      options: [],
      value: '大客户组',
      users: [
        '2be5b930-de31-11ec-803c-fa163e103f95',
        '3598a55a-de31-11ec-803c-fa163e103f95',
        '3fc528b8-de31-11ec-803c-fa163e103f95',
        '651bd3a2-a443-11ec-803c-fa163e103f95',
        '81cfc285-c503-11ec-803c-fa163e103f95',
        'eec80aca-de30-11ec-803c-fa163e103f95'
      ]
    }
  },
  created() {
    // 1.设置默认值
    const date = this.defaultTime()

    this.value2 = date
    if (this.$store.getters.department) {
      this.value = this.$store.getters.department
    }
    this.submit()
    if (this.visble) {
      this.initData()
    }
    if (this.users.includes(this.$store.getters.userId)) {
      console.log('有权限')
      this.isSelected = false
    }
  },
  methods: {
    async submit() {
      const data = {
        startDate: this.value2[0] + '',
        endDate: this.value2[1] + '',
        groupName: this.value
      }
      this.$emit('transTime', data)
    },
    defaultTime() {
      // 获取当前时间
      const myDate = new Date(new Date().toLocaleDateString()).toString('yyyy-MM-dd')
      const endDate = this.getNextDate(myDate, -8) // 开始日期
      // 获取一年以后的时间
      const Dates = this.getNextDate(myDate, -1) // 结束日期
      return [endDate, Dates]
    },
    async initData() {
      await GetAllDepartment().then(res => {
        res.forEach(item => {
          const data = {
            value: item.Name,
            label: item.Name
          }
          this.options.push(data)
        })
      })
    },
    getNextDate(date, day) {
      var dd = new Date(date)
      dd.setDate(dd.getDate() + day)
      var y = dd.getFullYear()
      var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1
      var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate()
      return y + '-' + m + '-' + d
    }
  }
}
</script>
