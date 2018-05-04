import Net from "../netRequest/mmspRequest"
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

export function postLoanInfo(appId ,loanParams,assetParams) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("正在上传贷款信息..."));
        Net.postRequest(appId + "/rest/hl/process/loan" , loanParams ,"application/json; charset=UTF-8" ,function (data) {
            alert("Asset");
            dispatch(postAssetInfo(appId,assetParams));
            alert(data);
            dispatch(postSuccess(true));

        },function () {

            dispatch(postSuccess(false));

        })
    }
}

export function postAssetInfo(appId,assetParams) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("正在上传押品信息..."));
        Net.postRequest(appId + "/rest/hl/process/asset" ,assetParams,"application/json; charset=UTF-8" ,function (data) {
            alert(data);
            dispatch(postSuccess(true));
        },function () {
            dispatch(postSuccess(false));
        })
    }
}