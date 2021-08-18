<template>
    <div>
        <a-row class="cardBox">
            <a-col :span="24" v-if="page !== null" v-on:click="goToID">
                <a-row type="flex" align="bottom">
                    <a-col :span="24" class="images">
                        <img :src="page.frontImage" alt="">
                    </a-col>
                    <a-col :span="22" class="texts">
                        <p>身份证号：{{page.idCard}}</p>
                        <p>证件姓名：{{page.name}}</p>
                        <p>是否法人：{{page.isCorp}}</p>
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
    export default {
        name: "StepsTwo",
        data(){
            return{
                page:{
                    frontImage:'',
                    idCard:'',
                    isCorp:'',
                    name:''
                },
                uuid:'',
                ownerId:''
            }
        },
        methods:{
            value(result,uuid,ownerId) {
                this.page = result
                this.uuid = uuid
                this.ownerId = ownerId
                console.log('two:',uuid,ownerId);
            },
            goToID(){
                console.log("DO");
                window.location.href = this.hrefUrl2+this.ownerId+'/'+this.uuid
            }
        }
    }
</script>

<style scoped>
    /deep/ .ant-row.cardBox{
        height: 450px;
    }
</style>