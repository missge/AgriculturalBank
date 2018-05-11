import {getAssetSuccess} from "../actions/loan";

let loanState={
    loadingLoan:false,
    loadingLoanText:"",
    postLoan:false,
    loanInfo:"",
    rateInfo:"",
    houseInfo:"",
    assetInfo:[],
    guarInfo:[],
}

export function loan(state = loanState , action={}) {
    switch (action.type){
        case "loadingLoan":
            return{
                ...state,
                loadingLoan:action.value
            }
        case "loadingLoanText":
            return{
                ...state,
                loadingLoanText:action.value
            }
        case "postLoan":
            return{
                ...state,
                postLoan:action.value
            }
        case "loanInfo":
            return{
                ...state,
                loanInfo:JSON.parse(action.value).data
            }
        case "rateInfo":
            return{
                ...state,
                rateInfo:JSON.parse(action.value).data
            }
        case "houseInfo":
            return{
                ...state,
                houseInfo:JSON.parse(action.value).data
            }
        case "assetInfo":
            return{
                ...state,
                assetInfo:JSON.parse(action.value).data
            }
        case "guarInfo":
            return{
                ...state,
                guarInfo:JSON.parse(action.value).data
            }
        default:
            return{...state}
    }
}