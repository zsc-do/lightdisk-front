<template>
  <div>

    <el-descriptions title="用户信息" border="true" column="2">
        <el-descriptions-item label="用户名">{{userInfo.userName}}</el-descriptions-item>
        <el-descriptions-item label="用户类型">{{userInfo.githubId === null?"系统创建用户": "github用户"}}</el-descriptions-item>
        <el-descriptions-item label="已用容量">{{storageSize}}</el-descriptions-item>
        <el-descriptions-item label="总容量">{{totalSize}}</el-descriptions-item>
        <el-descriptions-item label="容量比">
            <el-progress type="circle" :percentage="storagePercentage"></el-progress>

        </el-descriptions-item>

    </el-descriptions>

    <div v-if="userInfo.githubId === null" style="margin-top: 15px; width: 300px;">
        <el-input placeholder="请输入新密码" v-model="newPassword">
            <template slot="append">
                <el-button @click="changePassword" type="primary">修改密码</el-button>
            </template>
        </el-input>
    </div>

    <br/>
    <el-button @click="logout" type="danger" round>退出登录</el-button>
  
  </div>
</template>

<script>
export default {

    data(){
        return {
            userInfo:{},
            newPassword:''
        }
    },

    methods:{


        changePassword(){
            this.$http.apiGet(`/SysUser/changePassword?password=${this.newPassword}`,{ headers: {'Authorization':  localStorage.getItem('token')}})
            .then((res)=>{
                if(res === "ok"){
                    this.$message({
                        message: '密码修改成功',
                        type: 'success'
                    });
                }else{
                    this.$message.error('密码修改失败');
                }
            
                this.userInfo = res
            })
        },

        logout(){
            localStorage.setItem("token", "");

            this.$router.push('/login')
        }
    },

    computed: {
        storagePercentage: function () {


            let userInfo = this.userInfo
            let totalSize = 0
            let usedStorage = 0
            
            try{
                totalSize = parseInt(userInfo.storage.simpleSize) + parseInt(this.userInfo.storage.memberSize)
    
                usedStorage = parseInt(userInfo.storage.storageSize)
            }catch{
                return 0
            }
           
        
           return Math.trunc((usedStorage / totalSize) * 100)

        },

        storageSize(){
            let storageSize = this.userInfo.storage.storageSize;

            let sizeMB = storageSize / 1024 / 1024

            if(sizeMB >= 1024){
                sizeMB = sizeMB / 1024;

                return Math.trunc(sizeMB)  + "GB";
            }

            return Math.trunc(sizeMB)  + "MB";

        },

        totalSize(){
            let storageSize = this.userInfo.storage;

            let totalSize = parseInt(storageSize.simpleSize) + parseInt(storageSize.memberSize)

            let sizeMB = totalSize / 1024 / 1024

            if(sizeMB >= 1024){
                sizeMB = sizeMB / 1024;

                return Math.trunc(sizeMB)  + "GB";
            }

            return Math.trunc(sizeMB)  + "MB";

        },


    },

    mounted(){
        this.$http.apiGet("/SysUser/userInfo",{ headers: {'Authorization':  localStorage.getItem('token')}})
        .then((res)=>{
            this.userInfo = res
        })
    }
}
</script>

<style>

</style>