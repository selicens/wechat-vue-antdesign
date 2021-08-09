<template>
    <div class="Businesslicense">
        <header>营业执照</header>
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
    </div>
</template>

<script>
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
            upload(f){
                let getUuid = this.$route.query.uuid
                let getOwnerId = this.$route.query.owner_id
                let formData = new FormData()
                formData.append('file', f.file)
                this.$axios.post(this.api+getOwnerId+'/'+getUuid+'/uploadBasicBiz',formData)
                    .then(res=>{
                        console.log(res)
                        if (res.data.code === 200){
                            this.$message.success(res.data.message);
                        }else if (res.data.code === 500){
                            this.$message.error(res.data.message);
                        }else {
                            this.$message.warning(res.data.message);
                        }if (this.$message.success){
                            console.log('成功了')
                            this.$router.push('/authentication'+'?owner_id='+getOwnerId+'&'+'uuid='+getUuid)
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            }
        },
        mounted(){
            let getUuid = this.$route.query.uuid
            let getOwnerId = this.$route.query.owner_id
            console.log(getUuid,getOwnerId)
        }
    }
</script>

<style scoped>
    .Businesslicense{
        background-color: #ececec;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    header{
        margin: 20px 0;
    }
    .bl-upload{
        border: 2px solid #ffffff;
        width: 350px;
        padding-top: 13px;
        margin: 30px 0 0 0;
    }
</style>