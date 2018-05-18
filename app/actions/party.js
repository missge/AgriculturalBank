import Net from "../netRequest/mmspRequest"
import { Type } from "../global/contact"
import Toast from "../components/src/message/Toast";
import {loading,loadingText} from "./login";

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
//查询是否有关系人信息（参数传一个作业id）
let ishave = 1
export function ishaveInformation (appId, params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("查询是否有关系人信息..."));
        Net.getRequest(appId + "/rest/hl/process/clientlist", params, function (data) {
            // alert(JSON.parse(data).data.length)
            //长度为0则没有关系人列表
            if(JSON.parse(data).data.length==0){
                alert(params)
                dispatch(getDefaultValue(appId, params)) //调用获取默认数据表单的接口
                dispatch(showNewContact(false))//如果没有关系人列表，显示form表单
                dispatch(loading(false));
                
            }else{
                //如果有关系人列表,显示关系人信息
                    let jsonData=JSON.parse(data).data
                    dispatch(showNewContact(true))
                    //成功返回的数据
                    dispatch(handlePartySuccess(jsonData));
                    dispatch(handlePartyFormData(jsonData));
                    dispatch(loading(false));
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
            // alert("失败")
        })
    }
}
//获取默认数据的表单(不用传递参数)
export function getDefaultValue(appId,params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("查询默认数据中..."));
        Net.getRequest(appId + "/rest/hl/process/client", params, function (data) {
           // JSON.stringify解析一个对象    alert(JSON.stringify(jsonData))
            let jsonData=JSON.parse(data).data
            dispatch(handlePartyFormData(jsonData))
            dispatch(handlePartySuccess(jsonData))
            dispatch(loading(false));
        },function () {
            dispatch(handlePartyFail('error'));
            dispatch(loading(false));
        })
    }
}
//新增、更新客户信息---点击新增填写数据，调用接口
export function postPartyInfo(appId, params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("新增客户信息中..."));
        dispatch(showNewContact(false));//操控列表的显示
        // dispatch(loading(true));
        let url = appId + "/rest/hl/process/client"
        Net.postRequest(url, params, Type.jsonType, function (data) {
            let clineID=JSON.parse(data).data
            dispatch(handlePartyClineId(clineID))//获取id
            dispatch(showNewContact(true));//显示新增联系人列表---列表显示了，可以点击进入详情查看
            dispatch(loading(false));//赋值

        }, function () {
            dispatch(handlePartyFail('error'));
            dispatch(loading(false));
        })
    }
}
//删除 ---删除客户id---失败
export function deleteRelated(appId, params) {
    return function (dispatch) {
        dispatch(loadingText("删除中..."));
        dispatch(loading(true));
         dispatch(showNewContact(false));
        // eslint-disable-next-line
        Net.postRequest(appId + "/rest/hl/process/client", params, Type.jsonType, function (data) {
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


//查询单笔
// export function querySingleInformation (appId, params) {
//     return function (dispatch) {
//         Net.getRequest(appId + "/rest/hl/process/client", params, function (data) {

//         }, function () {
//             dispatch(handlePartyFail('error'));
            
//         })
//     }
// }

