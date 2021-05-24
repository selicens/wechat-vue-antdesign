<template>
    <div class="authentication">
        <a-row class="atc-box">
            <a-col :span="24" v-on:click="goToBusinesslicense">
                <a-col :span="12">
                    <div class="images">
                        <img :src="pageData.fileUrl" alt="" v-if="imgData.blImg === true">
                        <img src="https://d0401.oss-cn-beijing.aliyuncs.com/zhouwei/yyzz.jpg" alt="" v-else>
                    </div>
                </a-col>
                <a-col :span="12">
                    <div class="image-texts">
                        <div v-if="imgData.blText === true">
                            <p>{{pageData.entname}}</p>
                            <p>法人：{{pageData.frname}}</p>
                            <p>{{pageData.regno}}</p>
                            <a-button type="primary" shape="circle" icon="check" size="small" style="margin-left: 85%"/>
                        </div>
                        <div v-else>
                            <p>营业执照</p>
                            <p>营业执照信息认证</p>
                        </div>
                    </div>
                </a-col>
            </a-col>
        </a-row><!--营业执照验证-->
        <a-row class="atc-box">
            <a-col :span="24" v-on:click="goToId">
                <a-col :span="12">
                    <div class="images">
                        <img :src="pageData.frontImage" alt="" v-if="imgData.idImg === true">
                        <img src="https://d0401.oss-cn-beijing.aliyuncs.com/zhouwei/idcn.jpg" alt="" v-else>
                    </div>
                </a-col>
                <a-col :span="12">
                    <div class="image-texts">
                        <div v-if="imgData.idImg === true">
                            <p>{{pageData.idCard}}</p>
                            <p>{{pageData.name}}</p>
                            <p>是否法人：{{pageData.isCorp}}</p>
                            <a-button type="primary" shape="circle" icon="check" size="small" style="margin-left: 85%"/>
                        </div>
                        <div v-else>
                            <p>身份证</p>
                            <p>身份证件信息认证</p>
                        </div>
                    </div>
                </a-col>
            </a-col>
        </a-row><!--身份证验证-->
        <a-row class="atc-box">
            <a-col :span="24" class="atc-box-link">
                <router-link to="/">下载其他协议、文件链接</router-link>
            </a-col>
            <a-col :span="24">
                <a-upload
                        action="#"
                        list-type="picture-card"
                        :file-list="fileList"
                        @preview="handlePreview"
                        @change="handleChange"
                        :customRequest="upload"
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
        </a-row><!--其他文件、协议验证-->
        <a-row class="atc-box">
            <a-col :span="24" class="atc-box-link">
                <a-select default-value="请先选择所属行业，再上传话术文件" style="width: 310px" @change="selectChange">
                    <a-select-option v-for="item in industryData" :key="item.id" :value='item.value'>
                        {{item.text}}
                    </a-select-option>
                </a-select>
            </a-col>
            <a-col :span="24">
                <a-upload
                        action="#"
                        list-type="picture-card"
                        :file-list="wordList"
                        @preview="handlePreviews"
                        @change="handleChanges"
                        :customRequest="upWord"
                        :remove="removeWord"
                >
                    <div v-if="fileList.length < 8">
                        <a-icon type="plus"/>
                        <div class="ant-upload-text">
                        </div>
                    </div>
                </a-upload>
                <a-modal :visible="previewVisibles" :footer="null" @cancel="handleCancel">
                    <img alt="example" style="width: 100%" :src="previewImages"/>
                </a-modal>
            </a-col>
        </a-row><!--话术类文件验证-->
        <a-row>
            <a-col :span="24">
                <a-button type="primary" block v-on:click="submit">
                    提交审核
                </a-button>
            </a-col>
        </a-row><!--提交审核-->
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
                previewVisibles: false,
                previewImage: '',
                previewImages: '',
                fileList: [],
                pageData: {
                    entname: '',/*公司名称*/
                    fileUrl: '',/*营业执照图片*/
                    frname: '',/*法人姓名*/
                    opfrom: '',/*注册日期*/
                    regno: '',/*营业执照编号*/
                    name: '',/*身份证姓名*/
                    idCard: '',/*身份证好*/
                    isCorp: '',/*是否法人*/
                    frontImage: '',/*身份证图片*/
                    liveStatus: '',/*活体检查结果*/
                    fileArray: '',/*其他资料*/
                    status: '',/*核验状态*/
                    sayTemplateList: [
                        /*话术文件、行业*/
                        {fileUrl: '', industry: '', name: ''}
                    ]
                },
                userID: '',
                ownerId: '',
                imgData: {
                    blImg: false,
                    idImg: false,
                    blText: false,
                    idText: false
                },
                imgArray: [],
                wordList: [],
                valueData: '',/*选择的选项*/
                industryData: [],/*下拉列表选项数据*/
            };
        },
        methods: {
            handleCancel() {
                this.previewVisible = false;
                this.previewVisibles = false;
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
            async handlePreviews(file) {
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }
                this.previewImages = file.url || file.preview;
                this.previewVisibles = true;
            },
            handleChanges({file, fileList}) {
                console.log(file)
                console.log(fileList)
                this.wordList = fileList
            },
            getPageData() {
                /*
                * 获取页面数据
                * 根据条件判断是否展示
                */
                let getUuid = this.$route.query.uuid
                let getOwnerId = this.$route.query.owner_id
                console.log('获取值：' + getUuid, getOwnerId)
                this.$axios.get(this.api + getOwnerId + '/' + getUuid + '/data')
                    .then(res => {
                        console.log(res)
                        if (res.data.code === 200) {
                            this.pageData = res.data.result
                        }
                        if (res.data.result.fileUrl !== null) {
                            this.imgData.blImg = true
                            this.imgData.blText = true
                        }
                        if (res.data.result.frontImage !== null) {
                            this.imgData.idImg = true
                            this.imgData.idText = true
                            if (res.data.result.isCorp == 0) {
                                this.pageData.isCorp = '否'
                            } else {
                                this.pageData.isCorp = '是'
                            }
                        }
                        if (res.data.result.fileArray !== null) {
                            if (res.data.result.fileArray.length === 0) {
                                console.log('空的')
                            } else {
                                console.log('回显前：' + JSON.stringify(this.fileList))
                                let data = res.data.result.fileArray
                                let dataList = data.split(",")
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
                        if (res.data.result.sayTemplateList.fileUrl !== null) {
                            let fileData = res.data.result.sayTemplateList
                            this.wordList = fileData.map((item, index) => {
                                return {
                                    uid: index,
                                    name: item.name,
                                    status: 'done',
                                    response: '第' + index + '张图片',
                                    url: item.fileUrl,
                                }
                            })
                            console.log(this.wordList)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            goToBusinesslicense() {
                /*
                * 前往营业执照验证界面
                */
                let getUuid = this.$route.query.uuid
                let getOwnerId = this.$route.query.owner_id
                this.$router.push('/businesslicense' + '?owner_id=' + getOwnerId + '&uuid=' + getUuid)
            },
            goToId() {
                /*
                * 前往身份证界面
                */
                let getUuid = this.$route.query.uuid
                let getOwnerId = this.$route.query.owner_id
                window.location.href = this.api + getOwnerId + '/' + getUuid + '/toDetect';
            },
            upload(files) {
                /*
                * 其他文件、协议类图片上传
                */
                let getUuid = this.$route.query.uuid
                let getOwnerId = this.$route.query.owner_id
                const {file} = files
                let formData = new FormData()
                formData.append('file', file)
                this.$axios.post(this.api + getOwnerId + '/' + getUuid + '/uploadFile', formData)
                    .then(res => {
                        console.log(res)
                        if (res.data.code === 200) {
                            this.imgArray.push(res.data.result)
                            console.log('上传后：' + this.imgArray)
                            files.onSuccess()
                            //自定义上传成功后要调用onSuccess(),不然就会一直保持上传中状态，无法显示图片的缩略图
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            submit() {
                /*
                * 其他文件、协议类提交审核
                */
                console.log('submit前：' + JSON.stringify(this.imgArray))
                if (this.imgArray.length === 0) {
                    this.$message.warning('其他协议、文件分类必需有照片');
                } else {
                    let getUuid = this.$route.query.uuid
                    let getOwnerId = this.$route.query.owner_id
                    let list = new FormData
                    list.append('picArray', this.imgArray)
                    this.$axios.post(this.api + getOwnerId + '/' + getUuid + '/submit', list)
                        .then(res => {
                            console.log(res)
                            if (res.data.code === 200) {
                                this.$router.go(0)
                                this.$message.success(res.data.message)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }

            },
            upWord(f) {
                /*
                *话术类图片上传
                */
                let getUuid = this.$route.query.uuid
                let getOwnerId = this.$route.query.owner_id
                let arr = new FormData
                arr.append('file', f.file)
                arr.append('industry', this.valueData)
                if (this.valueData === '') {
                    this.$message.error('请先选择所属行业')
                    this.$router.go(0)
                } else {
                    this.$axios.post(this.api + getOwnerId + '/' + getUuid + '/uploadSayTemplateFile', arr)
                        .then(res => {
                            console.log(res)
                            if (res.data.code === 200) {
                                f.onSuccess()
                                this.$router.go(0)
                                //自定义上传成功后要调用onSuccess(),不然就会一直保持上传中状态，无法显示图片的缩略图
                            } else if (res.data.code === 500) {
                                console.log(res.data.message)
                                this.$message.error(res.data.message)
                                this.$router.go(0)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            },
            removeWord(file) {
                /*
                *删除话术类图片调用
                */
                let getUuid = this.$route.query.uuid
                let getOwnerId = this.$route.query.owner_id
                console.log('点击了' + JSON.stringify(file))
                let formData = new FormData
                formData.append('name', file.name)
                this.$axios.post(this.api + getOwnerId + '/' + getUuid + '/removeSayTemplateFile', formData)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            selectChange(value) {
                /*
                *点击下拉选项类容
                */
                console.log(`selected ${value}`);
                this.valueData = value
                console.log(this.valueData)
            },
            getOptionData() {
                /*
                *获取下拉选项数据
                */
                this.$axios.get(this.api + 'dictItems?dictCode=say_template_key')
                    .then(res => {
                        console.log('选项列表：', res.data)
                        if (res.data.code === 200) {
                            this.industryData = res.data.result
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        mounted() {
            this.getPageData()
            this.getOptionData()
        }
    }
</script>

<style scoped>
    .authentication {
        width: 100%;
        height: auto;
        padding: 10px;
        background-color: #ffffff;
    }

    a {
        text-decoration: underline
    }

    p {
        margin: 0;
        padding: 0;
    }

    .atc-box {
        padding: 10px;
        margin: 5px 0 10px;
        border: 1px solid #c0c0c0;
        background-color: #E6E6E6;
        border-radius: 5px;
        box-shadow: darkgrey 10px 10px 10px 5px;
    }

    .atc-box-link {
        margin: 0 10px 0 10px;
    }

    .images {
        height: 120px;
    }

    .images img {
        width: 100%;
        height: 100%;
    }

    .image-texts {
        padding: 5px;
        line-height: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /deep/ .ant-upload.ant-upload-select-picture-card {
        width: 70px;
        height: 70px;
        margin: 10px;
    }

    /deep/ .ant-upload-list-picture-card-container {
        width: 145px;
        height: 100px;
        border: 1px solid #000000;
        margin: 10px;
    }

    /deep/ .ant-upload-list-picture-card .ant-upload-list-item {
        width: 145px;
        height: 100px;
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
        background-color: rgba(0, 0, 0, 0.6);
    }
</style>