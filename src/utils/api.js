const baseUrl ={
    weChatLogin:'http://cm.voiper.cn/boot/faceid/render/wechat_mp', //微信登录
    dictionaries:'/dictItems?dictCode=say_template_key', //获取字典
    templateFile:'/myUserInfo/{ownerId}', //模板信息
    pageData:'/data/{ownerId}/{openId}', //获取数据
    faceNucleus:'http://cm.voiper.cn/boot/faceid/toDetect/', //跳转人脸核身页面
    removeTemplate:'/removeSayTemplateFile/{ownerId}/{openId}', //删除话术模板
    submit:'/submit/{ownerId}/{openId}', //提交审核
    uploadBasicBiz:'/uploadBasicBiz/{ownerId}/{openId}', //上传营业执照
    uploadFile:'/uploadFile/{ownerId}/{openId}', //上传图片
    uploadSayTemplateFile:'/uploadSayTemplateFile/{ownerId}/{openId}', //上传话术模板
}
export default baseUrl