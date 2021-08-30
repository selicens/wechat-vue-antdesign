<template>
    <div class="border">
        <a-row class="cardBox">
            <a-col :span="24">
                <h1>营业执照认证</h1>
                <ul>
                    <li>请保持营业执照清晰无遮挡、无反光</li>
                    <li>上传的文件只用作身份验证，不作他用</li>
                </ul>
                <div class="bl-upload">
                    <a-upload
                            action="#"
                            list-type="picture-card"
                            :file-list="fileList"
                            @preview="handlePreview"
                            @change="handleChange"
                            :customRequest = "upload"
                    >
                        <div v-if="fileList.length < 8">
                            <a-icon type="plus" />
                            <div class="ant-upload-text">
                                点击上传营业执照图片
                            </div>
                        </div>
                    </a-upload>
                    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                        <img alt="example" style="width: 100%" :src="previewImage"/>
                    </a-modal>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import {uploadBasicBiz} from "../utils/http"
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
        name: "Businesslicense",
        data(){
            return{
                previewVisible: false,
                previewImage: '',
                fileList: [],
            }
        },
        methods: {
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
            handleChange({ fileList }) {
                this.fileList = fileList;
            },
            upload(f) {
                let formData = new FormData()
                formData.append('file', f.file)
                formData.append('ownerId',Vue.ls.get('teannId'))
                formData.append('openId',Vue.ls.get('uuid'))
                uploadBasicBiz(formData)
                    .then(res => {
                        console.log(res)
                        if (res.code === 200) {
                            this.$message.success(res.message);
                            setTimeout(() => {
                                this.$router.push({path:'/authentication',query: {owner_id:Vue.ls.get('teannId'),uuid:Vue.ls.get('uuid')}})
                            }, 1000);
                        } else if (res.code === 500) {
                            this.$message.error(res.message);
                        } else {
                            this.$message.warning(res.message);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        mounted(){

        }
    }
</script>

<style scoped>
    /deep/ .ant-row.cardBox{
        height: 80vh;
    }
</style>