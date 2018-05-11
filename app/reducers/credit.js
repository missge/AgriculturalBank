import {getSuccess} from "../actions/credit";

let creditState={
    loadingCredit:false,
    loadingCreditText:"",
    getCreditQuery:"",
}

export function credit(state = creditState , action={}) {
    switch (action.type){
        case "loadingCredit":
            return{
                ...state,
                loadingCredit:action.value
            }
        case "loadingCreditText":
            return{
                ...state,
                loadingCreditText:action.value
            }
        case "getCreditQuery":
            return{
                ...state,
                getCreditQuery:JSON.parse(action.value).data
            }
        default:
            return{...state}
    }
}