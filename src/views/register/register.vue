<template>
    <div class="center-body">

    <h2 class="project-title">
      LightDisk
    </h2>

    <el-form class="form" ref="form" :model="form" label-width="100px">
      <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
      </el-form-item>

      <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item>
          <el-button type="primary" @click="onSubmit">注册</el-button>
      </el-form-item>
    </el-form>

</div>
  </template>
  
  <script>

    export default {
      data() {
        return {
          form: {
            username: '',
            password: '',
          }
        }
      },
      methods: {
        onSubmit() {
  
          this.$http.apiPost("/Login/register",{UserName:this.form.username,Password:this.form.password}).then((token)=>{      
  
            this.$message({
              message: '恭喜你，注册成功',
              type: 'success'
            });
            
            this.$router.push('/login')
          })
        },

        
      }
    }
  </script>
  
  <style>
  *{
  /* border: red solid 1px; */
}

body,html{

  height: 100%;
  margin: 0px;
  padding: 0px;
}



.center-body{
  width: 40%;
  height: 100%;
  position: absolute;
  left:30%;
}

.project-title{
  text-align: center;
  font-size: 70px;
  font-family: "Lucida Handwriting","Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

.form{
  position: absolute;
  top:27%;
  left:6%;
  width:380px;
}



  </style>