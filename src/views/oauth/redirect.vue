<template>
    <div class="loadIcon">
      <div 
      v-loading="loading"
      element-loading-text="拼命加载中，请耐心等待">
      </div>

    </div>
  
</template>

<script>
export default {

    data(){
        return {
            code:'',
            loading: true
        }
    },

    mounted(){

        this.code = this.$route.query.code

        this.$http.apiGet(`/Oauth/getToken?code=${this.code}`).then((res)=>{
                console.log(res);

                localStorage.setItem("token", "Bearer " + res);

                location.href = `http://localhost:8080`

                github.jpg
        })

    }
}
</script>

<style>
/* *{
    border:red solid 1px;
} */
body {
    margin: 0;

  }

  .loadIcon{
    height: 200px;
    width: 200px;
    position: absolute;
    top: 50%;
    left:40%;
  }
</style>