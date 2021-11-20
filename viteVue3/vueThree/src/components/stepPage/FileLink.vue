<template>
    <a-card class="pageContent">
        <a-row>
            <a-col :span="24">
                <h1>协议、文件下载</h1>
                <h5 style="color: red">提示：复制链接用电脑端打开然后下载、打印、盖章;</h5>
            </a-col>
            <a-col :span="24" v-for="(item,key) in link" :key="key">
                <a :href="item">{{item.split('/').pop()}}</a>
            </a-col>
            <a-col :span="24" v-if="flStatus" rer="flStatus">
                <h5>页面加载出错，请返回上页重新跳转</h5>
            </a-col>
            <a-col :span="24" style="margin-top: 20px">
                <a-row>
                    <a-col :span="24">
                        <a-button class="button" block @click="copy">
                            <strong>复制页面</strong>
                        </a-button>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </a-card>
</template>

<script lang="ts">
    import { ref, reactive, defineComponent } from 'vue'
    import { templateFile } from "../custom/http"
    import { useRoute, useRouter } from 'vue-router'
    import copyUrlMixins from "../mixins/copyUrlMixins";
    import { message } from 'ant-design-vue'
    export default defineComponent ({
        name: "FileLink",
        setup () {
            let link = reactive([]),
                flStatus = ref(false)
            let route = useRoute()
            let ownerId: any = route.params.ownerId
            templateFile({ ownerId })
            .then( res => {
                if (res.code == 200) {
                   const linkData: Array<string> = res.result.files.split(',')
                    linkData.forEach(item =>{
                        link.push(item)
                    })
                } else {
                    flStatus.value = true
                }
            })
            .catch( err => {
                flStatus.value = true
                console.log(err);
            })
            const { copyUrl } = copyUrlMixins()
            function copy() {
                message.success('页面地址复制成功')
                return copyUrl()
            }
            return { link, copy, flStatus }
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
