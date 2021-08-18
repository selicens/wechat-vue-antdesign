<template>
    <div>
        <a-row class="cardBox">
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
                        <button class="checkButton"><a-icon type="check"/></button>
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
                console.log('one:',uuid,ownerId);
            },
            goToBusinesslicense(){
                console.log('go:',this.ownerId,this.uuid)
                this.$router.push({path:'/businesslicense',query: {owner_id:this.ownerId,uuid:this.uuid}})
            }
        }
    }
</script>

<style scoped>
    /deep/ .ant-row.cardBox{
        height: 450px;
    }
</style>