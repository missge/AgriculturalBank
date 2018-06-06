
/**
 * Created by Liumengxuan on 2018/3/2.
 */
// 初始化状态
let initNavList = {
    readIdCard: 'none',
    pageSelected:0,
    // ”1“是一手房  ”2“是二手房
    optkind:"1",
    opt:"A5101",
}

let initName = {
    instName:"机构名称",
    instCode:""
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
        case "selected":
            return{
                ...state,
                pageSelected:action.value
            }
        case "optKind":
            return{
                ...state,
                optkind:action.value
            }
        case "opt":
            return{
                ...state,
                opt:action.value
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
        case 'Code':
            return{
                ...state,
                instCode:action.instCode
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
    getInstFail:null,
    // 是否联网核查成功
    netCheck:false,
    // 模板列表
    modelList:[],
    // 场景列表
    sceneList:[],

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
        case "netResult":
            return{
                ...state,
                netCheck:action.value
            }
        case "modelList":
            return{
                ...state,
                modelList:action.value
            }
        case "sceneList":
            return{
                ...state,
                sceneList:action.value
            }
        default:
            return{...state}
    }
}
let instInfo={
    // 机构的详细数据，数据格式是一个json
    instInfo:""
}
export function instInfo(state=instInfo , action={}) {
    switch (action.type){
        case "instInfo":
            return{
                ...state,
                instInfo:action.value
            }
        default:
            return{...state}
    }
}

let clientData = {
    clientId:"",
    certNo:"",
    certName:"",
    procsId:""
}

export function client(state=clientData ,action={}) {
    switch (action.type){
        case "clientId":
            return{
                ...state,
                clientId:action.value
            }
        case "procsId":
            return{
                ...state,
                procsId:action.value
            }
        case "certName":
            return{
                ...state,
                certName:action.value
            }
        case "certNo":
            return{
                ...state,
                certNo:action.value
            }
        default:
            return{...state}
    }
}