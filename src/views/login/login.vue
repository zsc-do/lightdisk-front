<template>
  <div>

    

    <div class="center-body">

        <h2 class="project-title">
          LightDisk
        </h2>

        <el-form class="form" ref="form" :model="form" label-width="100px">
          <el-form-item label="用户名">
              <el-input v-model="form.username"></el-input>
          </el-form-item>

          <el-form-item label="密码">
              <el-input v-model="form.password" show-password></el-input>
          </el-form-item>
    
          <el-form-item>
              <el-button type="primary" @click="onSubmit">登录</el-button>
              <el-button type="success" @click="toRegister">注册</el-button>
          </el-form-item>
        </el-form>


        <div class="other-login">
          第三方登录:

            <el-image class="github" @click="toGitHubLogin"
            :src="githubIcon"
            :fit="fit">
            </el-image>
         
          </div>
        </div>
        


    
    
    

  </div>
</template>

<script>
import githubIconImg from '/src/assets/github.png'
  export default {
    data() {
      return {
        form: {
          username: '',
          password: '',
        },
        githubIcon: githubIconImg,
      }
    },
    methods: {
      onSubmit() {

        this.$http.apiPost("/Login/doLogin",{UserName:this.form.username,Password:this.form.password}).then((token)=>{
        

            if(token === '500'){
              this.$message.error('登录信息有误');
              return;
            }
            
            localStorage.setItem("token", "Bearer " + token);

            if(this.$route.query.shareCode){
              this.$router.push('/share?shareCode=' + this.$route.query.shareCode)
            }else{
              this.$router.push('/disk')
            }
            
        })
      },

      toGitHubLogin(){
        location.href = `https://github.com/login/oauth/authorize?client_id=Iv1.919336f5c76c06a2&redirect_uri=http://localhost:8080/oauth/redirect`
        
      },
      toRegister(){
        this.$router.push('/register')
      }
    }
  }
</script>

<style>
body{
  background-image: url('/src/assets/bg-01.jpg');
   /* 背景图重复方式 */
   background-repeat: no-repeat;

   /* 背景图片大小 */
   background-size: cover;
}

</style>

<style scoped>
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

.other-login{
  position: absolute;
  top:58%;
  left:14%;
}
.github{
  position: absolute;
  bottom:45%;
  width:30px;
  height: 30px;
  top:-6px;
  cursor: pointer;
}


</style>