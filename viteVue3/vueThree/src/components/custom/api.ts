export const baseUrl = {
    fromData:'/fromConfig', //获取表单信息
    weChatLogin:'http://cm.voiper.cn/boot/faceid/render/wechat_mp', //微信登录
    pageData:'/data/{ownerId}/{openId}', //获取数据
    uploadBasicBiz:'/uploadBasicBiz/{ownerId}/{openId}', //上传营业执照
    jumpFaceNucleus:'http://cm.voiper.cn/boot/faceid/toDetect', //跳转人脸核身页面
    templateFile:'/myUserInfo/{ownerId}', //模板信息
    uploadFile:'/uploadFile/{ownerId}/{openId}', //上传图片
    dictionaries:'/dictItems?dictCode=say_template_key', //获取字典
    uploadSayTemplateFile:'/uploadSayTemplateFile/{ownerId}/{openId}', //上传话术模板
    removeTemplate:'/removeSayTemplateFile/{ownerId}/{openId}', //删除话术模板
    submit:'/submit/{ownerId}/{openId}', //提交审核
    shareLink:'/boot/faceid/shareLink', //获取分享链接
    shareData:'/boot/faceid/shareData', //分享数据
}
