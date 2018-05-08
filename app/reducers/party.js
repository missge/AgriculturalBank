let initData={
    //是否显示新建联系人 
    showNewContact:false,
    //列表的数据
    partyDataList:[],
    // 请求失败
    getPartyFail:''
}

export function partyData(state=initData , action={}) {
    switch (action.type){
        case "partySuccess":
            return{
                ...state,
                partyDataList:action.value
            }
        case "partyFail":
            return{
                ...state,
                getPartyFail:action.value
            }
        case "isShowNewContact":
            return{
                ...state,
                showNewContact:action.value
            }

        default:
            return{...state}
    }
}