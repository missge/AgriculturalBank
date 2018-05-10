import Net from "../netRequest/mmspRequest"
import { Type } from "../global/contact"
export const loading = (data) => ({
    type: 'loading',
    value: data
})
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
    type: "PartyFormData",
    value: data

})
//获取默认数据的表单(不用传递参数)
export function getDefaultValue(appId) {
    return function (dispatch) {
        Net.getRequest(appId + "/rest/hl/process/client", '', function (data) {
            dispatch(handlePartyFormData(data))
        })
    }
}
let ishave = 1

//查询是否有关系人信息（参数传一个作业id）
export function ishaveInformation (appId, params) {
    return function (dispatch) {
        Net.getRequest(appId + "/rest/hl/process/clientlist", params, function (data) {
            alert(JSON.parse(data).data.length)
            //如果有关系人列表,显示关系人信息
            if (ishave == 1) {
                dispatch(showNewContact(true))
                //成功返回的数据
                dispatch(handlePartySuccess(data));
                dispatch(handlePartyFormData(data))

            } else {
                //如果没有关系人列表，显示form表单
                dispatch(showNewContact(false))
                //调用获取默认数据表单的接口
                dispatch(getDefaultValue(appId))
            }
        }, function () {
            alert("失败")
        })
    }
}
//查询单笔
export function querySingleInformation (appId, params) {
    return function (dispatch) {
        Net.getRequest(appId + "/rest/hl/process", params, function (data) {
            alert(JSON.parse(data).data)
           
        }, function () {
            alert("失败")
        })
    }
}


//新增、更新客户信息---点击新增填写数据，调用接口
export function postPartyInfo(appId, params) {
    return function (dispatch) {
        dispatch(showNewContact(false));
        dispatch(loading(true));
        let url = appId + "/rest/hl/process/client"
        Net.postRequest(url, params, Type.jsonType, function (data) {

            dispatch(showNewContact(true));//显示新增联系人列表---列表显示了，可以点击进入详情查看
            dispatch(loading(false));//赋值

            // dispatch(updateRelated(appId))

        }, function (data) {
            alert(url)
            alert(JSON.stringify(params))

            // dispatch(loading(false));
            // dispatch(handlePartyFail("error"));
        })
    }
}
//删除 ---删除客户id
export function deleteRelated(appId, params) {
    return function (dispatch) {

        // eslint-disable-next-line
        Net.getRequest(appId + "/rest/hl/process/client", "params", function (data) {
            dispatch(showNewContact(true));
        },
        function () {

        })
    }
}

