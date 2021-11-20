<template>
    <a-result status="404"
              title="404"
              sub-title="抱歉，你没有访问此页面的权限"
    >
        <template #extra>
            <a-button type="primary" block class="button" @click="close()">
                <strong>关闭页面</strong>
            </a-button>
        </template>
    </a-result>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: "ErrorPage",
        setup () {
            function close () {
                window.location.href="about:blank"
                window.close()
            }
            return { close }
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
