import {getAssetSuccess} from "../actions/loan";

let loanState={
    loading:false,
    text:"",
    postSuccess:false,
    getLoanSuccess: [],
    getRateSuccess:[],
    getHouseSuccess:[],
    getAssetSuccess:[],
    getGuarSuccess:[],
}

export function loan(state = loanState , action={}) {
    switch (action.type){
        case "loading":
            return{
                ...state,
                loading:action.value
            }
        case "text":
            return{
                ...state,
                text:action.value
            }
        case "postSuccess":
            return{
                ...state,
                postSuccess:action.value
            }
        case "getLoanSuccess":
            return{
                ...state,
                getLoanSuccess:action.value
            }
        case "getRateSuccess":
            return{
                ...state,
                getRateSuccess:action.value
            }
        case "getHouseSuccess":
            return{
                ...state,
                getHouseSuccess:action.value
            }
        case "getAssetSuccess":
            return{
                ...state,
                getAssetSuccess:action.value
            }
        case "getGuarSuccess":
            return{
                ...state,
                getGuarSuccess:action.value
            }
        default:
            return{...state}
    }
}