<template>
    <div class="border" style="height: 100%;">
        <a-steps :current="current" style="display: none" size="small">
            <a-step/>
            <a-step/>
            <a-step/>
            <a-step/>
            <a-step/>
        </a-steps>
        <div class="steps-content">
            <steps-five ref="stepsFive" v-show="current === 0" @success="goNext"></steps-five>
            <steps-one ref="stepsOne" v-show="current === 1"></steps-one>
            <steps-two ref="stepsTwo" v-show="current === 2"></steps-two>
            <steps-three ref="stepsThree" v-show="current === 3" @threeIMG="threeImgData" @threeImgTwo="threeImgTwo"></steps-three>
            <steps-four ref="stepsFour" v-show="current === 4"></steps-four>
        </div>
        <div class="steps-action">
            <a-button v-if="current > 0"  @click="prev" size="large">
                <strong>上一页</strong>
            </a-button>

            <a-button v-if="current < steps.length - 1" style="margin-left: 8px" type="primary" @click="next" size="large">
                <strong>下一页</strong>
            </a-button>


            <a-button v-if="current == steps.length - 1" style="margin-left: 8px" type="primary" @click="submits" size="large" class="submit">
                <strong>提交</strong>
            </a-button>
        </div>
    </div>

</template>

<script>
    import {pageData,submit} from "../utils/http"
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
                current: 0,
                steps: [
                    {title: '1'},
                    {title: '2'},
                    {title: '3'},
                    {title: '4'},
                    {title: '5'}
                ],
                owner_id:'',
                uuid:'',
                threeArray:'',
                threeArrayTwo:''
            }
        },
        methods: {
            getPageData(){
               let owner_id = this.$route.query.owner_id ;
               let uuid = this.$route.query.uuid
               pageData({
                   ownerId:owner_id,
                   openId:uuid
               })
                .then(res=>{
                    console.log(res);
                    this.$refs.stepsOne.value(res.result,this.uuid,this.owner_id)
                    this.$refs.stepsTwo.value(res.result,this.uuid,this.owner_id)
                    this.$refs.stepsThree.value(res.result,this.uuid,this.owner_id)
                    this.$refs.stepsFour.value(res.result,this.uuid,this.owner_id)
                    this.$refs.stepsFive.value(res.result,this.uuid,this.owner_id)
                })
                .catch(err=>{
                    console.log(err);
                })
            },
            next() {
                this.current++;
            },
            prev() {
                this.current--;
            },
            goNext(data){
                console.log(data);
                if (data.message == '验证通过'){
                    this.current++
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
                console.log('submit前：' + JSON.stringify(this.threeArray))
                if(this.threeArray.length == 0){
                    let list = new FormData
                    list.append('picArray',this.threeArrayTwo)
                    list.append('ownerId',this.owner_id)
                    list.append('openId',this.uuid)
                    submit(list)
                        .then(res => {
                            console.log(res)
                            if (res.data.code === 200) {
                                this.$router.go(0)
                                this.$message.success(res.data.message)
                            }else {
                                this.$message.error(res.data.message)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }else {
                    let list = new FormData
                    list.append('picArray',this.threeArray)
                    list.append('ownerId',this.owner_id)
                    list.append('openId',this.uuid)
                    submit(this.uuid,this.owner_id,list)
                        .then(res => {
                            console.log(res)
                            if (res.data.code === 200) {
                                this.$router.go(0)
                                this.$message.success(res.data.message)
                            }else {
                                this.$message.error(res.data.message)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            },
        },
        mounted(){
            this.getPageData()
            this.uuid = this.$route.query.uuid
            this.owner_id = this.$route.query.owner_id
        },
    }
</script>

<style scoped>
    /deep/ .ant-btn.submit{
        background-color: #07c160;
        color: white;
        border: 1px solid #07c160;
    }
</style>