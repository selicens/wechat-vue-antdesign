<template>
    <a-row class="shareBox">
        <a-col :span="24" v-if="shareValue">
            <a-row type="flex" justify="center">
                <a-col :xs="24" :sm="20" :md="15" :lg="10" :xl="8">
                    <a-button size="large" type="primary" class="submit" block v-on:click="shareUrl">
                        <strong>分享页面</strong></a-button>
                </a-col>
                <a-col :span="24" class="textCenter title" style="margin-top: 10px">
                    <span>此页面链接半小时内有效！</span>
                    <a-statistic-countdown
                            :value="Date.now() + 1000 * 60 * 60 * 0 + 1000 * 60 * 30"
                            valueStyle="color:#c0c0c0;font-size:10px"
                            @finish="onFinish"
                    />
                </a-col>
            </a-row>
            <a-col :span="24">
                <a-divider>个人信息</a-divider>
                <a-row type="flex" justify="center">
                    <a-col :xs="5" :sm="5" :md="4" :lg="3" :xl="2">
                        <a-avatar :size="54" :src="shareValue.avatar"/>
                    </a-col>
                    <a-col :xs="15" :sm="15" :md="11" :lg="7" :xl="6" class="avatar">
                        <span>微信：{{shareValue.username}}</span><br/>
                        <span>手机：{{shareValue.mobile}}</span>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="24">
                <a-divider>营业执照</a-divider>
                <a-row type="flex" justify="center">
                    <a-col :xs="20" :sm="20" :md="15" :lg="10" :xl="8" class="shareImg">
                        <img :src="shareValue.fileUrl+'?x-oss-process=style/hy'" alt="">
                    </a-col>
                </a-row>
                <a-row type="flex" justify="center">
                    <a-col :xs="20" :sm="20" :md="15" :lg="10" :xl="8" class="text">
                        <span>信用代码：{{shareValue.regno}}</span><br/>
                        <span>公司名称：{{shareValue.entname}}</span><br/>
                        <span>公司法人：{{shareValue.frname}}</span><br/>
                        <span>存续时间：{{shareValue.opfrom}} - 至今</span>
                    </a-col>
                </a-row>
                <a-col :span="24" class="textCenter">
                    <span>与权威数据库比对，
                        <strong :class="[shareValue.status == '通过' ? 'isCorp1' : 'isCorp2']">
                            {{shareValue.status == '通过' ? '核验通过' : '未通过'}}
                        </strong>
                    </span>
                </a-col>
            </a-col>
            <a-col :span="24">
                <a-divider>人脸核身</a-divider>
                <a-row type="flex" justify="center">
                    <a-col :xs="20" :sm="20" :md="15" :lg="10" :xl="8" class="shareImg">
                        <img :src="shareValue.frontImage+'?x-oss-process=style/hy'" alt="">
                    </a-col>
                </a-row>
                <a-row type="flex" justify="center">
                    <a-col :xs="20" :sm="20" :md="15" :lg="10" :xl="8" class="text">
                        <span>身份证号：{{shareValue.idCard}}</span><br/>
                        <span>证件姓名：{{shareValue.name}}</span><br/>
                        <span>是否法人：
                            <span v-if="!shareValue.isCorp"></span>
                            <span v-else :class="[shareValue.isCorp == 0 ? 'isCorp2' : 'isCorp1']">
                            {{shareValue.isCorp == 0 ? '非法人' : '是法人'}}
                            </span>
                        </span>
                    </a-col>
                </a-row>
                <a-col :span="24" class="textCenter">
                    <span>与权威数据库比对，
                        <strong :class="[shareValue.liveStatus == 1 ? 'isCorp1' : 'isCorp2']">
                            {{shareValue.liveStatus == 1 ? '核验通过' : '未通过'}}
                        </strong>
                    </span>
                </a-col>
            </a-col>
        </a-col>
        <a-col :span="24" v-else>
            <PublicPage/>
        </a-col>
    </a-row>
</template>

<script>
    import {shareData} from "../utils/http";
    import {copyUrl} from "../utils/copyUrl";
    import PublicPage from "./PublicPage";

    export default {
        name: "Share",
        components: {PublicPage},
        data() {
            return {
                shareValue: []
            }
        },
        methods: {
            shareUrl() {
                copyUrl()
                this.$message.success('当前页面链接已复制')
            },
            onFinish() {
                console.log("倒计时完毕");
                this.shareValue = false
            }
        },
        mounted() {
            let url = window.location.href.split('/')
            let value = url.slice(-1)[0]
            shareData({dataId: value})
                .then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.shareValue = res.result
                    } else if (res.code == 500) {
                        this.shareValue = false
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
</script>

<style scoped>
    .textCenter span {
        color: #c0c0c0;
        font-size: 1.5vh;
    }

    .avatar span {
        line-height: 30px;
    }

    .shareBox {
        margin: 10px;
        padding: 10px;
    }

    /deep/ .ant-btn.submit {
        background-color: #07c160;
        color: white;
        border: 1px solid #07c160;
        height: 50px;
    }

    .avatar p {
        padding: 0;
        margin: 0;
        line-height: 35px;
    }

    .isCorp1 {
        color: #07c160;
    }

    .isCorp2 {
        color: #faad14;
    }

    .text {
        margin-top: 10px;
    }

    .shareImg {
        height: auto;
    }

    .shareImg img {
        height: 100%;
        width: 100%;
        border: 1px solid #c0c0c0;
    }
</style>
