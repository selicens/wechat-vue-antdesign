<template>
    <div>
        <a-row class="cardBox">
            <a-col :span="24" class="title">
                <h1>营业执照</h1>
                <span>点击前往营业执照认证页面，请准备营业执照原件或副本</span>
            </a-col>
            <a-col :span="24" v-if="page !== null" v-on:click="goToBusinesslicense">
                <a-row type="flex" align="bottom">
                    <a-col :span="24" class="images">
                        <img :src="page.fileUrl" alt="">
                    </a-col>
                    <a-col :span="22" class="texts">
                        <p>信用代码：{{page.regno}}</p>
                        <p>公司名称：{{page.entname}}</p>
                        <p>公司法人：{{page.frname}}</p>
                        <p>成立日期：{{page.opfrom}}</p>
                    </a-col>
                    <a-col :span="2">
                        <a-icon type="check-circle"/>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="24" v-else v-on:click="goToBusinesslicense">
                <a-col :span="24" class="images">
                    <img src="../assets/yyzz.png" alt="">
                </a-col>
                <a-col :span="24" class="texts">
                    <p>营业执照</p>
                    <p>营业执照信息认证</p>
                </a-col>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import Vue from "vue"
    export default {
        name: "StepsOne",
        data(){
            return{
                page:{
                    fileUrl:'',
                    regno:'',
                    entname:'',
                    frname:'',
                    opfrom:''
                }
            }
        },
        methods:{
            value(result) {
                this.page = result
            },
            goToBusinesslicense(){
                this.$router.push({name:'Businesslicense',params: {owner_id:Vue.ls.get('teannId'),uuid:Vue.ls.get('uuid')}})
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
    /deep/ .anticon{
        color: #07c160;
        font-size: 24px;
    }
</style>
