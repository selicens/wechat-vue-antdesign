<template>
    <div class="border">
        <a-row class="cardBox">
            <a-col :span="24">
                <h1>协议、文件下载</h1>
            </a-col>
            <a-col :span="24" style="color: red;">
                <p>提示：复制链接用电脑端打开然后下载、打印、盖章;</p>
            </a-col>
            <a-col :span="24" class="title" v-for="item in linkData" :key="item">
                <a :href="item">{{item.split('/').pop()}}</a>
            </a-col>
            <a-col :span="24" class="title">
                <a-button type="primary" block v-on:click="getURL"><strong>复制页面链接</strong></a-button>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import {templateFile} from "../utils/http"
    import {copyUrl} from "../utils/copyUrl";

    export default {
        name: "Link",
        data() {
            return {
                linkData:''
            }
        },
        methods: {
            getData() {
                templateFile({ownerId:this.$route.query.owner_id})
                    .then(res => {
                        console.log(res);
                        if (res.code === 200) {
                            this.linkData = res.result.files.split(',')
                        } else {
                            document.write('暂时没有模板数据！')
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            getURL(){
                copyUrl()
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style scoped>
    /deep/ .ant-row.cardBox{
        height: 80vh;
    }

</style>