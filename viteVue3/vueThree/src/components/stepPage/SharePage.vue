<template>
    <a-card class="shareContent" v-if="status">
        <a-row type="flex" justify="center">
            <a-col :xs="24" :sm="20" :md="20" :lg="20" :xl="8">
                <a-button size="large" type="primary" class="button" block @click="shareContent">
                    <strong>分享页面</strong>
                </a-button>
            </a-col>
            <a-col :span="24" class="compare">
                <h5>此页面链接半小时内有效！</h5>
            </a-col>
            <a-divider>个人信息</a-divider>
            <a-col :xs="24" :sm="20" :md="20" :lg="20" :xl="8">
                <a-row>
                    <a-col :xs="5" :sm="5" :md="5" :lg="5" :xl="2">
                        <a-avatar :src="shareValue.avatar" size="large"/>
                    </a-col>
                    <a-col :xs="15" :sm="15" :md="15" :lg="15" :xl="6">
                        <h5>微信：{{shareValue.username}}</h5>
                        <h5>手机：{{shareValue.mobile}}</h5>
                    </a-col>
                </a-row>
            </a-col>

            <a-divider>营业执照</a-divider>
            <a-col :xs="24" :sm="20" :md="15" :lg="10" :xl="4" class="imgContent">
                <img :src="shareValue.fileUrl" alt="">
            </a-col>
            <a-col :xs="24" :sm="20" :md="15" :lg="10" :xl="4" class="shareText">
                <h5>信用代码：{{shareValue.regno}}</h5>
                <h5>公司名称：{{shareValue.entname}}</h5>
                <h5>公司法人：{{shareValue.frname}}</h5>
                <h5>存续日期：{{shareValue.opfrom}} - 至今</h5>
            </a-col>
            <a-col :span="24" class="compare">
                <h5>与权威数据库比对，
                    <span :class="[shareValue.liveStatus == 1 ? 'success' : 'fail']">
                    {{shareValue.liveStatus == 1 ? '核验通过' : '未通过'}}
                </span>
                </h5>
            </a-col>
            <a-divider>人脸核身</a-divider>
            <a-col :xs="24" :sm="20" :md="15" :lg="10" :xl="4" class="imgContent">
                <img :src="shareValue.frontImage" alt="">
            </a-col>
            <a-col :xs="24" :sm="20" :md="15" :lg="10" :xl="4" class="shareText">
                <h5>证件号码：{{shareValue.idCard}}</h5>
                <h5>证件姓名：{{shareValue.name}}</h5>
                <h5>是否法人：<span :class="[shareValue.isCorp == 1 ? 'success' : 'fail']">{{shareValue.isCorp == 1 ? '是' : '否'}}</span></h5>

            </a-col>
            <a-col :span="24" class="compare">
                <h5>与权威数据库比对，
                    <span :class="[shareValue.liveStatus == 1 ? 'success' : 'fail']">
                    {{shareValue.liveStatus == 1 ? '核验通过' : '未通过'}}
                </span>
                </h5>
            </a-col>
        </a-row>
    </a-card>
    <error-custom v-else/>
</template>

<script lang="ts">
    import { ref, reactive, defineComponent, nextTick, onMounted } from 'vue'
    import { shareData } from '../custom/http'
    import { useRoute} from 'vue-router'
    import ErrorCustom from "./ErrorCustom.vue"
    import copyUrlMixins from "../mixins/copyUrlMixins"
    import { message } from 'ant-design-vue'
    export default defineComponent({
        components: { ErrorCustom },
        setup () {
            let route = useRoute().path.split('/')[2]
            let shareValue = reactive({
                avatar: '',
                username: '',
                mobile: '',
                fileUrl: '',
                regno: '',
                entname: '',
                opfrom: '',
                frname: '',
                liveStatus: '',
                frontImage: '',
                idCard: '',
                name: '',
                isCorp: ''
                }),
                status = ref(true)
            shareData({dataId: route})
                .then( res => {
                    console.log(res);
                    if (res.code == 200) {
                        shareValue.avatar = res.result.avatar
                        shareValue.username = res.result.username
                        shareValue.mobile = res.result.mobile
                        shareValue.fileUrl = res.result.fileUrl
                        shareValue.regno = res.result.regno
                        shareValue.entname = res.result.entname
                        shareValue.opfrom = res.result.opfrom
                        shareValue.frname = res.result.frname
                        shareValue.liveStatus = res.result.liveStatus
                        shareValue.frontImage = res.result.frontImage
                        shareValue.idCard = res.result.idCard
                        shareValue.name = res.result.name
                        shareValue.isCorp = res.result.isCorp
                    }else {
                        status.value = false
                    }
                })
                .catch( err => {
                    console.log(err);
                })
            const { copyUrl } = copyUrlMixins()
            function shareContent() {
                message.success('页面地址复制成功')
                return copyUrl()
            }
            return { shareValue, status, shareContent }
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
</style>
