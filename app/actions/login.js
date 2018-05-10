import Net from "../netRequest/mmspRequest";
import {Type} from "../global/contact"
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
/*export function getInst(appId) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("登录中..."));
        // 联网核查
        // eslint-disable-next-line
        // Net.getRequest(appId+"/rest/pub/access/onlinecheck" ,
        //     /!*JSON.parse("{\"clientId\":\"00000\",\"procsId\":\"2018abcA5101A0000213\"}")*!/
        //     JSON.parse("{\"clientId\":\"00000\"}"),function (data) {
        //         // dispatch(loading(false));
        //         // dispatch(loginLoadSuccess(data));
        //         alert("success");
        //         dispatch(getInst(appId));
        //     },function () {
        //         alert("fail");
        //         dispatch(loading(false));
        //         dispatch(loginLoadFail("error"));
        //     })

        // 客户准入
        // eslint-disable-next-line
        // Net.getRequest(appId+"/rest/pub/access/result" ,
        //     /!*JSON.parse("{\"clientId\":\"00000\",\"procsId\":\"2018abcA5101A0000213\"}")*!/
        //     JSON.parse("{\"clientId\":\"00000\"}"),function (data) {
        //         // dispatch(loading(false));
        //         // dispatch(loginLoadSuccess(data));
        //         alert("success");
        //         dispatch(getInst(appId));
        //     },function () {
        //         alert("fail");
        //         dispatch(loading(false));
        //         dispatch(loginLoadFail("error"));
        //     })
        // 征信结果
        // eslint-disable-next-line
        // Net.getRequest(appId+"/rest/pub/credit/result" ,
        //     JSON.parse("{\"clientId\":\"00000\",\"procsId\":\"2018abcA5101A0000213\"}")
        //     /!*JSON.parse("{\"clientId\":\"00000\"}")*!/,function (data) {
        //         // dispatch(loading(false));
        //         // dispatch(loginLoadSuccess(data));
        //         alert("success");
        //         dispatch(getInst(appId));
        //     },function () {
        //         dispatch(loading(false));
        //         dispatch(loginLoadFail("error"));
        //     })
        // 机构列表
        // eslint-disable-next-line
        // Net.getRequest(appId+"/rest/admin/system/user/instlist" ,
        //     /!*JSON.parse("{\"clientId\":\"00000\",\"procsId\":\"2018abcA5101A0000213\"}")*!/
        //     /!*JSON.parse("{\"clientId\":\"00000\"}")*!/"",function (data) {
        //         // dispatch(loading(false));
        //         // dispatch(loginLoadSuccess(data));
        //         // dispatch(getInst(appId));
        //     },function () {
        //         dispatch(loading(false));
        //         dispatch(loginLoadFail("error"));
        //     })
        // 用户登入（无密码）
        // eslint-disable-next-line
        // Net.postRequest(appId+"/rest/admin/system/user/facein" ,"username=412801198304100815",
        //     Type.jsonType,function (data) {
        //         // dispatch(loading(false));
        //         // dispatch(loginLoadSuccess(data));
        //         // dispatch(getInst(appId));
        //     },function () {
        //         dispatch(loading(false));
        //         dispatch(loginLoadFail("error"));
        //     })
        // 选择机构（无密码）
        // eslint-disable-next-line
        // Net.postRequest(appId+"/rest/admin/system/user/index" ,"instcode=000000000603",
        //     Type.jsonType,function (data) {
        //         // dispatch(loading(false));
        //         // dispatch(loginLoadSuccess(data));
        //         // dispatch(getInst(appId));
        //     },function () {
        //         dispatch(loading(false));
        //         dispatch(loginLoadFail("error"));
        //     })
    }
}*/
export function login(appId) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("登录中..."));
        // 根据appId登录
        // eslint-disable-next-line
        Net.postRequest(appId+"/rest/admin/system/user/signin" ,"username=412801198304100815&userpass=11111111",
            Type.formType,function (data) {
                // dispatch(loading(false));
                // dispatch(loginLoadSuccess(data));
                dispatch(getInst(appId));
            },function () {
                dispatch(loading(false));
                dispatch(loginLoadFail("error"));
            })
    }
}
export function getInst(appId) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("获取机构列表..."));
        // 根据appId登录
        // eslint-disable-next-line
        Net.getRequest(appId+"/rest/admin/system/user/instlist" ,"" ,function (data) {
                dispatch(loading(false));
                dispatch(showList(true));
                dispatch(getInstSuccess(data));
            },function () {
                dispatch(loading(false));
                dispatch(getInstFail("error"));
            })
    }
}

export function getInstInfo(appId , instcode) {
    return function(dispatch){
        dispatch(loading(true));
        dispatch(loadingText("查询机构中..."));
        Net.postRequest(appId+"/rest/admin/system/user/index" , "instcode="+instcode ,Type.formType,
            function (data) {
                dispatch(instInfo(data));
                dispatch(getModelList(appId));
            },function () {
                dispatch(loading(false));
            })
    }

}
export function getModelList(appId , ) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("获取模板列表..."));
        Net.getRequest(appId+"/rest/hl/process/templist" , "",function (data) {
            dispatch(loading(false));

        },function () {
            dispatch(loading(false));

        })
    }
}
// 这个接口是在联网核查前调用，确保后台能够记录到这个人员的信息
export function addCustomer(appId , params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("联网核查中..."));
        Net.postRequest(appId+"/rest/hl/process/client" , params , Type.jsonType,
            function (data) {
                dispatch(loading(false));
                dispatch(netcheck(appId , data));
            },function () {
                dispatch(loading(false));
            });
    }
}
export function netcheck(appId , clientId) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("联网核查中..."));
        // eslint-disable-next-line
        Net.getRequest(appId+"/rest/pub/access/onlinecheck" ,
            JSON.parse("{\"clientId\":"+"\""+clientId+"\"}"),function (data) {
                dispatch(loading(false));
                dispatch(accessResult(true));
            },function () {
                dispatch(loading(false));
            })

    }
}

export function accessResult(appId , clientId) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("联网核查中..."));
        // 客户准入
        // eslint-disable-next-line
        Net.getRequest(appId+"/rest/pub/access/result" ,
            JSON.parse("{\"clientId\":\""+clientId+"\"}"),function (data) {
                dispatch(loading(false));
                dispatch(netResult(true));
            },function () {
                dispatch(loading(false));
                dispatch(netResult(false));
            })
    }
}

export function addWork(appId , params) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("生成作业Id..."));
        // Cql3SSh2
        // eslint-disable-next-line
        Net.postRequest(appId+"/rest/hl/process" ,params , Type.jsonType,
            function (data) {
                dispatch(loading(false));
                dispatch(setProcsId(data));
            },function () {
                dispatch(loading(false));
            })
    }
    
}
