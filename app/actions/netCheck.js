import Net from "../netRequest/mmspRequest";
import {Type} from "../global/contact"
// 加载弹框是否显示逻辑
export const loading=(data)=> ({
    type:"Loading",
    value:data,
})
// 弹框提示语的内容
export const loadingText=(data)=> ({
    type:"content",
    value:data,
})

//登录的actions
export const loginLoadSuccess=(data)=> ({
    type:"LoadSuccess",
    value:data
})

export const loginLoadFail=(data)=> ({
    type:"LoadFail",
    value:data
})

// 拉取机构列表的actions
export const getInstSuccess=(data)=> ({
    type:"Success",
    value:data
})

export const getInstFail=(data)=> ({
    type:"Fail",
    value:data
})
// 显示机构列表的标识
export const showList = (data)=>({
    type:"showList",
    value:data
})


// 机构列表的详情数据
export function login(appId) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("登录中..."));
        // 根据appId登录
        // eslint-disable-next-line
        Net.postRequest(appId+"/rest/admin/system/user/signin" ,"username=412801198304100815&userpass=11111111",
            Type.formType,function (data) {
                // dispatch(loading(false));
                // dispatch(loginLoadSuccess(data));
                dispatch(getInst(appId));
            },function () {
                dispatch(loading(false));
                dispatch(loginLoadFail("error"));
            })
    }
}

export function getInst(appId) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("获取机构列表..."));
        // 根据appId登录
        // eslint-disable-next-line
        Net.getRequest(appId+"/rest/admin/system/user/instlist" ,"" ,function (data) {
            dispatch(loading(false));
            dispatch(showList(true));
            dispatch(getInstSuccess(data));
        },function () {
            dispatch(loading(false));
            dispatch(getInstFail("error"));
        })
    }
}
export function chooseInst(appId , instCode) {
    return function (dispatch) {
        Net.postRequest(appId+"/rest/admin/system/user/index" ,"instcode" +instCode ,Type.formType,
            function (data) {
                
            },function () {
                
            })
    }
}