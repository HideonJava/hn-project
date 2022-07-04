<template>
  <div class="app-container">
    <el-select
      v-model="value"
      filterable
      reserve-keyword
      clearable
      placeholder="请输入关键词"
    >
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
    <el-tree
      ref="tree"
      :data="data"
      show-checkbox
      highlight-current
      node-key="ID"
      default-expand-all
      :default-checked-keys="defaultCheckedKey"
      :props="props"
    />
    <el-button
      type="success"
      icon="el-icon-check"
      circle
      @click="submit((staus = 'tree'))"
    />

    <el-button
      v-if="$store.getters.button.includes('add')"
      type="success"
      icon="el-icon-check"
    >新增</el-button>
  </div>
</template>

<script>
// import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'
import { querySingleRouter, updateUserRouter, getAllUser } from '@/api/user'

export default {
  data() {
    return {
      props: {
        label: 'Name',
        children: 'Chirldren'
      },
      data: [],
      defaultCheckedKey: ['bb782a22-b63f-11ec-803c-fa163e103f95'],
      count: 1,
      options: [],
      users: [],
      value: [],
      list: [],
      loading: false,
      menuId: []
    }
  },
  mounted() {
    this.getRoutes()
  },
  methods: {
    async getRoutes() {
      const users = await getAllUser()
      this.users = users
      // 初始化下拉列表值
      this.options = this.users.map((item) => {
        return { value: `${item.ID}`, label: `${item.Name}` }
      })
    },

    submit(status) {
      const CheckedNodes = this.$refs.tree.getCheckedNodes()
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      if (status === 'tree') {
        // 提交逻辑
        const data = {
          UserID: '', // 拿下拉列表userId
          Routers: [] // RouterID 二级父类id, SubRole按钮权限给String
        }
        // updateUserRouter().then(res => {

        CheckedNodes.unshift.apply(CheckedNodes, halfCheckedKeys)
        console.log(CheckedNodes)
        CheckedNodes.forEach((item) => {
          data.Routers.push(this.handleTreeData(this.data, item))
        })

        var r = data.Routers.filter(function(s) {
          if (s === 'undefined') {
            return s.trim()
          } else {
            console.log(s)
            return s
          }
        })
        console.log(r)

        // })
      } else {
        // 查询单个逻辑
        querySingleRouter({ ID: this.value }).then((res) => {
          const treeNode = []
          res.forEach((element) => {
            if (element.Chirldren) {
              element.Chirldren.forEach((index) => {
                if (index.Role !== '') {
                  const n = JSON.parse(index.Role)
                  n['pid'] = index.ID
                  // console.log();
                  index['Chirldren'] = n
                }
              })
            }
            treeNode.push(element)
          })
          this.data = treeNode
          console.log('加载菜单', res)
        })
      }
    },
    handleTreeData(data, obj) {
      let res
      // data.Routers.push({ RouterID: item.ID, SubRole: item.Chirldren })
      data.forEach((item) => {
        if (item.Chirldren) {
          item.Chirldren.forEach((index) => {
            if (obj?.ID === index.ID || obj === index.ID) {
              if (typeof obj === 'string') {
                res = { RouterID: obj, SubRole: index.Chirldren }
              } else {
                res = { RouterID: obj.ID, SubRole: index.Chirldren }
              }
            }
          })
        }
      })
      // console.log(array)

      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
