<template>
    <div>
        <a-row class="cardBox">
            <a-col :span="24" class="title">
                <h1>协议授权</h1>
                <span>请点击下方链接前往协议、文件下载页面，下载后填写、拍照、盖章并上传图片</span>
            </a-col>
            <a-col :span="24" class="title">
                <a v-on:click="goToLink">下载其他协议、文件链接</a>
            </a-col>
            <a-col :span="24">
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
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import {uploadFile} from "../utils/http"
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
        name: "StepsThree",
        data(){
            return{
                previewVisible: false,
                previewImage: '',
                fileList: [],
                imgArray:[],
            }
        },
        methods:{
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
            upload(files) {
                /*
                * 其他文件、协议类图片上传
                */
                const {file} = files
                let formData = new FormData()
                formData.append('file', file)
                formData.append('ownerId',Vue.ls.get('teannId'))
                formData.append('openId',Vue.ls.get('uuid'))
                uploadFile(formData)
                    .then(res => {
                        console.log(res)
                        if (res.code === 200) {
                            this.imgArray.push(res.result)
                            console.log('上传后：' + this.imgArray)
                            this.$emit('threeIMG',this.imgArray)
                            files.onSuccess()
                            //自定义上传成功后要调用onSuccess(),不然就会一直保持上传中状态，无法显示图片的缩略图
                        }else if (res.code === 500){
                            this.$message.error(res.message)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            removeData(file){
                console.log('删除了：',JSON.stringify(file));
                this.fileList.splice(file.uid)
                this.imgArray.splice(file.uid)
                console.log('此时的fileList：',this.fileList,this.imgArray)
            },
            value(result) {
                if (result.fileArray !== null){
                    if (result.fileArray.length == 0) {
                        console.log('空的')
                    } else {
                        console.log('回显前：' + JSON.stringify(this.fileList))
                        let data = result.fileArray
                        let dataList = data.split(",")
                        this.$emit('threeImgTwo',dataList)
                        console.log('字符串转为数组后：' + JSON.stringify(dataList))
                        this.fileList = dataList.map((item, index) => {
                            return {
                                uid: index,
                                name: index + '.png',
                                status: 'done',
                                response: '第' + index + '张图片',
                                url: item,
                            }
                        })
                        console.log('回显后：' + JSON.stringify(this.fileList))
                    }
                }
            },
            goToLink(){
                this.$router.push({path:'/link',query:{owner_id:Vue.ls.get('teannId')}})
            }
        }
    }
</script>

<style scoped>
    /deep/ .ant-row.cardBox{
        height: 80vh;
    }
</style>