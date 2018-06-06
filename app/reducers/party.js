import {relaCounting} from "../actions/party";

let initData={
    //是否显示新建联系人 
    showNewContact:false,
    //列表的数据
    partyDataList:[],
    // 请求失败
    getPartyFail:'',
    // 联网核查
    netCheck:false,
    getclientId:'',
    //是否查询过
    isQuery:false,
    //计算关系人人数
    relaCounting:'',
    form:{
        isrel:'',//是否共同借款人
        edulevel:'',//文化程度
        mobno:'',//手机号码
        parincpm:'',//配偶年税后收入,
        reltype:'',// 关系人类型
        marrysta:'',//婚姻状况
        myselfincpm:'',//本人年税后收入
        /****基本信息******/
        country:'',//国家/地区
        certtype :'',//证件类型
        gender :'',//性别
        isLong:'',//----------是否长期有效
        birthday:'',//出生日期
        isbirthday:'',//-------------证件有效终止日
        isLocal:'',//---------是否本地常住户口
        housesta:'',//居住状况
        hjdz:'', //--------------是否本地户籍
        abcstuffflag:'',//是否为农行员工
        isyhzh:'',//-------------是否私人银行客户
         bdzjnx:'', //--------------本地居住年限
        // isGtjhr:'', //--------是否有共同借款人
        addagrflag :'',//长期居住地城乡属性
        settleaddr :'',//长期居住地地址,
        perclienttype:'',//人行涉农个人客户类别
        /****职业信息******/
        corpname:'' ,//单位全称
        corpchar:'',//单位性质
        dwdz:'',//-------------单位地址
        title:'',//职称
        dutysta:'',//职务状况
        dwgddh:'',  //----------------单位固定电话
        dutysta:'',//职务状况 
        manageRadio :'',// -----------职业经营类别
        corpstdtype:'',//单位国标行业分类 
        stdjobtype:'',//国标职业分类
        careertype:'',//个人信贷对象 
        /****财务信息******/
        asssum:'',//资产合计 ,
        guaramt:'',//家庭对外担保额 
        debtexpd:'',//本人年债务性支出 
        pardebtexpd:'',//配偶年债务性支出
        debtsum:'',//负债合计 
        othincpm:'',//家庭其他年收入
        protexpd:'',//本人年生活保障支出 
        /****联系人信息******/
        addr:'',//常用通信地址
        email:'',//电子邮箱
        teliprefix:'',//固定电话
        req_id:'',
        clientId:''

    },
}

export function partyData(state=initData , action={}) {
    switch (action.type){
        case "partySuccess":
            return{
                ...state,
                partyDataList:action.value
            }
        case "partyFail":
            return{
                ...state,
                getPartyFail:action.value
            }
        case "isShowNewContact":
            return{
                ...state,
                showNewContact:action.value
            }
        case "partyFormData":

            return {
                ...state,
                form:action.value
            }
        case "partyClientId":
            return {
                ...state,
                getclientId:action.value                
            }
        case "judgeIsQuery":
            return {
                ...state,
                isQuery:action.value
            }
        case "relaCounting":
            return {
                ...state,
                relaCounting:action.value
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

let relateData={
    relateId:''
}

export function relate(state=relateData ,action={}){
    switch(action.type){
        case "relateId":
            return {
                ...state,
                relateId:action.value
            }
        default:
            return{...state}
    }
}