let borrowerState={
    postSuccess:false,
    loanerInfo:"",
    state:false
}

export function borrower(state = borrowerState , action={}) {
    switch (action.type){
        case "postSuccess":
            return{
                ...state,
                postSuccess:action.value
            }
        case "loanerInfo":
            return{
                ...state,
                loanerInfo:JSON.parse(action.value).data
            }
        case "state":
            return{
                ...state,
                state:action.value
            }
        default:
            return{...state}
    }
}