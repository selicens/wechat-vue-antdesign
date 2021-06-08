<template>
    <div class="container">
        <a-row>
            <a-col :span="24"><strong>协议、文件下载</strong></a-col>
            <a-col :span="24" style="font-size: 15px;color: red">提示：手机微信无法直接下载，点击链接后会提示网络出错，可点击右上角复制链接地址发送到电脑端打开！</a-col>
            <a-col :span="24" style="text-align: left;" v-for="item in linkData" :key="item">
                <a :href="item">{{item.split('/').pop()}}</a>
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