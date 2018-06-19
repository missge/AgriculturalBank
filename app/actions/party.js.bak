import Net from "../netRequest/mmspRequest"
import { Type } from "../global/contact"
import Toast from "../components/src/message/Toast";
import {loading,loadingText} from "./login";
import {Url} from "../global/url";
//------------------------------征信查询action开始-------------------------------------
//征信查询是否成功
export const creditResult_p = (data) => ({
    type: "creditResult_p",
    value: data
})
//征信报告是否查询
export const isCreditQuery_p = (data) => ({
    type: "showQuery_p",
    value: data
})
//重置征信查询页面
export const clearCredit_p = (data) => ({
    type: "clearCredit_p",
    value: data
})
export const getBasicInfo_p = (data) => ({
    type: "getBasicInfo_p",
    value: data
})
export const getParsedInfo_p = (data) => ({
    type: "getParsedInfo_p",
    value: data
})
export const getSummaryInfo_p = (data) => ({
    type: "getSummaryInfo_p",
    value: data
})
export const getCreditTrans_p = (data) => ({
    type: "getCreditTrans_p",
    value: data
})
export const getPublicInfo_p = (data) => ({
    type: "getPublicInfo_p",
    value: data
})
export const getQueryLog_p = (data) => ({
    type: "getQueryLog_p",
    value: data
})
//------------------------------征信查询action结束-------------------------------------

// 是否显示新建联系人
export const showNewContact = (data) => ({
    type: "isShowNewContact",
    value: data
})
// 成功
export const handlePartySuccess = (data) => ({
    type: "partySuccess",
    value: data
})
// 失败
export const handlePartyFail = (data) => ({
    type: "partyFail",
    value: data
})
//form表单
export const handlePartyFormData = (data) => ({
    type: "partyFormData",
    value: data

})
//存放clientid
export const handlePartyClineId = (data) => ({
    type: "partyClientId",
    value:data
})
//是否查询过judgeIsQuery
export const handleIsQuery = (data) =>({
    type:'judgeIsQuery',
    value:data
})

//查询关系人列表长度+1，第六页显示图片的编码
export const relaCounting = (data) =>({
    type:'relaCounting',
    value:data
})

//查询是否有关系人信息（参数传一个作业id）
let ishave = 1;
let listLength = 0;
export function ishaveInformation (params,clientid) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("查询是否有关系人信息..."));
        Net.getRequest(Url.clientList, params, function (data) {
            //alert(JSON.parse(data).data.length)
            //长度为0则没有关系人列表
            if(JSON.parse(data).data.length==0 || JSON.parse(data).data[0].isrel != "0"){
                listLength = JSON.parse(data).data.length + 1;
                dispatch(relaCounting(listLength)); //与页面groupId 拼起来，传给上传图片接口的参数   这里为1，表示第一个关系人
               //????问题：clientId有问题 值获取的到 看下与后台是否不匹配
                dispatch(getDefaultValue(JSON.parse("{\"clientId\":\""+clientid+"\"}")))
				        //dispatch(getDefaultValue(JSON.parse("{\"clientId\":\"${clientid}\"}")))
			          // dispatch(getDefaultValue(JSON.parse("{\"client_id\":"+"\""+clientid+"\"}")))
                dispatch(showNewContact(false))//如果没有关系人列表，显示form表单
                dispatch(loading(false));
            }else{
                 listLength = JSON.parse(data).data.length + 1;
                dispatch(relaCounting(listLength)); //与页面groupId 拼起来，传给上传图片接口的参数;已有关系人数加1
                //如果有关系人列表,显示关系人信息
                let jsonData=JSON.parse(data).data
                dispatch(showNewContact(true))
                //成功返回的数据
                dispatch(handlePartySuccess(jsonData));
                dispatch(handlePartyFormData(jsonData));
                dispatch(loading(false));

            }
            //如果有关系人列表,显示关系人信息
            // if (ishave == 1) {
            //     dispatch(showNewContact(true))
            //     //成功返回的数据
            //     dispatch(handlePartySuccess(data));
            //     dispatch(handlePartyFormData(data))

            // } else {
            //     //如果没有关系人列表，显示form表单
            //     dispatch(showNewContact(false))
            //     //调用获取默认数据表单的接口
            //     dispatch(getDefaultValue(appId))
            // }
        }, function () {
            dispatch(loading(false));
            // alert("失败")
        })
    }
}
//获取默认数据的表单(不用传递参数)
export function getDefaultValue(params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("查询默认数据中..."));
        Net.getRequest(Url.client, params, function (data) {
            // JSON.stringify解析一个对象    alert(JSON.stringify(jsonData))
            // eslint-disable-next-line
            mmspc.dialog.toast("获取成功！");

            let jsonData=JSON.parse(data).data
            dispatch(handlePartyFormData(jsonData))
            dispatch(handlePartySuccess(jsonData))
            dispatch(loading(false));
        },function () {
            dispatch(handlePartyFail('error'));
            dispatch(loading(false));
            // eslint-disable-next-line
            mmspc.dialog.toast("获取表单失败！");

        })
    }
}
//新增、更新客户信息---点击新增填写数据，调用接口
export function postPartyInfo(params) {
    //????一直新增出问题
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("新增客户信息中..."));
        dispatch(showNewContact(false));//操控列表的显示
        // dispatch(loading(true));
        Net.postRequest(Url.client, params, Type.jsonType, function (data) {
            listLength = listLength + 1;
            dispatch(relaCounting(listLength));
            let clineID=JSON.parse(data).data
            dispatch(handlePartyClineId(clineID))//获取id
            dispatch(showNewContact(true));//显示新增联系人列表---列表显示了，可以点击进入详情查看
            dispatch(loading(false));//赋值
            // eslint-disable-next-line
            mmspc.dialog.toast("新增成功！");
        }, function () {
            dispatch(handlePartyFail('error'));
            dispatch(loading(false));
            // eslint-disable-next-line
            mmspc.dialog.toast("新增失败！");
        })
    }
}
//删除 ---删除客户id---失败
export function deleteRelated(params) {
    return function (dispatch) {
        dispatch(loadingText("删除中..."));
        dispatch(loading(true));
         dispatch(showNewContact(false));
        // eslint-disable-next-line
        Net.postRequest(Url.client, params, Type.jsonType, function (data) {
            // alert("成功")
            dispatch(showNewContact(false));
             dispatch(loading(false));
        },function () {
            // alert("删除")
            dispatch(loading(false));
            dispatch(showNewContact(false));
            dispatch(handlePartyFail('error'));
        })
    }
}

//------------------------------征信查询action开始-------------------------------------
//征信查询
export function getCreditResult_p(params) {
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

            dispatch(getBasicInfo_p(personInfo));
            dispatch(getParsedInfo_p(parsedInfo));
            dispatch(getSummaryInfo_p(summaryInfo));
            dispatch(getCreditTrans_p(creditTrans));
            dispatch(getPublicInfo_p(publicInfo));
            dispatch(getQueryLog_p(queryLog));
            dispatch(creditResult_p(true));
            dispatch(isCreditQuery_p("block"));
            dispatch(loading(false));
        }, function () {
            // eslint-disable-next-line
            mmspc.dialog.toast("征信查询失败！");
            dispatch(loading(false));
        })
    }
}

//重置Credit为空
export function clearPropsCredit_p() {
    return function (dispatch) {
        dispatch(clearCredit_p(""));
    }
}

//上传征信授权书
export function uploadCreditPage_p(reqId, clientId, url, success, fail) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("上传征信授权书..."));
        Net.postRequest(url, "{\"req_id\":\"" + reqId + "\",\"client_id\":\"" + clientId + "\",\"ba_doc_name\":\"征信授权书\",\"ba_doc_summary\":\"摘要\" ,\"url\":\"" + url + "\"}", Type.formType, success, fail)
    }
}
//------------------------------征信查询action结束-------------------------------------



//查询单笔
// export function querySingleInformation (appId, params) {
//     return function (dispatch) {
//         Net.getRequest(appId + "/rest/hl/process/client", params, function (data) {

//         }, function () {
//             dispatch(handlePartyFail('error'));
            
//         })
//     }
// }

