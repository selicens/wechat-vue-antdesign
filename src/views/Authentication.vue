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
                <a-button v-if="index > 0"  @click="prev" size="large" class="submit" style="border-right: 2px solid white">
                    <strong>上一步</strong>
                </a-button>

                <a-button v-if="index < steps.length - 1" style="border-left: 2px solid white" type="primary" @click="next" size="large" class="submit">
                    <strong>下一步</strong>
                </a-button>

                <a-button v-if="index == steps.length - 1" style="border-left: 2px solid white" type="primary" @click="submits" size="large" class="submit">
                    <strong>提交</strong>
                </a-button>
            </div>
        </a-col>
        <a-col :span="24" v-else>
            <a-result status="403" title="403" sub-title="抱歉，你没有访问此页面的权限">
                <template #extra>
                    <a-button type="primary" class="submit" v-on:click="closePage">
                        <strong>关闭页面</strong>
                    </a-button>
                </template>
            </a-result>
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
    export default {
        name: "Authentication",
        components: {
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
                page:true
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
                               this.$refs.stepsOne.value(res.result)
                               this.$refs.stepsTwo.value(res.result)
                               this.$refs.stepsThree.value(res.result)
                               this.$refs.stepsFour.value(res.result)
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
                this.index++;
                this.current = this.steps[this.index]
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
            },
            closePage(){
                window.location.href="about:blank";
                window.close();
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
</style>