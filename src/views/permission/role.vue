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
      >
      </el-option>
    </el-select>
    <el-button
      type="success"
      icon="el-icon-check"
      circle
      @click="submit((staus = 'user'))"
    ></el-button>
    <el-tree
      :data="data"
      ref="tree"
      show-checkbox
      highlight-current
      node-key="ID"
      default-expand-all
      :default-checked-keys="defaultCheckedKey"
      :props="props"
    >
    </el-tree>
    <el-button
      type="success"
      icon="el-icon-check"
      circle
      @click="submit((staus = 'tree'))"
    ></el-button>

    <el-button
      type="success"
      icon="el-icon-check"
      v-if="$store.getters.button.includes('add')"
      >新增</el-button
    >
  </div>
</template>

<script>
import path from "path";
import { deepClone } from "@/utils";
// import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'
import { querySingleRouter, updateUserRouter, getAllUser } from "@/api/user";

export default {
  data() {
    return {
      props: {
        label: "Name",
        children: "Chirldren",
      },
      data: [],
      defaultCheckedKey: ["bb782a22-b63f-11ec-803c-fa163e103f95"],
      count: 1,
      options: [],
      users: [],
      value: [],
      list: [],
      loading: false,
      menuId: [],
    };
  },
  mounted() {
    this.getRoutes();
  },
  methods: {
    async getRoutes() {
      const users = await getAllUser();
      this.users = users;
      // 初始化下拉列表值
      this.options = this.users.map((item) => {
        return { value: `${item.ID}`, label: `${item.Name}` };
      });
      console.log("用户下拉列表值", this.options);
    },

    submit(status) {
      let res = this.$refs.tree.getCheckedNodes()
      let halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
      if (status === "tree") {
        // {
        //   UserID: "";
        //   Routers: [{ RouterID: "", SubRole: "" }];
        // }

        updateUserRouter().then(res =>{
          console.log(res);
          console.log(halfCheckedKeys);
          res.unshift.apply(res, halfCheckedKeys);
          console.log(res);
        })
      } else {
        querySingleRouter({ ID: this.value }).then((res) => {
          let treeNode = [];
          res.forEach((element) => {
            if (element.Chirldren) {
              element.Chirldren.forEach((index) => {
                if (index.Role !== "") {
                  var n=JSON.parse(index.Role);
                  index['Chirldren'] = n;
                }
              });
            }
            treeNode.push(element);
          });
          this.data = treeNode;
          console.log("加载菜单", res);
        });
      }
    },
  },
};
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
