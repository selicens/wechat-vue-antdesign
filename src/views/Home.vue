<template>
    <a-row class="textCenter space">
        <a-col :span="24">
            <a-col :span="24" class="space">
                <h1>为了保证您的信息安全</h1>
                <h2>请进行安全识别验证</h2>
            </a-col>
            <a-col :span="24">
                <a-row class="flexCenter left space"
                       type="flex" justify="center"
                       v-for="(item,key) in describe"
                       :key="key"
                >
                    <a-col :xs="4" :sm="4" :md="3" :lg="2" :xl="1">
                        <a-icon :type="item.icon"/>
                    </a-col>
                    <a-col :xs="12" :sm="10" :md="8" :lg="6" :xl="3">
                        <p>{{item.text1}}</p>
                        <p>{{item.text2}}</p>
                    </a-col>
                </a-row>
            </a-col>
        </a-col>
        <div class="fixed">
            <a-row type="flex" justify="center">
                <a-col :xs="20" :sm="20" :md="15" :lg="10" :xl="8">
                    <a-button type="primary" round block v-on:click="start" size="large" class="button">
                        <span><strong>开始认证</strong></span>
                    </a-button>
                </a-col>
            </a-row>
        </div>
    </a-row>
</template>
<script>
    import Vue from "vue"
    import {fromData} from '../utils/http'

    export default {
        name: 'Home',
        data(){
            return{
                describe:[
                    {icon:'user',text1: '确保本人操作',text2:'非本人操作将无法通过认证'},
                    {icon:'profile',text1: '需提供营业执照',text2:'执照保持清晰无遮挡'},
                    {icon:'idcard',text1: '需提供身份证件',text2:'与营业执照法人同人最佳'}
                    ]
            }
        },
        methods: {
            start() {
                const teannid = this.$route.query.teannid
                const fromid = this.$route.query.fromId
                fromData({ownerId: teannid, fromId: fromid})
                    .then(res => {
                        if (res.code == 200) {
                            console.log(res);
                            this.$message.success(res.message)
                            Vue.ls.set('fromData', res.result)
                            Vue.ls.set('teannId', teannid)
                            window.location.href = this.hrefUrl + '?ownerId=' + teannid
                        }
                    })
                    .catch(err => {
                        this.$message.error(err)
                    })
            }
        },
    }
</script>
<style scoped>
    .left {
        text-align: left;
    }

    .space {
        padding-top: 4.5vh;
        border: 1px solid #ffffff;
        height: 100%;
    }

    i {
        font-size: 50px;
    }

    i, p {
        margin: 0;
        padding: 0;
    }

    .fixed {
        position: fixed;
        bottom: 15vh;
        width: 100%;
    }

    /deep/ .ant-btn.button {
        background-color: #07c160;
        border: 1px solid #07c160;
        height: 50px;
    }
</style>
