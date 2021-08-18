<template>
  <div>
    <a-row class="cardBox">
      <a-col :span="24">
        <a-col :span="24" class="title">
          <h2>手机号验证</h2>
        </a-col>

        <a-col :span="24" class="title">
          <a-input-search placeholder="请输入手机号码" @search="getVerificationCode" size="large">
            <a-button slot="enterButton" size="large">
              <strong>获取验证码</strong>
            </a-button>
          </a-input-search>
        </a-col>
        <a-col :span="24" class="atc-input">
          <a-input-search placeholder="请输入验证码" @search="submitCode" size="large">
            <a-button slot="enterButton" class="submit" size="large">
              <strong>提交验证码</strong>
            </a-button>
          </a-input-search>
        </a-col>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import {getCode,uploadCode} from "../utils/http";

  export default {
  name: 'StepsFive',
  data(){
    return{
      phone:'',
      uuid:'',
      owner_id:''
    }
  },
  methods:{
    getVerificationCode(value){
      if(value.length > 11){
        this.$message.warning('手机号不正确,超出长度限制');
      }else if (value.length < 11){
        this.$message.warning('手机号不正确,号码长度不足');
      }else {
        let phone = /^(13[0-9]|14[0|1|4|5|6|7|9]|15[0-9]|16[2|6]|17[0|2|3|6|7|8]|18[0-9]|19[0|1|2|6|7|8|9])\d{8}$/
        if(!phone.test(value)){
          this.$message.error('手机号不正确,不是有效手机号');
        }else{
          console.log("正在请求获取验证码",value);
          this.phone = value
          let formData = new FormData
          formData.append('mobile',value)
          getCode(formData)
            .then(res=>{
              console.log(res);
              if(res.message == '验证码10分钟内，仍然有效！'){
                this.$message.success(res.message)
              }
            })
            .catch(err=>{
              console.log(err);
            })
        }
      }
    },
    submitCode(value){
      console.log("提交");
      if(value.length == 0){
        this.$message.error('验证码不可为空')
      }else if (value.length < 6){
        this.$message.error('验证码格式错误')
      }else if (value.length > 6){
        this.$message.error('验证码格式错误')
      }else {
        if(this.phone.length == 0){
          this.$message.error('验证码已失效，请重新输入手机号获取')
        }else {
          let formData = new FormData
          formData.append('captcha',value)
          formData.append('mobile',this.phone)
          formData.append('openId',this.uuid)
          formData.append('ownerId',this.owner_id)
          uploadCode(formData)
                  .then(res=>{
                    console.log(res);
                    this.$message.success(res.message)
                    this.$emit('success',res)
                  })
                  .catch(err=>{
                    console.log(err);
                    this.$message.error(err)
                  })
        }
      }
    },
    value(result,uuid,ownerId){
      this.uuid = uuid
      this.owner_id = ownerId
      console.log("five:" , result, uuid, ownerId);
    }
  }
}
</script>


<style scoped>
  /deep/ .ant-btn.submit{
    background-color: #07c160;
    color: white;
    border: 1px solid #07c160;
  }
  /deep/ .ant-row.cardBox{
    height: 450px;
  }
</style>
