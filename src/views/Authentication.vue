<template>
    <div class="authentication">
        <div class="card-box" v-on:click="goToBusinesslicense">
            <div class="image">
                <img :src="pageData.fileUrl" alt="" v-if="imgData.blImg === true">
                <img src="https://d0401.oss-cn-beijing.aliyuncs.com/zhouwei/yyzz.jpg" alt="" v-else>
            </div>
            <div class="image-text">
                <div v-if="imgData.blText === true">
                    <p>{{pageData.entname}}</p>
                    <p>法人：{{pageData.frname}}</p>
                    <p>{{pageData.regno}}</p>
                    <a-button type="primary" shape="circle" icon="check" size="small" style="margin-left: 90%"/>
                </div>
                <div v-else>
                    <p>营业执照</p>
                    <p>营业执照信息认证</p>
                </div>
            </div>
        </div>
        <div class="card-box" v-on:click="goToId">
            <div class="image">
                <img :src="pageData.frontImage" alt="" v-if="imgData.idImg === true">
                <img src="https://d0401.oss-cn-beijing.aliyuncs.com/zhouwei/idcn.jpg" alt="" v-else>
            </div>
            <div class="image-text">
                <div v-if="imgData.idImg === true">
                    <p>{{pageData.idCard}}</p>
                    <p>{{pageData.name}}</p>
                    <p>是否法人：{{pageData.isCorp}}</p>
                    <a-button type="primary" shape="circle" icon="check" size="small" style="margin-left: 90%"/>
                </div>
                <div v-else>
                    <p>身份证</p>
                    <p>身份证件信息认证</p>
                </div>
            </div>
        </div>
        <div class="card-boxS">
            <div class="card-boxS-sub">
                <router-link to="/">下载其他协议、文件链接</router-link>
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
                        </div>
                    </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                    <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
            </div>
        </div>
        <div class="card-boxS">
            <div class="card-boxS-sub">
                <div style="color:#1890ff">话术文件上传</div>
                <a-upload
                        action="#"
                        list-type="picture-card"
                        :file-list="wordList"
                        @preview="handlePreviews"
                        @change="handleChanges"
                        :customRequest = "upWord"
                        :remove = "removeWord"
                >
                    <div v-if="fileList.length < 8">
                        <a-icon type="plus" />
                        <div class="ant-upload-text">
                        </div>
                    </div>
                </a-upload>
                <a-modal :visible="previewVisibles" :footer="null" @cancel="handleCancel">
                    <img alt="example" style="width: 100%" :src="previewImages" />
                </a-modal>
            </div>
        </div>
        <div style="width: 350px;margin: 10px 0">
            <a-button type="primary" block v-on:click="submit">
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
                previewVisibles: false,
                previewImage: '',
                previewImages:'',
                fileList: [],
                pageData:{
                    entname:'',
                    fileUrl:'',
                    frname:'',
                    opfrom:'',
                    regno:'',
                    name:'',
                    idCard:'',
                    isCorp:'',
                    frontImage:'',
                    liveStatus:'',
                    fileArray:'',
                    status:'',
                    sayTemplateList:[
                        {fileUrl:'',industry:'',name:''}
                        ]
                },
                userID:'',
                ownerId:'',
                imgData:{
                    blImg:false,
                    idImg:false,
                    blText:false,
                    idText:false
                },
                imgArray:[],
                wordList:[]
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
            handleChange({file,fileList}) {
                console.log(file)
                console.log(fileList)
                this.fileList = fileList
            },
            async handlePreviews(file) {
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }
                this.previewImages = file.url || file.preview;
                this.previewVisibles= true;
            },
            handleChanges({file,fileList}) {
                console.log(file)
                console.log(fileList)
                this.wordList = fileList
            },
            getPageData() {
                let getId = this.$route.query.uuid
                this.userID = getId
                this.$axios.get(this.api+this.userID+'/data')
                .then(res=>{
                    console.log(res)
                    if (res.data.code === 200){
                        this.pageData = res.data.result
                    }
                    if (res.data.result.fileUrl !== null){
                        this.imgData.blImg = true
                        this.imgData.blText = true
                    }
                    if (res.data.result.frontImage !== null){
                        this.imgData.idImg = true
                        this.imgData.idText = true
                    }
                    if (res.data.result.fileArray !== null){
                        console.log(JSON.stringify(this.fileList))
                        let data = res.data.result.fileArray
                        let dataList = data.split(",")
                        console.log(dataList)
                        this.fileList = dataList.map((item,index)=>{
                            return{
                                uid:index,
                                name:index+'.png',
                                status: 'done',
                                response: '第'+index+'张图片',
                                url: item,
                            }
                        })
                        console.log(this.fileList)
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            },
            goToBusinesslicense(){
                this.$router.push('/businesslicense' +'?owner_id=1'+'&'+ 'uuid=' + this.userID)
            },
            goToId(){
                window.location.href = this.api + this.userID + '/toDetect';
            },
            upload(files){
                const { file } = files
                let formData = new FormData()
                formData.append('file', file)
                this.$axios.post(this.api+this.userId+'/uploadFile',formData)
                .then(res=>{
                    console.log(res)
                    if (res.data.code === 200){
                        this.imgArray.push(res.data.result)
                        console.log('上传后：'+this.imgArray)
                        files.onSuccess()
                        //自定义上传成功后要调用onSuccess(),不然就会一直保持上传中状态，无法显示图片的缩略图
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            },
            submit(){
                console.log('submit前：'+JSON.stringify(this.imgArray))
                let list = new FormData
                list.append('picArray',this.imgArray)
                this.$axios.post(this.api+this.userID+'/submit',list)
                .then(res=>{
                    console.log(res)
                    if(res.data.code === 200){
                        this.$router.go(0)
                    }
                })
                .catch(err=>{
                    console.log(err)
                })

            },
            upWord(f){
               let arr = new FormData
               arr.append('file',f.file)
               arr.append('industry',1)
               this.$axios.post(this.api+this.userID+'/uploadSayTemplateFile',arr)
               .then(res=>{
                   console.log(res)
                   if (res.data.code === 200){
                       f.onSuccess()
                       //自定义上传成功后要调用onSuccess(),不然就会一直保持上传中状态，无法显示图片的缩略图
                   }
               })
               .catch(err=>{
                   console.log(err)
               })
            },
            removeWord(file){
                console.log('点击了'+file)
                let name = new FormData
                name.append('name',file)
                this.$axios.post(this.api+this.userID+'/removeSayTemplateFile',name)
                .then(res=>{
                    console.log(res)
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        },
        mounted(){
            this.getPageData()
            let getUuid = this.$route.query.uuid
            let getOwnerId = this.$route.query.owner_id
            this.userId = getUuid
            this.ownerId = getOwnerId
            console.log(getUuid,getOwnerId)
        }
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
    p {
        margin: 0;
        padding: 0;
    }
    .card-box {
        border: 1px solid #ffffff;
        background-color: #ffffff;
        width: 340px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0 0 0;
        border-radius: 5px;
        box-shadow: darkgrey 10px 10px 10px 5px;
        cursor: pointer;
    }
    .card-boxS {
        border: 1px solid #ffffff;
        background-color: #ffffff;
        width: 340px;
        height: auto;
        margin: 10px 0 0 0;
        padding: 10px 0 0 0;
        border-radius: 5px;
        box-shadow: darkgrey 10px 10px 10px 5px;
        cursor: pointer;
    }
    .card-boxS-sub{
        margin: 10px 0px 10px 17px;
    }
    .card-boxS-sub div{
        margin: 0 0 10px 0;
    }
    .image {
        width: 160px;
        height: 100px;
        border: 1px solid #ececec;
        background-color: #ececec;
        border-radius: 5px;
    }

    .image img {
        width: 160px;
        height: 100px;
    }

    .image-text {
        width: 180px;
        height: 130px;
        border: 1px solid #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 10px 0 10px;
    }
    /deep/ .ant-upload.ant-upload-select-picture-card{
        width: 70px;
        height: 70px;
    }
    /deep/ .ant-upload-list-picture-card-container{
        width: 70px;
        height: 70px;
    }
    /deep/ .ant-upload-list-picture-card .ant-upload-list-item{
        width: 70px;
        height: 70px;
        padding: 0;
    }
    /deep/ .ant-upload-list-item-uploading-text{
        font-size: 2px;
    }
</style>