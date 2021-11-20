<template>
    <a-card class="pageContent">
        <a-row>
            <a-col :span="24">
                <h1>手机号验证</h1>
                <h5>请输入正确手机号并点击获取验证码，手机短信将收到验证码，验证码提交正确即可验证通过</h5>
            </a-col>
            <a-col :span="24" class="input-select">
                <a-input-search
                        v-model:value="mobileNumber"
                        placeholder="请输入手机号"
                        size="large"
                        @search="getVerificationCode"
                >
                    <template #enterButton>
                        <a-button>{{countDown ? time+'秒后获取' : '获取验证码'}}</a-button>
                    </template>
                </a-input-search>
            </a-col>
            <a-col :span="24" class="input-select">
                <a-input-search
                        v-model:value="verificationCode"
                        placeholder="请输入验证码"
                        size="large"
                        @search="submitCode"
                >
                    <template #enterButton>
                        <a-button>提交验证码</a-button>
                    </template>
                </a-input-search>
            </a-col>
        </a-row>
    </a-card>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue'
    import { message } from 'ant-design-vue'
    import { getCode, uploadCode } from "../custom/http";

    export default defineComponent({
        setup( props, {emit} ) {
            const mobileNumber = ref<string>('')
            const verificationCode = ref<string>('')
            let time = ref(60)
            const countDown = ref(false)
            const getVerificationCode = (codeValue: string) => {
              let mobile = /^(13[0-9]|14[0|1|4|5|6|7|9]|15[0-9]|16[2|6]|17[0|2|3|6|7|8]|18[0-9]|19[0|1|2|6|7|8|9])\d{8}$/
              if (mobile.test(codeValue)){
                  if (!countDown.value) {
                      let formData = new FormData
                      formData.append('mobile',codeValue)
                      getCode(formData)
                          .then(res => {
                              if (res.code == 0) {
                                  countDown.value = true
                                  let timeChange = setInterval(() => {
                                     time.value --;
                                     if (time.value == 0) {
                                         clearInterval(timeChange)
                                         countDown.value = false
                                     }
                                  },1000)
                              } else {
                                  message.warning(res.message)
                              }
                          })
                          .catch(err => {
                            console.log(err);
                          })
                  }
              }else {
                  message.warning('号码格式不正确')
              }
            }
            let openId: any = localStorage.getItem('uuid')
            let ownerId: any = localStorage.getItem('teannId')
            const submitCode = (submitValue: string) => {
                if (submitValue.length > 6 || submitValue.length < 6 || submitValue.length == 0) {
                    message.warning('验证码格式错误')
                } else {
                    let formData = new FormData
                    formData.append('captcha', submitValue)
                    formData.append('mobile', mobileNumber.value)
                    formData.append('openId', openId)
                    formData.append('ownerId', ownerId)
                    uploadCode(formData)
                    .then(res => {
                        message.success(res.message)
                        emit('mobile-emit',res)
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
            }
            function getData(data: any) {
                if (data) {
                    mobileNumber.value = data.mobile
                }
            }
            return {
                mobileNumber,
                verificationCode,
                time,
                countDown,
                getVerificationCode,
                submitCode,
                getData
            };
        },
    })
</script>

<style scoped>
    :deep(.ant-btn).button{
        background-color: #07c160;
        border: 1px solid #07c160;
        height: 50px;
    }
</style>
