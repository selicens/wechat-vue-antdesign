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
                let url = window.location.href
                console.log(url);
                let input = document.createElement("input");   // 直接构建input
                input.value = url;  // 设置内容
                document.body.appendChild(input);    // 添加临时实例
                input.select();   // 选择实例内容
                document.execCommand("Copy");   // 执行复制
                document.body.removeChild(input); // 删除临时实例
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