<template>
    <a-row class="shareBox">
        <a-col :span="24" v-if="shareValue">
            <a-col :span="24" class="textCenter" style="margin-top: 10px">
                <a-button size="large" type="primary" class="submit" v-on:click="shareUrl" ><strong>分享页面</strong></a-button>
            </a-col>
            <a-col :span="24">
                <a-col :span="24" class="textCenter title" style="margin-top: 10px">
                    <span>此页面链接半小时内有效！</span>
                </a-col>
                <a-divider>个人信息</a-divider>
                <a-col :span="5" :offset="1">
                    <a-avatar :size="54" :src="shareValue.avatar" />
                </a-col>
                <a-col :span="18" class="avatar">
                    <span>微信：{{shareValue.username}}</span><br/>
                    <span>手机：{{shareValue.mobile}}</span>
                </a-col>
            </a-col>
            <a-col :span="24">
                <a-divider>营业执照</a-divider>
                <a-col :span="24" class="shareImg">
                    <img :src="shareValue.fileUrl+'?x-oss-process=style/hy'" alt="">
                </a-col>
                <a-col class="text">
                    <span>信用代码：{{shareValue.regno}}</span><br/>
                    <span>公司名称：{{shareValue.entname}}</span><br/>
                    <span>公司法人：{{shareValue.frname}}</span><br/>
                    <span>存续时间：{{shareValue.opfrom}} - 至今</span>
                </a-col>
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
                <a-col :span="24" class="shareImg">
                    <img :src="shareValue.frontImage+'?x-oss-process=style/hy'" alt="">
                </a-col>
                <a-col class="text">
                    <span>身份证号：{{shareValue.idCard}}</span><br/>
                    <span>证件姓名：{{shareValue.name}}</span><br/>
                    <span>是否法人：
                        <span :class="[shareValue.isCorp == 0 ? 'isCorp2' : 'isCorp1']">
                        {{shareValue.isCorp == 0 ? '非法人' : '是法人'}}
                        </span>
                    </span>
                </a-col>
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
            <a-result status="403" title="403" sub-title="抱歉！链接已过期，联系重新获取">
                <template #extra>
                    <a-button type="primary" v-on:click="closePage">
                        关闭页面
                    </a-button>
                </template>
            </a-result>
        </a-col>
    </a-row>
</template>

<script>
    import {shareData} from "../utils/http";
    export default {
        name: "Share",
        data(){
            return{
                shareValue:[]
            }
        },
        methods:{
            shareUrl(){
                let url = window.location.href
                console.log(url);
                let input = document.createElement("input");   // 直接构建input
                input.value = url;  // 设置内容
                document.body.appendChild(input);    // 添加临时实例
                input.select();   // 选择实例内容
                document.execCommand("Copy");   // 执行复制
                document.body.removeChild(input); // 删除临时实例
                this.$message.success('当前页面链接已复制')
            },
            closePage(){
                window.location.href="about:blank";
                window.close();
            }
        },
        mounted(){
            let value = this.$route.query.dataId
            shareData({dataId:value})
                .then(res=>{
                    console.log(res);
                    if (res.code == 200){
                        this.shareValue = res.result
                    }else if (res.code == 500){
                        this.shareValue = false
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
        }
    }
</script>

<style scoped>
    .textCenter span{
        color: #c0c0c0;
        font-size: 1.5vh;
    }
    .avatar span{
        line-height: 30px;
    }
    .shareBox{
        margin: 10px;
        padding: 10px;
    }
    /deep/ .ant-btn.submit{
        background-color: #07c160;
        color: white;
        border: 1px solid #07c160;
        width: 100%;
        height: 50px;
    }
   .avatar p{
        padding: 0;
        margin: 0;
        line-height: 35px;
    }
    .text{
        margin: 10px 40px;
    }
    .isCorp1{
        color: #07c160;
    }
    .isCorp2{
        color: #faad14;
    }
    .shareImg{
        height: auto;
        margin: 0 0 10px 0;
        padding: 0 40px;
    }
    .shareImg img{
        height: 100%;
        width: 100%;
        border: 1px solid #c0c0c0;
    }
</style>