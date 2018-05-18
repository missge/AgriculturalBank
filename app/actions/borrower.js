import Net from "../netRequest/mmspRequest"
import {Type} from "../global/contact"
export const loading=(data)=>({
    type:"Loading",
    value:data
})
export const loadingText=(data)=>({
    type:"content",
    value:data,
})
export const postSuccess=(data)=>({
    type:"postSuccess",
    value:data
})
export const setLoanerInfo=(data)=>({
    type:"loanerInfo",
    value:data
})
export const setLoanerInfoState=(data)=>({
    type:"state",
    value:data
})
export const setLoaner=(data1,data2)=>({
    type:"loaner",
    key:data1,
    value:data2
})
export function postLoanerInfo(appId , params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("正在上传借款人信息..."));
        Net.postRequest(appId+"/rest/hl/process/client" , params ,Type.jsonType ,function (data) {
            dispatch(loading(false));
            dispatch(postSuccess(true));
        },function () {
            dispatch(loading(false));
            dispatch(postSuccess(true));
        })
    }
}

export function getLoadnerInfo(appId , params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("获取联系人信息..."));
        Net.getRequest(appId+"/rest/hl/process/client" , params , function (data) {
            dispatch(loading(false));
            dispatch(setLoanerInfo(data));
            dispatch(setLoanerInfoState(true));
        },function () {
            dispatch(loading(false));
            dispatch(setLoanerInfoState(false));
        })
    }
}
