<template>
    <div class="border" style="height: 100%;">
        <a-col :span="24" v-if="page">
            <a-steps :index="index" style="display: none" size="small">
                <a-step v-for="item in steps" :key="item" :title="item" />
            </a-steps>
            <div class="steps-content">
                <steps-five ref="stepsFive" v-show="current == '手机号码'" @success="goNext"></steps-five>
                <steps-one ref="stepsOne" v-show="current == '营业执照'"></steps-one>
                <steps-two ref="stepsTwo" v-show="current == '人脸核身'"></steps-two>
                <steps-three ref="stepsThree" v-show="current == '协议授权'" @threeIMG="threeImgData" @threeImgTwo="threeImgTwo"></steps-three>
                <steps-four ref="stepsFour" v-show="current == '行业话术'"></steps-four>
            </div>
            <div class="steps-action">
                <a-button v-if="index > 0"  @click="prev" size="large" class="submit btn-sub-right" ref="pre">
                    <strong>上一步</strong>
                </a-button>

                <a-button v-if="index < steps.length - 1" type="primary" @click="next" size="large" :class="[index > 0 ? 'submit btn-sub-left' : 'submit btn-sub-is']" ref="nex">
                    <strong>下一步</strong>
                </a-button>

                <a-button v-if="index == steps.length - 1" type="primary" @click="submits" size="large" class="submit btn-sub-left">
                    <strong>提交</strong>
                </a-button>
            </div>
        </a-col>
        <a-col :span="24" v-else>
            <PublicPage/>
        </a-col>
    </div>

</template>

<script>
    import Vue from "vue"
    import {pageData, shareLink, submit} from "../utils/http"
    import StepsOne from "../components/StepsOne";
    import StepsTwo from "../components/StepsTwo";
    import StepsThree from "../components/StepsThree";
    import StepsFour from "../components/StepsFour";
    import StepsFive from "../components/StepsFive";
    import PublicPage from "../components/PublicPage";
    export default {
        name: "Authentication",
        components: {
            PublicPage,
            StepsOne,
            StepsTwo,
            StepsThree,
            StepsFour,
            StepsFive
        },
        data() {
            return {
                index:0,
                current: "",
                steps: [],
                threeArray:'',
                threeArrayTwo:'',
                page:true,
                pageValue:''
            }
        },
        methods: {
            getPageData(){
               if(Vue.ls.get('teannId')){
                   let owner_id = Vue.ls.get('teannId');
                   let uuid = Vue.ls.get('uuid')
                   pageData({ownerId:owner_id, openId:uuid})
                       .then(res=>{
                           console.log(res);
                           if (res.code == 200){
                               this.pageValue = res.result
                               this.$refs.stepsOne.value(res.result)
                               this.$refs.stepsTwo.value(res.result)
                               this.$refs.stepsThree.value(res.result)
                               this.$refs.stepsFour.value(res.result)
                               this.$refs.stepsFive.value(res.result)
                               if (res.result.mobile){
                                   this.index++;
                                   this.current = this.steps[this.index]
                               }
                           }
                       })
                       .catch(err=>{
                           console.log(err);
                       })
               }else{
                   this.$message.error('此为用户分享链接打开的页面')
                   this.page = false
               }
            },
            fromData(){
                if(JSON.parse(Vue.ls.get('fromData'))){
                    console.log(Vue.ls.get('fromData'));
                    this.steps = JSON.parse(Vue.ls.get('fromData'))
                    console.log(this.steps);
                    this.current = this.steps[0]
                }else{
                    this.page = false
                }
            },
            next() {
                /**/
                console.log(this.current);
                if (this.current == '手机号码'){
                    if (this.pageValue.mobile){
                        this.index++;
                        this.current = this.steps[this.index]
                    }else {
                        this.$message.warning('手机验证通过方可执行下一步')
                    }
                }else if (this.current == '营业执照'){
                    if(this.pageValue.fileUrl){
                        this.index++;
                        this.current = this.steps[this.index]
                    }else {
                        this.$message.warning('验证通过方可执行下一步')
                    }
                }else if (this.current == '人脸核身'){
                    if(this.pageValue.frontImage){
                        this.index++;
                        this.current = this.steps[this.index]
                    }else {
                        this.$message.warning('验证通过方可执行下一步')
                    }
                }else if (this.current == '协议授权'){
                    if(this.pageValue.fileArray){
                        this.index++;
                        this.current = this.steps[this.index]
                    }else {
                        this.$message.warning('验证通过方可执行下一步')
                    }
                }else if (this.current == '行业话术'){
                    if(this.pageValue.sayTemplateList){
                        this.index++;
                        this.current = this.steps[this.index]
                    }else {
                        this.$message.warning('验证通过方可执行下一步')
                    }
                }
            },
            prev() {
                this.index--;
                this.current = this.steps[this.index]
            },
            goNext(data){
                console.log(data);
                if (data.code == 200){
                    this.index++;
                    this.current = this.steps[this.index]
                }
            },
            threeImgData(data){
                console.log("子传父：", data);
                this.threeArray = data
            },
            threeImgTwo(data){
                this.threeArrayTwo = data
            },
            submits() {
                /*
                * 其他文件、协议类提交审核
                */
                let list = new FormData
                console.log('submit前：' + JSON.stringify(this.threeArray))
                let formData = new FormData;
                formData.append('openId',Vue.ls.get('uuid'))
                formData.append('ownerId',Vue.ls.get('teannId'))
                console.log(Vue.ls.get('uuid'),Vue.ls.get('teannId'))
                if(this.threeArray.length == 0){
                    list.append('picArray',this.threeArrayTwo)
                    list.append('ownerId',Vue.ls.get('teannId'))
                    list.append('openId',Vue.ls.get('uuid'))
                    submit(list)
                        .then(res => {
                            console.log(res)
                            if (res.code === 200) {
                                this.$message.success(res.message)
                                shareLink(formData)
                                    .then(res=>{
                                        console.log(res);
                                        if (res.code == 200){
                                            this.$router.push({path:'/share/'+res.result})
                                        }
                                    })
                                    .catch(err=>{
                                        console.log(err);
                                    })
                            }else {
                                this.$message.error(res.message)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }else {
                    list.append('picArray',this.threeArray)
                    list.append('ownerId',Vue.ls.get('teannId'))
                    list.append('openId',Vue.ls.get('uuid'))
                    submit(list)
                        .then(res => {
                            console.log(res)
                            if (res.code === 200) {
                                this.$message.success(res.message)
                                shareLink(formData)
                                    .then(res=>{
                                        console.log(res);
                                        if (res.code == 200){
                                            this.$router.push({path:'/share/'+res.result})
                                        }
                                    })
                                    .catch(err=>{
                                        console.log(err);
                                    })
                            }else {
                                this.$message.warning(res.message)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            }
        },
        mounted(){
            let uuid = this.$route.query.uuid
            Vue.ls.set('uuid',uuid)
            this.fromData()
            this.getPageData()
        },
    }
</script>

<style scoped>
    /deep/ .ant-btn.submit{
        background-color: #07c160;
        color: white;
        border: 1px solid #07c160;
        width: 50%;
        height: 50px;
    }
    a{
        text-decoration: none;
    }
    /deep/ .ant-btn.btn-sub-right{
        border-right: 2px solid white
    }
    /deep/ .ant-btn.btn-sub-left{
        border-left: 2px solid white
    }
    /deep/ .ant-btn.btn-sub-is{
        margin-left: 50%;
        background-color: silver;
        border-color: silver;
    }
</style>
