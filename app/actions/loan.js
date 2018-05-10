import Net from "../netRequest/mmspRequest"
import {getSuccess} from "./credit";
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
export const getLoanSuccess=(data)=>({
    type:"getLoanSuccess",
    value:data
})
export const getRateSuccess=(data)=>({
    type:"getRateSuccess",
    value:data
})
export const getHouseSuccess=(data)=>({
    type:"getHouseSuccess",
    value:data
})
export const getAssetSuccess=(data)=>({
    type:"getAssetSuccess",
    value:data
})
export const getGuarSuccess=(data)=>({
    type:"getGuarSuccess",
    value:data
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
export function postLoanInfo(appId ,loanParams) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("正在生成电子申请表..."));
     //   dispatch(loadingText("正在保存贷款信息..."));
        Net.postRequest(appId + "/rest/hl/process/loan" , loanParams ,"application/json; charset=UTF-8" ,function (data) {
            alert(data);
            dispatch(loading(false));
            dispatch(postSuccess(true));
        },function () {
            alert("贷款信息保存失败");
            dispatch(loading(false));
            dispatch(postSuccess(false));

        })
    }
}

export function postHouseInfo(appId,houseParams) {
    return function (dispatch) {
    //    dispatch(loading(true));
    //    dispatch(loadingText("正在保存房屋信息..."));
        Net.postRequest(appId + "/rest/hl/process/house" ,houseParams,"application/json; charset=UTF-8" ,function (data) {
            alert(data);
            dispatch(postSuccess(true));
        },function () {
            alert('房屋信息保存失败');
            dispatch(postSuccess(false));
        })
    }
}
export function postRateInfo(appId,rateParams) {
    return function (dispatch) {
    //    dispatch(loading(true));
    //    dispatch(loadingText("正在保存利率信息..."));
        Net.postRequest(appId + "/rest/hl/process/acct" ,rateParams,"application/json; charset=UTF-8" ,function (data) {
            alert(data);
            dispatch(postSuccess(true));
        },function () {
            alert('利率信息保存失败');
            dispatch(postSuccess(false));
        })
    }
}
export function postAssetInfo(appId,assetParams) {
    return function (dispatch) {
     //   dispatch(loading(true));
     //   dispatch(loadingText("正在保存押品信息..."));
        Net.postRequest(appId + "/rest/hl/process/asset" ,assetParams,"application/json; charset=UTF-8" ,function (data) {
            alert(data);
            dispatch(postSuccess(true));
        },function () {
            alert('押品信息保存失败');
            dispatch(postSuccess(false));
        })
    }
}
export function postGuarInfo(appId,guarParams) {
    return function (dispatch) {
    //    dispatch(loading(true));
    //    dispatch(loadingText("正在保存担保信息..."));
        Net.postRequest(appId + "/rest/hl/process/guar" ,guarParams,"application/json; charset=UTF-8" ,function (data) {
            alert(data);
            dispatch(postSuccess(true));
        },function () {
            alert('担保信息保存失败');
            dispatch(postSuccess(false));
        })
    }
}
export function getLoanInfo(appId,params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("查询贷款信息..."));
        Net.getRequest(appId+"/rest/hl/process/loan",params ,function (data) {
            alert(data);
            dispatch(loading(false));
            dispatch(getLoanSuccess(data));
        },function () {
            alert("贷款信息查询失败！");
            dispatch(loading(false));
        })
    }
}
export function getRateInfo(appId,params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("查询利率信息..."));
        Net.getRequest(appId+"/rest/hl/process/acct",params  ,function (data) {
            alert(data);
            dispatch(loading(false));
            dispatch(getRateSuccess(data));
        },function () {
            alert("利率信息查询失败！");
            dispatch(loading(false));
        })
    }
}
export function getHouseInfo(appId,params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("查询用途信息..."));
        Net.getRequest(appId+"/rest/hl/process/house",params  ,function (data) {
            alert(data);
            dispatch(loading(false));
            dispatch(getHouseSuccess(data));
        },function () {
            alert("用途信息查询失败！");
            dispatch(loading(false));
        })
    }
}
export function getAssetInfo(appId,assetlistparams,assetIdparams) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("查询押品信息..."));
        //押品列表查询  传作业Id
        Net.getRequest(appId+"/rest/hl/process/assetlist",assetlistparams  ,function (data) {
            alert(data);
            if(data != "" && data != null){
                dispatch(loading(false));
                dispatch(getAssetSuccess(data));
            }else {
                //押品单笔查询  传押品Id
                Net.getRequest(appId + "/rest/hl/process/asset", assetIdparams, function (data) {
                    dispatch(loading(false));
                    dispatch(getAssetSuccess(data));
                }, function () {
                    alert("押品信息查询失败！");
                    dispatch(loading(false));
                })
            }
        },function () {
            alert("押品信息查询失败！");
            dispatch(loading(false));
        })
    }
}
export function getGuarInfo(appId,guarListparams,guarIdparams) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("查询担保信息..."));
        //押品列表查询  传作业Id
        Net.getRequest(appId+"/rest/hl/process/guarlist",guarListparams  ,function (data) {
            alert(data);
            if(data != "" && data != null){
                dispatch(loading(false));
                dispatch(getGuarSuccess(data));
            }else {
                //押品单笔查询  传押品Id
                Net.getRequest(appId + "/rest/hl/process/guar", guarIdparams, function (data) {
                    dispatch(loading(false));
                    dispatch(getGuarSuccess(data));
                }, function () {
                    alert("担保信息查询失败！");
                    dispatch(loading(false));
                })
            }
        },function () {
            alert("担保信息查询失败！");
            dispatch(loading(false));
        })
    }
}