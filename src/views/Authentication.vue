<template>
    <div class="authentication">
        <div class="card-box">
            <div class="image">
                <img src="https://d0401.oss-cn-beijing.aliyuncs.com/zhouwei/yyzz.jpg" alt="">
            </div>
            <div class="image-text"></div>
        </div>
        <div class="card-box">
            <div class="image">
                <img src="https://d0401.oss-cn-beijing.aliyuncs.com/zhouwei/yyzz.jpg" alt="">
            </div>
            <div class="image-text"></div>
        </div>
        <div class="card-boxS">
            <router-link to="/">下载其他协议、文件链接</router-link>
            <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture-card"
                    :file-list="fileList"
                    @preview="handlePreview"
                    @change="handleChange"
            >
                <div v-if="fileList.length < 8">
                    <a-icon type="plus" />
                    <div class="ant-upload-text">
                        Upload
                    </div>
                </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
        </div>
        <div class="card-boxS">
            <p>话术文件上传</p>
        </div>
        <div style="width: 350px">
            <a-button type="primary" block>
                提交审核
            </a-button>
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
        name: "Authentication",
        data() {
            return {
                previewVisible: false,
                previewImage: '',
                fileList: [],
            };
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
        },
    }
</script>

<style scoped>
    .authentication {
        width: 100%;
        height: 120%;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: #ececec;
    }
    .card-box {
        border: 1px solid #ffffff;
        background-color: #ffffff;
        width: 340px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
        border-radius: 5px;
        box-shadow: darkgrey 10px 10px 10px 5px;
        cursor: pointer;
    }
    .card-boxS {
        border: 1px solid #ffffff;
        background-color: #ffffff;
        width: 340px;
        height: auto;
        margin: 10px 0;
        padding: 10px 0 0 0;
        border-radius: 5px;
        box-shadow: darkgrey 10px 10px 10px 5px;
        cursor: pointer;
    }
    .image {
        width: 150px;
        height: 100px;
        border: 1px solid #ececec;
        background-color: #ececec;
        border-radius: 5px;
    }

    .image img {
        width: 150px;
        height: 100px;
    }

    .image-text {
        width: 130px;
        height: 130px;
        border: 1px solid #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 10px 0 10px;
    }
    /deep/ .picture-card .ant-upload{
        height: 76px;
        width: 76px;
    }
</style>