<template>
    <a-card class="pageContent">
        <a-row>
            <a-col :span="24">
                <h1>协议授权</h1>
                <h5>请点击下方链接前往协议、文件下载页面，下载后填写、拍照、盖章并上传图片</h5>
            </a-col>
            <a-col :span="24" class="container">
                <a @click="goToLink">下载其他协议文件链接</a>
            </a-col>
            <a-col :span="24">
                <a-upload
                        v-model:file-list="fileList"
                        action="#"
                        list-type="picture-card"
                        @preview="handlePreview"
                        :customRequest="upload"
                        :remove="remove"
                >
                    <div v-if="fileList.length < 8">
                        <plus-outlined />
                        <div class="ant-upload-text">上传</div>
                    </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                    <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
            </a-col>
        </a-row>
    </a-card>
</template>

<script lang="ts">
    import { ref, reactive, defineComponent,   } from 'vue'
    import { PlusOutlined } from '@ant-design/icons-vue'
    import { useRoute, useRouter } from 'vue-router'
    import  uploadMixins from "../mixins/uploadMixins"
    import { uploadFile, submit, shareLink } from '../custom/http'
    import { message } from 'ant-design-vue'
    export default defineComponent({
        name: "TemplateFile",
        components: { PlusOutlined },
        setup () {
            const {previewVisible,
                previewImage,
                fileList,
                handleCancel,
                handlePreview,
                handleChange,} = uploadMixins()
            let router = useRouter()
            let ownerId: any = localStorage.getItem('teannId'),
                openId: any = localStorage.getItem('uuid')
            function goToLink() {
                router.push({name:'FileLink',params:{ ownerId }})
            }
            let fileArray: any = reactive([])
            function getData(data: any) {
                if (data.fileArray) {
                    let listData: any = data.fileArray.split(',')
                    fileArray = listData
                    console.log('test',listData);
                    fileList.value = listData.map((item,index) => {
                        return {
                            uid: index,
                            name: `${index}.png`,
                            status: 'done',
                            response: `第${index}张图片`,
                            url: item
                        }
                    })
                    console.log('页面进入',fileList.value);
                } else {
                    console.log('no',fileList.value);
                }
            }
            function upload(file: any) {
                let formData = new FormData()
                formData.append('file', file.file)
                formData.append('ownerId', ownerId)
                formData.append('openId', openId)
                uploadFile(formData)
                .then( res => {
                    if (res.code == 200) {
                       file.onSuccess()
                       console.log(res)
                       fileArray.push(res.result)
                       message.success(res.message)
                    } else {
                       message.success(res.message)
                    }
                })
                .catch( err => {
                    message.success(err);
                })
            }
            function remove(file: any) {
                let index = fileList.value.indexOf(file)
                let newFileList = fileList.value.slice()
                console.log(index,newFileList)
                newFileList.splice(index, 1)
                fileList.value = newFileList
                console.log(fileList.value)
            }
            function isFile() {
                let formData = new FormData()
                formData.append('picArray',fileArray)
                formData.append('ownerId',ownerId)
                formData.append('openId',openId)
                submit(formData)
                .then( res => {
                   if (res.code == 200) {
                       let formData = new FormData;
                       formData.append('openId',openId)
                       formData.append('ownerId',ownerId)
                       shareLink(formData)
                           .then( res => {
                               console.log(res);
                               if (res.code == 200) {
                                   router.push({path:'/sharePage/'+res.result})
                               }
                           })
                           .catch( err => {
                               console.log(err);
                           })
                   }
                })
                .catch( err => {
                    console.log(err);
                })
            }
            return {
                previewVisible,
                previewImage,
                fileList,
                handleCancel,
                handlePreview,
                handleChange,
                goToLink,
                upload,
                getData,
                remove,
                isFile
            };
        }
    })
</script>

<style scoped>

</style>
