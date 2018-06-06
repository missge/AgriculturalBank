import Net from "../netRequest/mmspRequest"
import {Type} from "../global/contact"
import {loading, loadingText} from "./login";
import {Url} from "../global/url";

//征信查询是否成功
export const creditResult = (data) => ({
    type: "creditResult",
    value: data
})
//征信报告是否查询
export const isCreditQuery = (data) => ({
    type: "showQuery",
    value: data
})
//重置征信查询页面
export const clearCredit = (data) => ({
    type: "clearCredit",
    value: data
})
export const getBasicInfo = (data) => ({
    type: "getBasicInfo",
    value: data
})
export const getParsedInfo = (data) => ({
    type: "getParsedInfo",
    value: data
})
export const getSummaryInfo = (data) => ({
    type: "getSummaryInfo",
    value: data
})
export const getCreditTrans = (data) => ({
    type: "getCreditTrans",
    value: data
})
export const getPublicInfo = (data) => ({
    type: "getPublicInfo",
    value: data
})
export const getQueryLog = (data) => ({
    type: "getQueryLog",
    value: data
})

//征信查询
export function getCreditResult(params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("征信查询中..."));
        Net.getRequest("/rest/pub/credit/result", params, function (successData) {
            //    alert(successData);
            //     alert(JSON.parse(successData).data.personBasicInfo);
            //     alert(JSON.parse(successData).data.parsedInfo);
            //     alert(JSON.parse(successData).data.summaryInfo);
            //     alert(JSON.parse(successData).data.creditTransaction);
            //     alert(JSON.parse(successData).data.publicInfo);
            //     alert(JSON.parse(successData).data.queryLog);
            let personInfo = JSON.parse(successData).data.personBasicInfo;
            let parsedInfo = JSON.parse(successData).data.parsedInfo;
            let summaryInfo = JSON.parse(successData).data.summaryInfo;
            let creditTrans = JSON.parse(successData).data.creditTransaction;
            let publicInfo = JSON.parse(successData).data.publicInfo;
            let queryLog = JSON.parse(successData).data.queryLog;

            dispatch(getBasicInfo(personInfo));
            dispatch(getParsedInfo(parsedInfo));
            dispatch(getSummaryInfo(summaryInfo));
            dispatch(getCreditTrans(creditTrans));
            dispatch(getPublicInfo(publicInfo));
            dispatch(getQueryLog(queryLog));
            dispatch(creditResult(true));
            dispatch(isCreditQuery("block"));
            dispatch(loading(false));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("征信查询失败！");
            dispatch(loading(false));
        })
    }
}

//重置Credit为空
export function clearPropsCredit() {
    return function (dispatch) {
        dispatch(clearCredit(""));
    }
}

//上传征信授权书
export function uploadCreditPage(reqId, clientId, url, success, fail) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("上传征信授权书..."));
        Net.postRequest(url, "{\"req_id\":\"" + reqId + "\",\"client_id\":\"" + clientId + "\",\"ba_doc_name\":\"征信授权书\",\"ba_doc_summary\":\"摘要\" ,\"url\":\"" + url + "\"}", Type.formType, success, fail)
    }
}
