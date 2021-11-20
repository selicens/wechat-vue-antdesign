<template>
    <a-card class="pageContent">
        <a-row>
            <a-col :span="24">
                <h1>营业执照</h1>
                <h5>请保持营业执照清晰无遮挡、无反光</h5>
            </a-col>
            <a-col :span="24">
                <a-upload
                        v-model:file-list="fileList"
                        action="#"
                        list-type="picture-card"
                        @preview="handlePreview"
                        :customRequest="upload"
                >
                    <div v-if="fileList.length < 1">
                        <PlusOutlined />
                        <div class="ant-upload-text">上传</div>
                    </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                    <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
            </a-col>
            <a-row v-if="blStatus">
                <a-col :span="24" class="imgContent">
                    <img :src="pageData.fileUrl" alt="">
                </a-col>
                <a-col :span="24">
                    <h5>信用代码：{{pageData.regno}}</h5>
                    <h5>公司名称：{{pageData.entname}}</h5>
                    <h5>公司法人：{{pageData.frname}}</h5>
                </a-col>
                <a-col :span="22">
                    <h5>存续日期：{{pageData.opfrom}} - 至今</h5>
                </a-col>
                <a-col :span="2">
                    <CheckCircleOutlined :style="{fontSize: '13px', color: '#07c160'}"/>
                </a-col>
            </a-row>
            <a-row v-else>
                <a-col :span="24" class="imgContent">
                    <img src="../image/yyzz.png" alt="">
                </a-col>
                <a-col :span="24" class="texts">
                    <h5><strong>营业执照信息认证</strong></h5>
                    <h5>点击上传营业执照</h5>
                </a-col>
            </a-row>
        </a-row>
    </a-card>
</template>

<script lang="ts">
    import { ref, reactive, defineComponent } from 'vue'
    import { PlusOutlined, CheckCircleOutlined } from '@ant-design/icons-vue'
    import  uploadMixins from "../mixins/uploadMixins"
    import { uploadBasicBiz } from '../custom/http'
    import { message } from 'ant-design-vue'
    export default defineComponent ({
        name: "BusinessLicense",
        components: { PlusOutlined, CheckCircleOutlined },
        setup () {
            const {previewVisible,
                previewImage,
                fileList,
                handleCancel,
                handlePreview,
                handleChange,} = uploadMixins()
            let pageData = reactive({
                fileUrl: '',
                regno: '',
                entname: '',
                frname: '',
                opfrom: ''
            }),
                blStatus = ref(false)
            function getData(data: any) {
                if (data) blStatus.value =true;
                else blStatus.value = false;
                pageData.fileUrl = data.fileUrl
                pageData.regno = data.regno
                pageData.entname = data.entname
                pageData.frname = data.frname
                pageData.opfrom = data.opfrom
            }
            let ownerId: any = localStorage.getItem('teannId'),
                openId: any = localStorage.getItem('uuid')
            function upload(file: any) {
                let formData = new FormData()
                formData.append('file',file.file)
                formData.append('ownerId',ownerId)
                formData.append('openId',openId)
                uploadBasicBiz(formData)
                .then( res => {
                    if (res.code == 200) {
                       message.success(res.message)
                       file.onSuccess()
                       location.reload()
                    } else {
                       message.error(res.message)
                       location.reload()
                    }
                })
                .catch( err => {
                    message.error(err)
                    location.reload()
                })
            }
            return {
                previewVisible,
                previewImage,
                fileList,
                handleCancel,
                handlePreview,
                handleChange,
                getData,
                pageData,
                blStatus,
                upload
            };
        }
    })
</script>

<style scoped>

</style>
