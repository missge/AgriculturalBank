import Net from "../netRequest/mmspRequest"
import {loading,loadingText} from "./login";
import {appId} from "../global/net";
import {Url} from "../global/url";

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
export const downloadForm = (data) => ({
    type: "formUrl",
    value: data
})
export const clearLoan = (data) => ({
    type: "clearLoan",
    value: data
})

export function postLoanInfo(loanParams) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("保存贷款信息..."));
        Net.postRequest(Url.loan, loanParams, "application/json; charset=UTF-8", function (data) {
        //    alert("postLoanInfo:"+data);
            dispatch(postLoan(true));
            dispatch(loading(false));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("贷款信息保存失败！");
            dispatch(postLoan(true));
            dispatch(loading(false));

        })
    }
}

export function postHouseInfo(houseParams) {
    return function (dispatch) {
        Net.postRequest(Url.house, houseParams, "application/json; charset=UTF-8", function (data) {
        //    alert("postHouseInfo:"+data);
            dispatch(postLoan(true));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("房屋信息保存失败！");
            dispatch(postLoan(true));
        })
    }
}

export function postRateInfo(rateParams) {
    return function (dispatch) {
        Net.postRequest(Url.rate, rateParams, "application/json; charset=UTF-8", function (data) {
        //    alert("postRateInfo:"+data);
            dispatch(postLoan(true));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("利率信息保存失败！");
            dispatch(postLoan(true));
        })
    }
}

export function postAssetInfo(assetParams) {
    return function (dispatch) {
        Net.postRequest(Url.asset, assetParams, "application/json; charset=UTF-8", function (data) {
        //    alert("postAssetInfo:"+data);
            dispatch(postLoan(true));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("押品信息保存失败！");
            dispatch(postLoan(true));
        })
    }
}

export function postGuarInfo(guarParams) {
    return function (dispatch) {
        Net.postRequest(Url.guar, guarParams, "application/json; charset=UTF-8", function (data) {
        //    alert("postGuarInfo:"+data);
            dispatch(postLoan(true));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("担保信息保存失败！");
            dispatch(postLoan(true));
        })
    }
}

export function getLoanInfo(params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("查询贷款信息..."));
        Net.getRequest(Url.loan, params, function (successData) {
         //   alert(successData);
            let jsonData = JSON.parse(successData).data;
            dispatch(setLoanInfo(jsonData));
            dispatch(loading(false));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("贷款信息查询失败！");
            dispatch(loading(false));
        })
    }
}

export function getRateInfo(params) {
    return function (dispatch) {
    //    dispatch(loading(true));
    //    dispatch(loadingText("查询利率信息..."));
        Net.getRequest(Url.rate, params, function (successData) {
          //  alert(successData);
            let jsonData = JSON.parse(successData).data;
            dispatch(setRateInfo(jsonData));
    //        dispatch(loading(false));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("利率信息查询失败！");
    //        dispatch(loading(false));
        })
    }
}

export function getHouseInfo(params) {
    return function (dispatch) {
    //    dispatch(loading(true));
    //    dispatch(loadingText("查询用途信息..."));
        Net.getRequest(Url.house, params, function (successData) {
         //   alert(successData);
            let jsonData = JSON.parse(successData).data
            dispatch(setHouseInfo(jsonData))
    //        dispatch(loading(false));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("用途信息查询失败！");
    //        dispatch(loading(false));
        })
    }
}

/*export function getAssetInfo(appId, assetlistparams, assetIdparams) {
    return function (dispatch) {
    //    dispatch(loading(true));
    //    dispatch(loadingText("查询押品信息..."));
        //押品列表查询  传作业Id
        Net.getRequest(appId + "/rest/hl/process/assetlist", assetlistparams, function (successData) {
         //   alert("列表" + successData);
            if (JSON.parse(successData).data.length != 0) {
                let jsonData = JSON.parse(successData).data;
                dispatch(setAssetInfo(jsonData));
    //            dispatch(loading(false));
            } else {
            //    alert("进入单笔查询");
                //押品单笔查询  传押品Id
                Net.getRequest(appId + "/rest/hl/process/asset", assetIdparams, function (successData) {
              //      alert("单笔" + successData);
                    let jsonData = JSON.parse(successData).data;
                    dispatch(setAssetInfo(jsonData));
    //                dispatch(loading(false));
                }, function () {
                    // eslint-disable-next-line
                    mmspc.dialog.toast("押品信息查询失败！");
    //                dispatch(loading(false));
                })
            }
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("押品信息查询失败！");
    //        dispatch(loading(false));
        })
    }
}*/
export function getAssetInfo(assetlistparams, assetIdparams) {
    return function (dispatch) {
        //    dispatch(loading(true));
        //    dispatch(loadingText("查询押品信息..."));
        //押品列表查询  传作业Id
        Net.getRequest(Url.assetList, assetlistparams, function (successData) {
        //       alert("列表" + successData);
            if (JSON.parse(successData).data.length != 0) {
                let jsonData = JSON.parse(successData).data;
                dispatch(setAssetInfo(jsonData));
                //            dispatch(loading(false));
            } else {
                //单笔查询
                dispatch(getOneAsset(assetIdparams));
            }
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("押品信息查询失败！");
            //        dispatch(loading(false));
        })
    }
}
export function getOneAsset(assetIdparams) {
    return function (dispatch) {
    //    alert("进入单笔查询");
        //押品单笔查询  传押品Id
        Net.getRequest(Url.asset, assetIdparams, function (successData) {
    //        alert("单笔" + successData);
            let jsonData = JSON.parse(successData).data;
            dispatch(setAssetInfo(jsonData));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("押品信息查询失败！");
        })
    }
}

export function getGuarInfo(guarListparams) {
    return function (dispatch) {
    //    dispatch(loading(true));
    //    dispatch(loadingText("查询担保信息..."));
        //押品列表查询  传作业Id
        Net.getRequest(Url.guarList, guarListparams, function (successData) {
       //     alert(successData);
            let jsonData = JSON.parse(successData).data;
            dispatch(setGuarInfo(jsonData));
    //        dispatch(loading(false));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("担保信息查询失败！");
    //        dispatch(loading(false));
        })
    }
}
//下载申请表
export function downloadAppForm(params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("正在下载申请表..."));
        //下载申请表  传作业Id
        Net.getRequest("forward/"+appId + Url.aplyForm, params,
            successData => {
                //调用展示申请表的插件
                // eslint-disable-next-line
                 mmspc.fileConversion.getApplicationFrom(successData);
                dispatch(loading(false));
            },errorData => {
                // eslint-disable-next-line
                mmspc.dialog.toast("下载申请表失败！");
                dispatch(loading(false));
            } ,"download")
    }
}
//重置loan页面信息
export function clearPropsLoan() {
    return function (dispatch) {
        dispatch(clearLoan(''));
    }
}