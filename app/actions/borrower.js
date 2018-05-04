import Net from "../netRequest/mmspRequest"
import {Type} from "../global/contact"
export const loading=(data)=>({
    type:"loading",
    value:data
})
export const loadingText=(data)=>({
    type:"text",
    value:data
})
export const postSuccess=(data)=>({
    type:"postSuccess",
    value:data
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
