<template>
    <a-card class="pageContent">
        <a-row>
            <a-col :span="24">
                <h1>行业话术</h1>
                <h5>请先选择所属行业，再上传话术文件图片</h5>
            </a-col>
            <a-col :span="24" class="input-select" >
                <a-select
                        ref="select"

                        style="width: 100%"
                        @change="selectChange"
                        placeholder="请先选择所属行业，再上传话术文件"
                >
                    <a-select-option v-for="(item,key) in selectOption" :key="key" :value="item.value">
                        {{item.text}}
                    </a-select-option>
                </a-select>
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
                        <div class="ant-upload-text">Upload</div>
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
    import { ref, reactive, defineComponent, onMounted  } from 'vue'
    import { PlusOutlined } from '@ant-design/icons-vue'
    import  uploadMixins from "../mixins/uploadMixins";
    import { dictionaries, uploadSayTemplateFile, removeTemplate } from "../custom/http"
    import { message } from 'ant-design-vue'
    export default defineComponent({
        name: "ScriptFile",
        components: { PlusOutlined },
        setup () {
            const {previewVisible,
                previewImage,
                fileList,
                handleCancel,
                handlePreview,
                handleChange,} = uploadMixins()
            let selectOption = ref(),
                optionValue = ref()
            dictionaries({})
            .then( res =>{
                console.log(res);
                if (res.code == 200) {
                    selectOption.value = res.result
                } else {
                    selectOption.value = [{value: 'error',text: '请求出错，请刷新页面重新获取数据'}]
                }
            })
            .catch( err => {
                console.log(err);
            })

            const selectChange = (value: string) => {
                console.log(`selected ${value}`);
                optionValue.value = value
            };
            function getData(data: any) {
                if (data.sayTemplateList) {
                    let listData: any = data.sayTemplateList
                    fileList.value = listData.map((item,index) => {
                        return {
                            uid: index,
                            name: `${index}.png`,
                            status: 'done',
                            response: `第${index}张图片`,
                            url: item.fileUrl
                        }
                    })
                } else {
                    console.log('no');
                }
            }
            let ownerId: any = localStorage.getItem('teannId'),
                openId: any = localStorage.getItem('uuid')
            function upload(file: any) {
                let formData = new FormData()
                formData.append('file', file.file)
                formData.append('industry', optionValue.value)
                formData.append('ownerId', ownerId)
                formData.append('openId', openId)
                if (!optionValue.value) {
                    message.error('请先选择所属行业')
                } else {
                    uploadSayTemplateFile(formData)
                    .then( res => {
                        if (res.code == 200) {
                            message.success(res.message)
                            file.onSuccess()
                        } else {
                            message.error(res.message)
                        }
                    })
                    .catch( err => {
                        message.success(err);
                    })
                }
            }
            function remove(file: any) {
                let index = fileList.value.indexOf(file)
                let newFileList = fileList.value.slice()
                newFileList.splice(index, 1)
                fileList.value = newFileList
                let formData = new FormData
                console.log(file)
                formData.append('name', file.name)
                formData.append('ownerId',ownerId)
                formData.append('openId',openId)
                removeTemplate(formData)
                .then( res => {
                    if (res.code == 200 ) {
                        message.success(res.message)
                    } else {
                        message.error(res.message)
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
                selectChange,
                getData,
                selectOption,
                upload,
                remove
            };
        }
    })
</script>

<style scoped>

</style>
