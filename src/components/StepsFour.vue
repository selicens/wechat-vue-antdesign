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
                wordList:'',
                previewVisible: false,
                previewImage: '',
                fileList:[],
                valueData:'',
                uuid:'',
                owner_id:''
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
                this.previewImages = file.url || file.preview;
                this.previewVisibles = true;
            },
            handleChange({file, fileList}) {
                console.log(file)
                console.log(fileList)
                this.wordList = fileList
            },
            upload(f) {
                /*话术类图片上传*/
                let arr = new FormData
                arr.append('file', f.file)
                arr.append('industry', this.valueData)
                arr.append('ownerId',this.owner_id)
                arr.append('openId',this.uuid)
                if (this.valueData === '') {
                    this.$message.error('请先选择所属行业')
                    this.$router.go(0)
                } else {
                    uploadSayTemplateFile(arr)
                        .then(res => {
                            console.log(res)
                            if (res.code === 200) {
                                this.$message.success(res.message)
                                f.onSuccess()
                                /*this.$router.go(0)*/
                                //自定义上传成功后要调用onSuccess(),不然就会一直保持上传中状态，无法显示图片的缩略图
                            } else if (res.code === 500) {
                                console.log(res.message)
                                this.$message.error(res.message)
                                this.$router.go(0)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            },
            remove(file) {
                /*删除话术类图片调用*/
                this.fileList.splice(file.uid)
                console.log('点击了' + JSON.stringify(file))
                let formData = new FormData
                formData.append('name', file.name)
                formData.append('ownerId',this.owner_id)
                formData.append('openId',this.uuid)
                removeTemplate(formData)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            value(result,uuid,ownerId){
                this.page(result)
                this.uuid = uuid;
                this.owner_id = ownerId
                console.log("four:", uuid, ownerId);
            },
            page(result) {
                if (result.sayTemplateList !== null){
                    if (result.sayTemplateList.length == 0) {
                        console.log('空的')
                    } else {
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
                    }
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