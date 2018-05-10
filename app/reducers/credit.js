import {getSuccess} from "../actions/credit";

let creditState={
    loading:false,
    text:"",
    getSuccess:false,
}

export function credit(state = creditState , action={}) {
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
        case "getSuccess":
            return{
                ...state,
                getSuccess:action.value
            }
        default:
            return{...state}
    }
}