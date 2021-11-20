<template>
    <a-steps :current="current" size="small" style="display: none">
        <a-step v-for="(item,key) in steps.stepsValue" :key="key" :title="item"></a-step>
    </a-steps>
    <div class="steps-content">
        <mobile-phone v-show="stepData == '手机号码'" ref="mobilePhone" @mobile-emit="mobileNext"/>
        <business-license v-show="stepData == '营业执照'" ref="businessLicense"/>
        <face-nucleus v-show="stepData == '人脸核身'" ref="faceNucleus"/>
        <template-file v-show="stepData == '协议授权'" ref="templateFile"/>
        <script-file v-show="stepData == '行业话术'" ref="scriptFile"/>
    </div>
    <a-row class="steps-action fixed-btn">
        <a-col :span="12">
            <a-button @click="prev" type="default" block size="large" v-if="current > 0" class="button btn-sub-right">
                <strong>上一步</strong>
            </a-button>
        </a-col>
        <a-col :span="12" v-if="current < steps.stepsValue.length - 1">
            <a-button @click="next" type="primary" block size="large" class="button btn-sub-left">
                <strong>下一步</strong>
            </a-button>
        </a-col>
        <a-col :span="12" v-if="current == steps.stepsValue.length - 1">
            <a-button @click="submits" type="primary" block size="large" class="button btn-sub-left" >
                <strong>提交</strong>
            </a-button>
        </a-col>
    </a-row>
</template>

<script lang="ts">
    import { ref, reactive, defineComponent, onMounted  } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import MobilePhone from "../stepPage/MobilePhone.vue"
    import BusinessLicense from "../stepPage/BusinessLicense.vue"
    import FaceNucleus from "../stepPage/FaceNucleus.vue"
    import TemplateFile from "../stepPage/TemplateFile.vue"
    import ScriptFile from "../stepPage/ScriptFile.vue"
    import { pageData, shareLink } from "../custom/http"
    import { message } from 'ant-design-vue'
    export default defineComponent ({
        components: {ScriptFile, TemplateFile, FaceNucleus, BusinessLicense, MobilePhone},
        setup () {
            let ownerId: any = localStorage.getItem('teannId')
            let openId: any = useRoute().query.uuid
            localStorage.setItem('uuid',openId)
            let fromData: any = localStorage.getItem('fromData')
            let mobilePhone = ref(),
                businessLicense = ref(),
                faceNucleus = ref(),
                templateFile = ref(),
                scriptFile = ref(),
                pageValue = ref()
            onMounted (() => {
                pageData({ownerId,openId})
                    .then( res => {
                        console.log(res);
                        if (res.code == 200) {
                            pageValue.value = res.result
                            mobilePhone.value.getData(res.result)
                            businessLicense.value.getData(res.result)
                            faceNucleus.value.getData(res.result)
                            templateFile.value.getData(res.result)
                            scriptFile.value.getData(res.result)
                            if (res.result.mobile) {
                                /*如果手机号验证过就跳转下一页*/
                                next()
                            }
                        }
                    })
                    .catch( err => {
                        console.log(err);
                    })
            })

            let stepsValue = JSON.parse(fromData)
            let steps = reactive({
                stepsValue
            })
            let current = ref<number>(0)
            let stepData = ref(steps.stepsValue[0])
            function prev() {
                current.value --;
                stepData.value = steps.stepsValue[current.value]
            }
            function next() {
                switch (stepData.value) {
                    case '手机号码':
                        if (pageValue.value.mobile) {
                            conditionNext()
                        } else {
                           message.error('验证通过方可执行下一步')
                        }
                    break;
                    case '营业执照':
                        if (pageValue.value.fileUrl) {
                            conditionNext()
                        } else {
                           message.error('验证通过方可执行下一步')
                        }
                    break;
                    case '人脸核身':
                        if (pageValue.value.frontImage) {
                            conditionNext()
                        } else {
                           message.error('验证通过方可执行下一步')
                        }
                    break;
                    case '协议授权':
                        if (pageValue.value.fileArray) {
                            conditionNext()
                        } else {
                           message.error('验证通过方可执行下一步')
                        }
                    break;
                    case '行业话术':
                        if (pageValue.value.sayTemplateList) {
                            conditionNext()
                        } else {
                           message.error('验证通过方可执行下一步')
                        }
                    break;
                }
            }
            function mobileNext(value: any) {
                if (value.code == 0 ) {
                    next()
                }
            }
            function conditionNext() {
                current.value ++;
                stepData.value = steps.stepsValue[current.value]
            }
            function submits() {
                templateFile.value.isFile()
            }
            return { mobilePhone,
                businessLicense,
                faceNucleus,
                templateFile,
                scriptFile,
                pageValue,
                current,
                stepData,
                steps,
                prev,
                next,
                mobileNext,
                submits,
                conditionNext}
        }
    })
</script>

<style scoped>
    :deep(.ant-btn).button{
        background-color: #07c160;
        border: 1px solid #07c160;
        height: 50px;
        color: white;
    }
    :deep(.ant-btn).btn-sub-right{
        border-right: 2px solid white;
        border-bottom-right-radius: 3px;
        border-top-right-radius: 3px;
    }
    :deep(.ant-btn).btn-sub-left{
        border-left: 2px solid white;
        border-bottom-left-radius: 3px;
        border-top-left-radius: 3px;
    }
</style>
