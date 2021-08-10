<template>
    <div>
        <a-row class="atc-box">
            <a-col :span="24" class="atc-box-link">
                <a v-on:click="goToLink">下载其他协议、文件链接</a>
            </a-col>
            <a-col :span="24">
                <a-space>
                    <a-upload
                            action="#"
                            list-type="picture-card"
                            :file-list="fileList"
                            @preview="handlePreview"
                            @change="handleChange"
                            :customRequest="upload"
                            :remove="removeData"
                    >
                        <div v-if="fileList.length < 8">
                            <a-icon type="plus"/>
                            <div class="ant-upload-text">
                            </div>
                        </div>
                    </a-upload>
                    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                        <img alt="example" style="width: 100%" :src="previewImage"/>
                    </a-modal>
                </a-space>
            </a-col>
        </a-row><!--其他文件、协议验证-->
    </div>
</template>

<script>
    export default {
        name: "StepsThree"
    }
</script>

<style scoped>

</style>