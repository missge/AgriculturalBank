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
export const getSuccess=(data)=>({
    type:"getSuccess",
    value:data
})


export function getCreditResult(appId,params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("征信查询中..."));
        Net.getRequest(appId+"/rest/pub/credit/result",params  ,function (data) {
            alert(data);
            dispatch(loading(false));
            dispatch(getSuccess(true));
        },function () {
            alert("征信查询失败！");
            dispatch(loading(false));
            dispatch(getSuccess(true));
        })
    }
}
