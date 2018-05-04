
/**
 * Created by Liumengxuan on 2018/3/2.
 */
// 初始化状态
let initNavList = {
    readIdCard: 'none',

}

let initName = {
    instName:"丽泽路支行..."
}

let initState = {
    text:"登录中...",
    showLoading:false
}

export function home(state = initNavList, action={}) {
    switch (action.type) {
        case 'READ_ID_CARD':
            return {
                ...state,   //三个点是展开符
                readIdCard: action.readIdCard
            }

        default:
            return {...state};
    }
}

export function head(state = initName ,action={}) {
    switch (action.type){
        case 'Name':
            return{
                ...state,
                instName:action.instName
            }
        default:
            return {...state};
    }
}

export function load(state = initState ,action={}) {
    switch (action.type){
        case 'LoadingText':
            return{
                ...state,
                text:action.value
            }
        case "Loading":
            return{
                ...state,
                showLoading:action.value
            }
        default:
            return {...state};
    }
}

let initData = {
    // 机构列表的数据
    value:null,
    // 显示机构列表的标识
    showList:false,
    // 显示加载框的标识
    loading:false,
    // 加载框的提示语
    text:"",
    // 登录成功后的数据
    loginResult:null,
    // 登录失败后的数据
    loginFail:null,
    // 获取机构列表成功的数据
    getInstResult:null,
    // 获取机构列表失败的数据
    getInstFail:null
}
export function loginData(state=initData ,action={}) {
    switch (action.type){
        case 'Loading':
            return{
                ...state,
                loginResult:action.value
            }
        case 'LoadSuccess':
            return{
                ...state,
                value:action.value
            }
        case 'LoadFail':
            return{
                ...state,
                loginFail:action.value
            }
        case "content":
            return{
                ...state,
                text:action.value
            }
        default:
            return {...state}
    }
}

let instData = {

}

export function instData(state=initData , action={}) {
    switch (action.type){
        case "Success":
            return{
                ...state,
                getInstResult:action.value
            }
        case "Fail":
            return{
                ...state,
                getInstFail:action.value
            }
        case "showList":
            return{
                ...state,
                showList:action.value
            }
        case "Loading":
            return{
                ...state,
                loading:action.value
            }
        case "content":
            return{
                ...state,
                text:action.value
            }
        default:
            return{...state}
    }
}