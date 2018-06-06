import {showQuery} from "../actions/credit";


let creditState={
    getCreditQuery:"",
    basicInfo:"",
    parsedInfo:"",
    summaryInfo:"",
    creditTrans:"",
    publicInfo:"",
    queryLog:"",
    creditResult:false,
    showQuery:"none",
    clearCredit:"",
}

export function credit(state = creditState , action={}) {
    switch (action.type){
        case "getBasicInfo":
            return{
                ...state,
                basicInfo:action.value
            }
        case "getParsedInfo":
            return{
                ...state,
                parsedInfo:action.value
            }
        case "getSummaryInfo":
            return{
                ...state,
                summaryInfo:action.value
            }
        case "getCreditTrans":
            return{
                ...state,
                creditTrans:action.value
            }
        case "getPublicInfo":
            return{
                ...state,
                publicInfo:action.value
            }
        case "getQueryLog":
            return{
                ...state,
                queryLog:action.value
            }
        case "creditResult":
            return{
                ...state,
                creditResult:action.value
            }
        case "showQuery":
            return{
                ...state,
                showQuery:action.value
            }
        case "clearCredit":
            return{
                ...state,
                basicInfo:"",
                parsedInfo:"",
                summaryInfo:"",
                creditTrans:"",
                publicInfo:"",
                queryLog:"",
                creditResult:false,
                showQuery:"none"
            }
        default:
            return{...state}
    }
}