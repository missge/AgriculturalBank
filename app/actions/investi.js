import Net from "../netRequest/mmspRequest"
import {Type} from "../global/contact"
import {loading,loadingText} from "./login";
import {Url} from "../global/url";

export const getReportInfo = (data) => ({
    type: "getReportInfo",
    value: data
})
export function getInvtreport(params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("获取调查报告..."));
        Net.getRequest(Url.invtreport ,params ,
            function (successData) {
                // eslint-disable-next-line
                mmspc.dialog.toast("拉取调查报告成功");
                dispatch(getReportInfo(JSON.parse(successData).data));
                dispatch(loading(false));
            },function () {
                // eslint-disable-next-line
                mmspc.dialog.toast("拉取调查报告失败");
                dispatch(loading(false));
            })
    }
}

export function commitWork(reqId ,params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("提交作业..."));
        Net.postRequest(Url.commitProcess+"?req_id="+reqId , params , Type.jsonType ,
            function (data) {
                // eslint-disable-next-line
                mmspc.dialog.toast("提交作业成功");
                dispatch(loading(false));
            },function () {
                // eslint-disable-next-line
                mmspc.dialog.toast("提交作业失败");
                dispatch(loading(false));
            })
    }
}

export function queryWork(params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("查询作业中..."));
        Net.getRequest(Url.process , params,
            function (data) {
                dispatch(loading(false));
            },function () {
                dispatch(loading(false));
            })
    }

}
export function queryObject(params) {
    return function (dispatch) {
        dispatch(loading(true));
        Net.postRequest(Url.searchList , params, Type.formType,
            function (data) {
                // eslint-disable-next-line
                mmspc.dialog.toast("获取成功！");
                dispatch(loading(false));
            },function () {
                // eslint-disable-next-line
                mmspc.dialog.toast("获取失败！");
                dispatch(loading(false));
            })
    }
}