<template>
    <a-card class="pageContent">
        <a-row type="flex">
            <a-col :span="24">
                <h1>人脸核身</h1>
                <h5>点击前往人脸核身认证页面，请准备好身份证原件</h5>
            </a-col>
            <a-row :span="24" @click="jumpFace" v-if="fnStatus" type="flex">
                <a-col :span="24" class="imgContent">
                    <img :src="pageData.frontImage" alt="">
                </a-col>
                <a-col :span="24">
                    <h5>证件号码：{{pageData.idCard}}</h5>
                    <h5>证件姓名：{{pageData.name}}</h5>
                </a-col>
                <a-col :span="22">
                    <h5>是否法人：{{pageData.isCorp == 1 ? '是' : '否'}}</h5>
                </a-col>
                <a-col :span="2">
                    <CheckCircleOutlined :style="{fontSize: '13px', color: '#07c160'}"/>
                </a-col>
            </a-row>
            <a-col :span="24" @click="jumpFace" v-else>
                <a-col :span="24" class="imgContent">
                    <img src="../image/sfz.png" alt="">
                </a-col>
                <a-col :span="24">
                    <a-col :span="24" class="texts">
                        <h5><strong>人脸核身信息认证</strong></h5>
                        <h5>点击前往人脸核身</h5>
                    </a-col>
                </a-col>
            </a-col>
        </a-row>
    </a-card>
</template>

<script lang="ts">
    import { ref, reactive, defineComponent } from 'vue'
    import { CheckCircleOutlined } from '@ant-design/icons-vue'
    import { baseUrl } from '../custom/api'
    export default defineComponent({
        name: "FaceNucleus",
        components: { CheckCircleOutlined },
        setup(){
            let pageData = reactive({
                frontImage: '',
                idCard: '',
                name: '',
                isCorp: ''
            }),
                fnStatus = ref(false)
           function getData(data: any) {
               if (data) fnStatus.value =true;
               else fnStatus.value = false;
               pageData.frontImage = data.frontImage
               pageData.idCard = data.idCard
               pageData.name = data.name
               pageData.isCorp = data.isCorp
           }
            let ownerId: any = localStorage.getItem('teannId'),
                openId: any = localStorage.getItem('uuid')
           function jumpFace() {
                window.location.href = baseUrl.jumpFaceNucleus+`?ownerId=${ownerId}&openId=${openId}`
           }
           return { getData, pageData, jumpFace, fnStatus }
        }
    })
</script>

<style scoped>

</style>
