import Net from "../netRequest/mmspRequest";
import {Type} from "../global/contact"
import {setCardName, setCardNum} from "./home";
import {Url} from "../global/url";
import {uploadCreditPage} from "./credit";
import {queryWork} from "./investi"
// 加载弹框是否显示逻辑
export const loading=(data)=> ({
    type:"Loading",
    value:data,
})
// 弹框提示语的内容
export const loadingText=(data)=> ({
    type:"content",
    value:data,
})

//登录的actions
export const loginLoadSuccess=(data)=> ({
    type:"LoadSuccess",
    value:data
})

export const loginLoadFail=(data)=> ({
    type:"LoadFail",
    value:data
})

// 拉取机构列表的actions
export const getInstSuccess=(data)=> ({
    type:"Success",
    value:data
})

export const getInstFail=(data)=> ({
    type:"Fail",
    value:data
})
// 显示机构列表的标识
export const showList = (data)=>({
    type:"showList",
    value:data
})

// 机构详情成功的数据
export const instInfo = (data)=>({
    type:"instInfo",
    value:data
})
// 联网核查是否成功
export const netResult = (data)=>({
    type:"netResult",
    value:data
})

export const setProcsId = (data)=>({
    type:"procsId",
    value:data
})
export const setClientId = (data)=>({
    type:"clientId",
    value:data
})
export const setModelList = (data)=>({
    type:"modelList",
    value:data
})

export const setSceneList = (data)=>({
    type:"sceneList",
    value:data
})
// 密码登录
export function login(params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("登录中..."));
        Net.postRequest(Url.login ,params,
            Type.formType,function (data) {
                // dispatch(loading(false));
                // dispatch(loginLoadSuccess(data));
                // dispatch(getInst(appId));
                dispatch(getInst());
            },function () {
                dispatch(loading(false));
                dispatch(loginLoadFail("error"));
            })
    }
}

// 密码登录
export function loginFromB(params , workId) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("登录中..."));
        Net.postRequest(Url.login ,params,
            Type.formType,function (data) {
                dispatch(queryWork(JSON.parse("{\"req_id\":\""+workId+"\"}")));
            },function () {
                dispatch(loading(false));
                dispatch(loginLoadFail("error"));
            })
    }
}
// 无密码登录
export function loginNonePassword(params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("登录中..."));
        Net.postRequest(Url.facein , params , Type.formType ,
            function (data) {
                dispatch(getInst());
            },function () {
                dispatch(loading(false));
                dispatch(loginLoadFail("error"));
            })
    }
}
export function getInst() {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("获取机构列表..."));
        // 根据appId登录
        // eslint-disable-next-line
        Net.getRequest(Url.instList ,"" ,function (data) {
                dispatch(loading(false));
                dispatch(showList(true));
                dispatch(getInstSuccess(data));
            },function () {
                dispatch(loading(false));
                dispatch(getInstFail("error"));
            })
    }
}

export function getInstInfo(instcode) {
    return function(dispatch){
        dispatch(loading(true));
        dispatch(loadingText("选择机构中..."));
        Net.postRequest(Url.instInfo , "instcode="+instcode ,Type.formType,
            function (data) {
                dispatch(instInfo());
                dispatch(getModelList());
            },function () {
                dispatch(loading(false));
            })
    }

}
export function getModelList() {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("获取模板列表..."));
        Net.getRequest(Url.modelList , "",function (data) {
            dispatch(setModelList(JSON.parse(data).data));
            dispatch(loading(false));
            dispatch(getSceneList(JSON.parse("{\"pdts_cod\":\""+optkind+"\"}")));
        },function () {
            dispatch(loading(false));

        })
    }
}
// 这个接口是在联网核查前调用，确保后台能够记录到这个人员的信息
export function addCustomer(params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("联网核查中..."));
        // 身份证号 110108195805175419  姓名 张李五
        Net.postRequest(Url.client , params , Type.jsonType,
            function (data) {
                dispatch(loading(false));
                dispatch(setClientId(JSON.parse(data).data.client_id));
                dispatch(netcheck(JSON.parse(data).data.client_id));
                dispatch(setCardName(JSON.parse(params).cliname));
                dispatch(setCardNum(JSON.parse(params).certno));
            },function () {
                dispatch(loading(false));
            });
    }
}
export function netcheck(clientId) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("联网核查中..."));
        // eslint-disable-next-line
        Net.getRequest(Url.netCheck ,
            JSON.parse("{\"clientId\":"+"\""+clientId+"\"}"),function (data) {
                dispatch(loading(false));
                dispatch(accessResult(clientId));
                dispatch(netResult(true));
            },function () {
                dispatch(loading(false));
                dispatch(netResult(false));
            })

    }
}

export function accessResult(clientId) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("联网核查中..."));
        // 客户准入
        // eslint-disable-next-line
        Net.getRequest(Url.netResult ,
            JSON.parse("{\"clientId\":\""+clientId+"\"}"),function (data) {
                dispatch(loading(false));
            },function () {
                dispatch(loading(false));
            })
    }
}

export function addWork(params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("生成作业Id..."));
        // Cql3SSh2
        // eslint-disable-next-line
        Net.postRequest(Url.process ,params , Type.jsonType,
            function (data) {
                dispatch(loading(false));
                dispatch(setProcsId(JSON.parse(data).data.req_id));
            },function () {
                dispatch(loading(false));
            })
    }
    
}
export function updateWork(params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("更新作业信息..."));
        Net.putRequest(Url.process , params , Type.jsonType,
            function (data) {
                // eslint-disable-next-line
                mmspc.dialog.toast("更新作业信息成功");
                dispatch(loading(false));

            },function () {
                // eslint-disable-next-line
                mmspc.dialog.toast("更新作业信息失败");
                dispatch(loading(false));
            })
    }
}

export function queryList(params) {
    return function (dispatch) {
        dispatch(loading(true));
        Net.getRequest("/rest/admin/ipl/processlist" , params ,
            function (data) {
                dispatch(loading(false));
            },function () {
                dispatch(loading(false));
            })
    }
}

export function loginout(params) {
    return function (dispatch) {
        dispatch(loading(true));
        Net.getRequest(Url.loginOut , "" ,
            function (data) {
                dispatch(loading(false));
            },function () {
                dispatch(loading(false));
            })
    }
}

export function getSceneList(params) {
    return function (dispatch) {
        dispatch(loadingText("获取场景列表..."));
        dispatch(loading(true));
        Net.getRequest(Url.sceneList , params ,
            function (data) {
                dispatch(setSceneList(JSON.parse(data).data));
                dispatch(loading(false));
            },function () {
                dispatch(loading(false));
            })
    }
}
