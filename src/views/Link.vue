<template>
    <div class="container">
        <a-row>
            <a-col :span="24">
                <strong>协议、文件下载</strong>
            </a-col>
            <a-col :span="24" style="font-size: 15px;color: red;text-align:left">
                <p>提示：复制链接用电脑端打开下载、打印、盖章;</p>
            </a-col>
            <a-col :span="24" style="text-align: left;" v-for="item in linkData" :key="item">
                <a :href="item">{{item.split('/').pop()}}</a>
                <a-button type="link" icon="copy" v-on:click="copyBtn(item)">复制链接</a-button>
            </a-col>
            <a-col :span="24">
                <a-button type="primary" block v-on:click="getURL">复制页面链接</a-button>
            </a-col>
        </a-row>

    </div>
</template>

<script>
    export default {
        name: "Link",
        data() {
            return {
                linkData: [],
                msg: []
            }
        },
        methods: {
            getData() {
                let getUuid = this.$route.query.uuid
                let getOwnerId = this.$route.query.owner_id
                console.log(getUuid, getOwnerId)
                this.$axios.get(this.api + getOwnerId + '/myUserInfo',)
                    .then(res => {
                        console.log(res);
                        if (res.data.code === 200) {
                            this.linkData = res.data.result.files.split(',')
                        } else {
                            document.write('暂时没有模板数据！')
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            copyBtn(item){
                console.log(item);
                let link = item
                let input = document.createElement("input");   // 直接构建input
                input.value = link;  // 设置内容
                document.body.appendChild(input);    // 添加临时实例
                input.select();   // 选择实例内容
                document.execCommand("Copy");   // 执行复制
                document.body.removeChild(input); // 删除临时实例
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
    .container {
        padding: 10px;
        text-align: center;
        height: auto;
        width: 100%;
        font-size: 24px;
    }
</style>