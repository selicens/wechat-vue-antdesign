<template>
    <a-card :bordered="false">
        <a-row class="container">
            <a-col :span="24">
                <a-col :span="24" class="space">
                    <h1><strong>为了保证您的信息安全</strong></h1>
                    <h2>请进行安全识别认证</h2>
                </a-col>
                <a-col :span="24">
                    <a-row type="flex" justify="center" :gutter="10" class="space">
                        <a-col class="icon-right" :xs="4" :sm="4" :md="3" :lg="2" :xl="1">
                            <UserOutlined :style="{fontSize: '45px', color: '#1890ff'}"/>
                        </a-col>
                        <a-col class="text-left" :xs="12" :sm="10" :md="8" :lg="6" :xl="3">
                            <span><strong>{{describe.oneself1}}</strong></span><br/>
                            <span>{{describe.oneself2}}</span>
                        </a-col>
                    </a-row>
                    <a-row type="flex" justify="center" :gutter="10" class="space">
                        <a-col class="icon-right" :xs="4" :sm="4" :md="3" :lg="2" :xl="1">
                            <ProfileOutlined :style="{fontSize: '45px', color: '#1890ff'}"/>
                        </a-col>
                        <a-col class="text-left" :xs="12" :sm="10" :md="8" :lg="6" :xl="3">
                            <span><strong>{{describe.license1}}</strong></span><br/>
                            <span>{{describe.license2}}</span>
                        </a-col>
                    </a-row>
                    <a-row type="flex" justify="center" :gutter="10" class="space">
                        <a-col class="icon-right" :xs="4" :sm="4" :md="3" :lg="2" :xl="1">
                            <IdcardOutlined :style="{fontSize: '45px', color: '#1890ff'}"/>
                        </a-col>
                        <a-col class="text-left" :xs="12" :sm="10" :md="8" :lg="6" :xl="3">
                            <span><strong>{{describe.idCard1}}</strong></span><br/>
                            <span>{{describe.idCard2}}</span>
                        </a-col>
                    </a-row>
                </a-col>
            </a-col>
        </a-row>
    </a-card>
    <a-row type="flex" justify="center" class="fixed-login">
        <a-col :span="24">
            <a-button type="primary" size="large" block class="button" @click="login">
                <strong>开始认证</strong>
            </a-button>
        </a-col>
    </a-row>
</template>

<script lang="ts">
    import { reactive, defineComponent  } from 'vue'
    import { useRoute } from 'vue-router'
    import { UserOutlined, IdcardOutlined, ProfileOutlined } from '@ant-design/icons-vue'
    import { formData } from "../components/custom/http"
    import { baseUrl } from "../components/custom/api";

    export default defineComponent ({
        setup() {
            let describe = reactive({
                oneself1: '需确保本人操作',
                oneself2: '非本人操作无法通过认证',
                license1: '需提供营业执照',
                license2: '营业执照保持清晰无遮挡',
                idCard1: '需提供身份证件',
                idCard2: '与营业执照法人同人最佳'
            })
            let ownerId: any = useRoute().query.teannid
            let fromId: any = useRoute().query.fromId
            console.log(ownerId, fromId)
            function login() {
                formData({ownerId, fromId})
                    .then(res => {
                        if (res.code == 200 ) {
                            localStorage.setItem('teannId',ownerId)
                            localStorage.setItem('fromData',res.result)
                            window.location.href = baseUrl.weChatLogin + `?ownerId=${ownerId}`
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

            return { describe, login }
        },
        components: { UserOutlined, IdcardOutlined, ProfileOutlined },
    });
</script>
<style scoped>
:deep(.ant-btn).button{
    background-color: #07c160;
    border: 1px solid #07c160;
    height: 50px;
    color: white;
}
</style>
