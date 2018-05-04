
let loanState={
    loading:false,
    text:"",
    postSuccess:false,
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
        default:
            return{...state}
    }
}