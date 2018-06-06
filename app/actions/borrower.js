import Net from "../netRequest/mmspRequest"
import {Type} from "../global/contact"
import {Url} from "../global/url";
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

export function postLoanerInfo(params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("正在上传借款人信息..."));
        Net.postRequest(Url.client , params ,Type.jsonType ,function (data) {
            dispatch(loading(false));
            dispatch(postSuccess(true));
        },function () {
            dispatch(loading(false));
            dispatch(postSuccess(true));
        })
    }
}

export function getLoadnerInfo(params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("获取联系人信息..."));
        Net.getRequest(Url.client , params , function (data) {
            dispatch(loading(false));
            dispatch(setLoanerInfo(JSON.parse(data).data));
            dispatch(setLoanerInfoState(true));
        },function () {
            dispatch(loading(false));
            dispatch(setLoanerInfoState(false));
        })
    }
}

export function deteleInfo(params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("删除联系人..."));
        Net.postRequest(Url.client , params ,Type.jsonType,
            function (data) {
                dispatch(loading(false));
            },function () {
                dispatch(loading(false));
            })
    }
}
