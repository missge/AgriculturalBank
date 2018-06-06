
let investiState={
    reportInfo:"",

}

export function investi(state = investiState , action={}) {
    switch (action.type){
        case "getReportInfo":
            return{
                ...state,
                reportInfo:action.value
            }
        default:
            return{...state}
    }
}