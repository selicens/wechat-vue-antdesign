<template>
    <a-result status="403" title="403" sub-title="抱歉，你没有访问此页面的权限">
        <template #extra>
            <a-button type="primary" class="submit" v-on:click="closePage">
                <strong>关闭页面</strong>
            </a-button>
        </template>
    </a-result>
</template>

<script>
    export default {
        name: "PublicPage",
        methods:{
            closePage(){
                window.location.href="about:blank";
                window.close();
            }
        }
    }
</script>

<style scoped>
    /deep/ .ant-btn.submit{
        background-color: #07c160;
        color: white;
        border: 1px solid #07c160;
        height: 50px;
    }
</style>
