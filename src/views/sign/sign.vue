<template>
  <div>

    <el-steps :active="active" finish-status="success">
        <el-step title="第一天"></el-step>
        <el-step title="第二天"></el-step>
        <el-step title="第三天"></el-step>
        <el-step title="第四天"></el-step>
        <el-step title="第五天"></el-step>
    </el-steps>

    <el-divider content-position="left">签到说明</el-divider>
    <div>前4天签到领取50MB空间，第5天领取1GB空间</div>
    <div>断签后会从第一天重新开始</div>


    <br/>
    <br/>
    <el-button type="info" @click="doSign()" :disabled="disabled">签到</el-button>
  </div>
</template>

<script>
export default {

    data(){
        return {
            active: 0,
            userInfo:{},
            disabled:false
        }
    },

    methods:{

        doSign(){
            this.$http.apiGet("/Sign/sign",{ headers: {'Authorization':  localStorage.getItem('token')}})
            .then((res)=>{
                this.$message({
                    type: 'success',
                    message: '签到成功,已领取空间'
                });  
                
                this.active ++
                this.disabled = true
            })
        }
    },

    mounted(){
        this.$http.apiGet("/Sign/signSiuation",{ headers: {'Authorization':  localStorage.getItem('token')}})
        .then((res)=>{

            if(res.isSign === 1){
                this.disabled = true;
                this.active = res.signCount
            }else{
                this.active = res.signCount
            }
            
        })
    }
}
</script>

<style>

</style>