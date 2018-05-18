import Net from "../netRequest/mmspRequest"
import {getSuccess} from "./credit";
import {handlePartyFormData} from "./party";

export const loadingLoan = (data) => ({
    type: "loadingLoan",
    value: data
})
export const loadingLoanText = (data) => ({
    type: "loadingLoanText",
    value: data
})
export const postLoan = (data) => ({
    type: "postLoan",
    value: data
})

export const setLoanInfo = (data) => ({
    type: "loanData",
    value: data
})
export const setRateInfo = (data) => ({
    type: "rateData",
    value: data
})
export const setHouseInfo = (data) => ({
    type: "houseData",
    value: data
})
export const setAssetInfo = (data) => ({
    type: "assetData",
    value: data
})
export const setGuarInfo = (data) => ({
    type: "guarData",
    value: data
})


/*export function postLoanInfo(appId ,loanParams,houseParams) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("正在上传贷款信息..."));
        Net.postRequest(appId + "/rest/hl/process/loan" , loanParams ,"application/json; charset=UTF-8" ,function (data) {
            alert("Asset");
            dispatch(postHouseInfo(appId,houseParams));
            alert(data);
            dispatch(loading(false));
            dispatch(postSuccess(true));

        },function () {
            alert("error");
            dispatch(loading(false));
            dispatch(postSuccess(false));

        })
    }
}*/
export function postLoanInfo(appId, loanParams) {
    return function (dispatch) {
        dispatch(loadingLoan(true));
        dispatch(loadingLoanText("正在生成电子申请表..."));
        Net.postRequest(appId + "/rest/hl/process/loan", loanParams, "application/json; charset=UTF-8", function (data) {
            alert(data);
            dispatch(loadingLoan(false));
            dispatch(postLoan(true));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("贷款信息保存失败！");
            dispatch(loadingLoan(false));
            dispatch(postLoan(true));

        })
    }
}

export function postHouseInfo(appId, houseParams) {
    return function (dispatch) {
        Net.postRequest(appId + "/rest/hl/process/house", houseParams, "application/json; charset=UTF-8", function (data) {
            alert(data);
            dispatch(postLoan(true));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("房屋信息保存失败！");
            dispatch(postLoan(true));
        })
    }
}

export function postRateInfo(appId, rateParams) {
    return function (dispatch) {
        Net.postRequest(appId + "/rest/hl/process/acct", rateParams, "application/json; charset=UTF-8", function (data) {
            alert(data);
            dispatch(postLoan(true));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("利率信息保存失败！");
            dispatch(postLoan(true));
        })
    }
}

export function postAssetInfo(appId, assetParams) {
    return function (dispatch) {
        Net.postRequest(appId + "/rest/hl/process/asset", assetParams, "application/json; charset=UTF-8", function (data) {
            alert(data);
            dispatch(postLoan(true));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("押品信息保存失败！");
            dispatch(postLoan(true));
        })
    }
}

export function postGuarInfo(appId, guarParams) {
    return function (dispatch) {
        Net.postRequest(appId + "/rest/hl/process/guar", guarParams, "application/json; charset=UTF-8", function (data) {
            alert(data);
            dispatch(postLoan(true));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("担保信息保存失败！");
            dispatch(postLoan(true));
        })
    }
}

export function getLoanInfo(appId, params) {
    return function (dispatch) {
        dispatch(loadingLoan(true));
        dispatch(loadingLoanText("查询贷款信息..."));
        Net.getRequest(appId + "/rest/hl/process/loan", params, function (successData) {
            alert(successData);
            let jsonData = JSON.parse(successData).data;
            dispatch(setLoanInfo(jsonData));
            dispatch(loadingLoan(false));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("贷款信息查询失败！");
            dispatch(loadingLoan(false));
        })
    }
}

export function getRateInfo(appId, params) {
    return function (dispatch) {
        dispatch(loadingLoan(true));
        dispatch(loadingLoanText("查询利率信息..."));
        Net.getRequest(appId + "/rest/hl/process/acct", params, function (successData) {
            alert(successData);
            let jsonData = JSON.parse(successData).data;
            dispatch(setRateInfo(jsonData));
            dispatch(loadingLoan(false));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("利率信息查询失败！");
            dispatch(loadingLoan(false));
        })
    }
}

export function getHouseInfo(appId, params) {
    return function (dispatch) {
        dispatch(loadingLoan(true));
        dispatch(loadingLoanText("查询用途信息..."));
        Net.getRequest(appId + "/rest/hl/process/house", params, function (successData) {
            alert(successData);
            let jsonData = JSON.parse(successData).data
            dispatch(setHouseInfo(jsonData))
            dispatch(loadingLoan(false));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("用途信息查询失败！");
            dispatch(loadingLoan(false));
        })
    }
}

export function getAssetInfo(appId, assetlistparams, assetIdparams) {
    return function (dispatch) {
        dispatch(loadingLoan(true));
        dispatch(loadingLoanText("查询押品信息..."));
        //押品列表查询  传作业Id
        Net.getRequest(appId + "/rest/hl/process/assetlist", assetlistparams, function (successData) {
            alert("列表" + successData);
            if (JSON.parse(successData).data.length != 0) {
                let jsonData = JSON.parse(successData).data;
                dispatch(setAssetInfo(jsonData));
                dispatch(loadingLoan(false));
            } else {
                alert("进入单笔查询");
                //押品单笔查询  传押品Id
                Net.getRequest(appId + "/rest/hl/process/asset", assetIdparams, function (successData) {
                    alert("单笔" + successData);
                    let jsonData = JSON.parse(successData).data;
                    dispatch(setAssetInfo(jsonData));
                    dispatch(loadingLoan(false));
                }, function () {
                    // eslint-disable-next-line
                    mmspc.dialog.toast("押品信息查询失败！");
                    dispatch(loadingLoan(false));
                })
            }
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("押品信息查询失败！");
            dispatch(loadingLoan(false));
        })
    }
}

export function getGuarInfo(appId, guarListparams, guarIdparams) {
    return function (dispatch) {
        dispatch(loadingLoan(true));
        dispatch(loadingLoanText("查询担保信息..."));
        //押品列表查询  传作业Id
        Net.getRequest(appId + "/rest/hl/process/guarlist", guarListparams, function (successData) {
            alert(successData);
            let jsonData = JSON.parse(successData).data;
            dispatch(setGuarInfo(jsonData));
            dispatch(loadingLoan(false));

        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("担保信息查询失败！");
            dispatch(loadingLoan(false));
        })
    }
}