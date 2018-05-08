import Net from "../netRequest/mmspRequest"
import {Type} from "../global/contact"
export const loading =(data)=>({
    type:'loading',
    value:data
})
// 是否显示新建联系人
export const showNewContact = (data)=>({
    type:"isShowNewContact",
    value:data
})
// 成功
export const handlePartySuccess = (data)=>({
    type:"partySuccess",
    value:data
})
// 失败
export const handlePartyFail = (data)=>({
    type:"partyFail",
    value:data
})
//获取关系人信息的值


export function postPartyInfo (appId,params) {
    return function(dispatch) {
        dispatch(showNewContact(false));
        dispatch(loading(true));
        let url=appId+"/rest/hl/process/client"
        Net.postRequest(url,params,Type.jsonType,function(data){
  
            dispatch(showNewContact(true));//显示新增联系人列表---列表显示了，可以点击进入详情查看
            dispatch(loading(false));//赋值

            dispatch(updateRelated(appId))

        },function (data) {
            alert(url)
            alert(JSON.stringify(params))
            
            // dispatch(loading(false));
            // dispatch(handlePartyFail("error"));
        })
    }
}
//更新作业
export function updateRelated(appId,params){
    return function(dispatch) {

        // eslint-disable-next-line
        Net.getRequest(appId+"/rest/hl/process/loan","",function(data){

        },
        function(){

        })
    }
}
let ishave=1
//查询是否有关系人信息
export function ishaveInformation(appId,params){
    return function(dispatch){
        Net.getRequest(appId+"/rest/hl/process/clientlist",params,function(data){
            //如果有关系人列表,显示关系人信息
            if(ishave==1){
                dispatch(showNewContact(true))
                dispatch(handlePartySuccess(data));
            }else{ 
                //如果没有关系人列表，显示form表单
                dispatch(showNewContact(false))
                dispatch(getDefaultValue(appId))






            }
    
        },function () {
           alert("失败")
       })
    }
   
}
//获取默认数据的表单
export function getDefaultValue (appId){
    return function(dispatch){
        Net.getRequest(appId+"/rest/hl/process/client",'',function(data){
            dispatch(handlePartySuccess(data));
        })
    }
}