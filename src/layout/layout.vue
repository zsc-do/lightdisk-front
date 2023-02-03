<template>
    <div>
        <el-container style="height: 800px; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu router :default-active="activeMenu">
                <el-submenu  v-for="pMenu in menus" :key="pMenu.menuId">
                    <template slot="title"><i class="el-icon-message"></i>{{pMenu.menuName}}</template>
                      <el-menu-item :index="sMenu.menuUrl" v-for="sMenu in pMenu.childMenu" :key="sMenu.menuId">{{sMenu.menuName}}
                      </el-menu-item>
                </el-submenu>
                
            </el-menu>
            </el-aside>
            
            <el-container class="container">
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        

    </div>
</template>


  
  
  <script>
    export default {
      data() {
       
        return {
          activeMenu: '',
          menus:[]
        }
      },
      methods:{
        changeRoute(menuId){

            this.$router.push('/disk')
        },



      },
      
      mounted(){
        this.$message({
              message: '登录成功',
              type: 'success'
        });

        this.$http.apiGet("/SysMenu/getAuthMenu",{ headers: {'Authorization':  localStorage.getItem('token')}}).then((res)=>{

          this.menus = res;

        })
      },


      watch: {
      '$route.path': function(val) {
        console.log(val)
        this.activeMenu = val;
      },
    }
}
</script>



  <style scoped>


   .container{
    background-color: white;
   }

    .el-header {
      background-color: #B3C0D1;
      color: #333;
      line-height: 60px;
    }
    
    .el-aside {
      color: #333;
    }
  </style>