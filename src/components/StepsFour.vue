<template>
    <div>
        <a-row class="cardBox">
            <a-col :span="24" class="title">
                <h1>行业话术</h1>
                <span>请先选择所属行业，再上传话术文件图片</span>
            </a-col>
            <a-col :span="24" class="title">
                <a-select placeholder="请先选择所属行业，再上传话术文件" style="width: 100%;" @change="selectChange">
                    <a-select-option v-for="item in industryData" :key="item.id" :value='item.value'>
                        {{item.text}}
                    </a-select-option>
                </a-select>
            </a-col>
            <a-col :span="24">
                <a-upload
                        action="#"
                        list-type="picture-card"
                        :file-list="fileList"
                        @preview="handlePreview"
                        @change="handleChange"
                        :customRequest="upload"
                        :remove="remove">
                    <div v-if="fileList.length < 8">
                        <a-icon type="plus"/>
                        <div class="ant-upload-text">
                        </div>
                    </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                    <img alt="example" style="width: 100%" :src="previewImage"/>
                </a-modal>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import {dictionaries,uploadSayTemplateFile,removeTemplate} from "../utils/http"
    import Vue from "vue"
    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    export default {
        name: "StepsFour",
        data(){
            return{
                industryData:'',
                previewVisible: false,
                previewImage: '',
                fileList:[],
                valueData:''
            }
        },
        methods: {
            selectChange(value) {
                /*点击下拉选项类容*/
                console.log(`selected ${value}`);
                this.valueData = value
                console.log(this.valueData)
            },
            getOptionData() {
                /*获取下拉选项数据*/
                dictionaries({})
                    .then(res => {
                        console.log('选项列表：', res)
                        if (res.code === 200) {
                            this.industryData = res.result
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            handleCancel() {
                this.previewVisible = false;
            },
            async handlePreview(file) {
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }
                this.previewImage = file.url || file.preview;
                this.previewVisible = true;
            },
            handleChange({file, fileList}) {
                console.log(file)
                console.log(fileList)
                this.fileList = fileList
            },
            upload(f) {
                /*话术类图片上传*/
                let arr = new FormData
                arr.append('file', f.file)
                arr.append('industry', this.valueData)
                arr.append('ownerId',Vue.ls.get('teannId'))
                arr.append('openId',Vue.ls.get('uuid'))
                if (this.valueData === '') {
                    this.$message.error('请先选择所属行业')
                } else {
                    uploadSayTemplateFile(arr)
                        .then(res => {
                            console.log(res)
                            if (res.code === 200) {
                                this.$message.success(res.message)
                                f.onSuccess()
                                //自定义上传成功后要调用onSuccess(),不然就会一直保持上传中状态，无法显示图片的缩略图
                            } else{
                                this.$message.warning(res.message)
                            }
                        })
                        .catch(err => {
                            this.$message.error(err)
                        })
                }
            },
            remove(file) {
                /*删除话术类图片调用*/
                const index = this.fileList.indexOf(file);
                const newFileList = this.fileList.slice();
                newFileList.splice(index, 1);
                this.fileList = newFileList
                console.log('点击了' + JSON.stringify(file))
                let formData = new FormData
                formData.append('name', file.name)
                formData.append('ownerId',Vue.ls.get('teannId'))
                formData.append('openId',Vue.ls.get('uuid'))
                removeTemplate(formData)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            value(result){
                if (result.sayTemplateList !== null){
                    console.log('回显前：' + JSON.stringify(this.fileList))
                    let data = result.sayTemplateList
                    console.log('字符串转为数组后：' + JSON.stringify(data))
                    this.fileList = data.map((item, index) => {
                        return {
                            uid: index,
                            name: item.name,
                            status: 'done',
                            response: '第' + index + '张图片',
                            url: item.fileUrl,
                        }
                    })
                    console.log('回显后：' + JSON.stringify(this.fileList))
                }else {
                    console.log('空的')
                }
            }
        },
        mounted(){
            this.getOptionData()
        }
    }
</script>

<style scoped>
    /deep/ .ant-row.cardBox{
        height: 80vh;
    }
    /deep/ .ant-upload-list-picture .ant-upload-list-item {
        padding: 0;
    }
    /deep/.ant-upload-list-picture-card .ant-upload-list-item{
        padding: 0;
    }
    /deep/ .ant-upload-list-item-uploading-text {
        font-size: 2px;
    }

    /deep/ .ant-upload-list-picture-card .ant-upload-list-item-info {
        overflow: visible;
    }

    /deep/ .ant-upload-list-picture-card .ant-upload-list-item-name {
        display: block;
        margin-top: -20px;
        height: 20px;
        font-size: 12px;
        color: #ffffff;
        background-color: rgba(0, 0, 0, 0.9);
    }
</style>
