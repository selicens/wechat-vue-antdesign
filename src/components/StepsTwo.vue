<template>
    <div>
        <a-row class="cardBox">
            <a-col :span="24" class="title">
                <h1>人脸核身</h1>
                <span>点击前往人脸核身认证页面，请准备好身份证原件</span>
            </a-col>
            <a-col :span="24" v-if="page !== null" v-on:click="goToID">
                <a-row type="flex" align="bottom">
                    <a-col :span="24" class="images">
                        <img :src="page.frontImage" alt="">
                    </a-col>
                    <a-col :span="22" class="texts">
                        <p>身份证号：{{page.idCard}}</p>
                        <p>证件姓名：{{page.name}}</p>
                        <p>是否法人：{{page.isCorp == 1 ? '是' : '否'}}</p>
                    </a-col>
                    <a-col :span="2">
                        <button class="checkButton"><a-icon type="check"/></button>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="24" v-else v-on:click="goToID">
                <a-col :span="24" class="images">
                    <img src="../assets/sfz.png" alt="">
                </a-col>
                <a-col :span="24" class="texts">
                    <p>身份证</p>
                    <p>身份证件信息认证</p>
                </a-col>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import Vue from "vue"
    export default {
        name: "StepsTwo",
        data(){
            return{
                page:{
                    frontImage:'',
                    idCard:'',
                    isCorp:'',
                    name:''
                }
            }
        },
        methods:{
            value(result) {
                this.page = result
            },
            goToID(){
                console.log("DO");
                window.location.href = this.hrefUrl2+'?ownerId='+Vue.ls.get('teannId')+'&openId='+Vue.ls.get('uuid')
            }
        }
    }
</script>

<style scoped>
    /deep/ .ant-row.cardBox{
        height: 80vh;
    }
</style>