<template>
  <div class="textCenter space">
    <div>
      <div class="space">
        <h1>为了保证您的信息安全</h1>
        <h2>请进行安全识别验证</h2>
      </div>
      <div>
        <div class="flexCenter left space">
          <a-icon type="user" />
          <div class="margin-left">
            <p>确保本人操作</p>
            <p>非本人操作将无法通过认证</p>
          </div>
        </div>
        <div class="flexCenter left space">
          <a-icon type="profile" />
          <div class="margin-left">
            <p>需提供营业执照</p>
            <p>执照保持清晰无遮挡</p>
          </div>
        </div>
        <div class="flexCenter left space">
          <a-icon type="idcard" />
          <div class="margin-left">
            <p>需提供身份证件</p>
            <p>与营业执照法人同人最佳</p>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed">
      <div style="margin: 0 40px">
        <a-button type="primary" round block v-on:click="start" size="large" class="button">
          <p><strong>开始认证</strong></p>
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from "vue"
  import {fromData} from '../utils/http'
  export default {
    name: 'Home',
    data(){
      return{
        value:''
      }
    },
    methods: {
      start(){
          const teannid = this.$route.query.teannid
          const fromid = this.$route.query.fromId
          fromData({ownerId:teannid,fromId:fromid})
            .then(res=>{
              console.log(res);
              if(res.code == 200){
                this.value = res
                Vue.ls.set('fromData',res.result)
                Vue.ls.set('teannId',teannid)
                window.location.href = this.hrefUrl+'?ownerId='+teannid
              }
            })
            .catch(err=>{
              console.log(err);
              this.$message.error(err)
            })
      }
    },
  }
</script>
<style scoped>
  .left{
    text-align: left;
  }
  .space{
    padding-top: 30px;
    border: 1px solid #ffffff;
    height: 100%;
  }
  .margin-left{
    margin-left: 20px;
    width: 180px;
  }
  i{
    font-size: 50px;
  }
  i,p{
    margin: 0;
    padding: 0;
  }
  .fixed{
    position: fixed;
    bottom: 100px;
    width: 100%
  }
  /deep/ .ant-btn.button{
    background-color: #07c160;
    border: 1px solid #07c160;
  }
</style>