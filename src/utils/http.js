import instance from "./request";
//import {baseUrl} from "./api"
/*let ownerId = window.location.hash.split('?')[1].split('=')[1].split('&')[0];
let uuid = window.location.hash.split('=')[2]
let rightUrl = ownerId+'/'+uuid*/

export function pageData(params) { /*获取页面数据*/
    return instance({
        url:'/data',
        method:'get',
        params
    })
}


export function templateFile(params) { /*获取协议、授权类文件*/
    return instance({
        url:'/myUserInfo',
        method:'get',
        params
    })
}


export function dictionaries(params) { /*获取行业分类下拉选项*/
    return instance({
        url:'/dictItems?dictCode=say_template_key',
        method:'get',
        params
    })
}

export function uploadFile(data) { /*上传协议、授权类文件*/
    return instance({
        url:'/uploadFile',
        method:'post',
        data
    })
}
export function uploadBasicBiz(data) { /*上传营业执照*/
    return instance({
        url:'/uploadBasicBiz',
        method:'post',
        data
    })
}
export function uploadSayTemplateFile(data) { /*上传话术文件*/
    return instance({
        url:'/uploadSayTemplateFile',
        method:'post',
        data
    })
}
export function removeTemplate(data) { /*删除话术文件*/
    return instance({
        url:'/removeSayTemplateFile',
        method:'post',
        data
    })
}

export function submit(data) { /*提交审核*/
    return instance({
        url:'/submit',
        method:'post',
        data
    })
}

export function getCode(data) { /*获取手机验证码*/
    return instance({
        url:'/sms',
        method:'post',
        data
    })
}

export function uploadCode(data) {
    return instance({
        url:'/checkSMSCode',
        method:'post',
        data
    })
}