<template>
  <div class="home">
    <div class="home-box">
      <div class="home-box-top" style="margin-top: 20px;text-align: center">
        <p>为了保证您的信息安全</p>
        <strong>请进行安全识别验证</strong>
      </div>
      <div class="home-box-bottom">
        <div class="home-box-bottom-center">
          <a-icon type="user" />
          <div>
            <p>确保本人操作</p>
            <p>非本人操作将无法通过认证</p>
          </div>
        </div>
        <div class="home-box-bottom-center">
          <a-icon type="profile" />
          <div>
            <p>需提供营业执照</p>
            <p>执照保持清晰无遮挡</p>
          </div>
        </div>
        <div class="home-box-bottom-center">
          <a-icon type="idcard" />
          <div>
            <p>需提供身份证件</p>
            <p>与营业执照法人同人最佳</p>
          </div>
        </div>
        <a-button type="primary" round class="home-button" v-on:click="authentication">开始身份认证</a-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Home',
    data(){
      return{
        URL:''
      }
    },
    methods: {
      authentication() {
        window.location.href = this.hrefUrl+this.URL;
      },
      getTeannID(){
        let url = this.$route.query.teannid
        this.URL = url
        console.log(url)
      }
    },
    mounted(){
      this.getTeannID()
    }
  }
</script>
<style scoped>
  .home {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p, strong {
    font-size: 15px;
    line-height: 20px;
    margin: 0;
    padding: 0;
  }

  i {
    font-size: 35px;
  }

  .home-box {
    width: 300px;
  }

  .home-box-top strong {
    margin-top: 10px;
  }

  .home-box-bottom-center {
    display: flex;
    width: 250px;
    border: 1px solid #ffffff;
    text-align: left;
    margin: 25px auto;
    padding: 0 5px;
  }

  .home-box-bottom-center div {
    margin-left: 20px;
  }

  .home-button {
    width: 100%;
  }
</style>