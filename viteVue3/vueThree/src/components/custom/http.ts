import service from './request'
export const formData = (params: object) => {
    return service({
        url: '/fromConfig',
        method: 'get',
        params
    })
}
export const pageData = (params: object) => {
    return service({
        url: '/data',
        method: 'get',
        params
    })
}
export function templateFile(params: object) { /*获取协议、授权类文件*/
    return service({
        url:'/myUserInfo',
        method:'get',
        params
    })
}


export function dictionaries(params: object) { /*获取行业分类下拉选项*/
    return service({
        url:'/dictItems?dictCode=say_template_key',
        method:'get',
        params
    })
}

export function uploadFile(data: object) { /*上传协议、授权类文件*/
    return service({
        url:'/uploadFile',
        method:'post',
        data
    })
}
export function uploadBasicBiz(data: object) { /*上传营业执照*/
    return service({
        url:'/uploadBasicBiz',
        method:'post',
        data
    })
}
export function uploadSayTemplateFile(data: object) { /*上传话术文件*/
    return service({
        url:'/uploadSayTemplateFile',
        method:'post',
        data
    })
}
export function removeTemplate(data: object) { /*删除话术文件*/
    return service({
        url:'/removeSayTemplateFile',
        method:'post',
        data
    })
}

export function submit(data: object) { /*提交审核*/
    return service({
        url:'/submit',
        method:'post',
        data
    })
}

export function getCode(data: object) { /*获取手机验证码*/
    return service({
        url:'/sms',
        method:'post',
        data
    })
}
/*
* 上传手机验证码
*/
export function uploadCode(data: object) {
    return service({
        url:'/checkSMSCode',
        method:'post',
        data
    })
}
export function shareLink(data: object) {
    return service({
        url:'/shareLink',
        method:'post',
        data
    })
}

export function shareData(params: object) {
    return service({
        url:'/shareData',
        method:'get',
        params
    })
}
