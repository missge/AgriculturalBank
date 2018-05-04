import {Loading ,LoadSuccess ,LoadFail} from "../actions/login";
let initData = {
    value:null,
    loading:false
}

export function loginData(state=initData ,action={}) {
    switch (action.type){
        case Loading:
            return{
                ...state,
                loading:action.value
            }
            break;
        case LoadSuccess:

            return{
                ...state,
                value:action.value
            }
            break;
        case LoadFail:
            return{
                ...state,
                value:action.value
            }
            break;
        default:
            return {...state}
    }
}