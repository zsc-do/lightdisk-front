<template>
  <div>
    
    <el-table
    :data="menuTree"
    style="width: 100%;margin-bottom: 20px;"
    row-key="menuId"
    border
    default-expand-all
    :tree-props="{children: 'childMenu', hasChildren: 'hasChildren'}">
    <el-table-column
      label="菜单类型"
      width="180"
      >
      <template slot-scope="scope">
        <span v-if="scope.row.menuType === 'M'">目录</span>
        <span v-else-if="scope.row.menuType === 'C'">菜单</span>
        <span v-else-if="scope.row.menuType === 'F'">按钮</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="menuName"
      label="菜单名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="menuUrl"
      label="菜单路由"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="menuPerms"
      label="权限标志"
      sortable
      width="180">
    </el-table-column>
    

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
    data(){
        return {

            menuTree:[]
        }
    },

    methods:{
        handleEdit(index, row) {
            console.log(index, row);
        },

        handleDelete(index, row) {
            console.log(index, row);
        }
    },

    mounted(){
        this.$http.apiGet("/SysMenu/GetAllTreeMenu").then((res)=>{


            console.log(res)

            this.menuTree = res;


        })
    }

}
</script>

<style>

</style>