import Net from "../netRequest/mmspRequest"
import {Type} from "../global/contact"
export const loadingCredit=(data)=>({
    type:"loadingCredit",
    value:data
})
export const loadingCreditText=(data)=>({
    type:"loadingCreditText",
    value:data
})
export const getCreditQuery=(data)=>({
    type:"getCreditQuery",
    value:data
})


export function getCreditResult(appId,params) {
    return function (dispatch) {
        dispatch(loadingCredit(true));
        dispatch(loadingCreditText("征信查询中..."));
        Net.getRequest(appId+"/rest/pub/credit/result",params  ,function (data) {
            alert(data);
            dispatch(loadingCredit(false));
            dispatch(getCreditQuery(data));
        },function () {
            alert("征信查询失败！");
            dispatch(loadingCredit(false));
        })
    }
}
