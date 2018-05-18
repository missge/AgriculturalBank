let initData={
    //是否显示新建联系人 
    showNewContact:false,
    //列表的数据
    partyDataList:[],
    // 请求失败
    getPartyFail:'',
    getclientId:'',
    //是否查询过
    isQuery:false,
    form:{
        isrel:'否',//是否共同借款人
        edulevel:'小学',//文化程度
        mobno:'',//手机号码
        parincpm:'',//配偶年税后收入,
        reltype:'夫',// 关系人类型
        marrysta:'已婚',//婚姻状况
        myselfincpm:'',//本人年税后收入
        /****基本信息******/
        country:'',//国家/地区
        certtype :'',//证件类型
        gender :'男',//性别
        isLong:'否',//----------是否长期有效
        birthday:'',//出生日期
        isbirthday:'',//-------------证件有效终止日
        isLocal:'是',//---------是否本地常住户口
        housesta:'自有住房有按揭或抵押',//居住状况
        hjdz:'', //--------------是否本地户籍
        abcstuffflag:'否',//是否为农行员工
        isyhzh:'否',//-------------是否私人银行客户
         bdzjnx:'', //--------------本地居住年限
        // isGtjhr:'', //--------是否有共同借款人
        addagrflag :'城市',//长期居住地城乡属性
        settleaddr :'',//长期居住地地址,
        perclienttype:'非农户',//人行涉农个人客户类别
        /****职业信息******/
        corpname:'' ,//单位全称
        corpchar:'国资委或省国资委直属企业',//单位性质 
        dwdz:'',//-------------单位地址
        title:'其他',//职称
        dutysta:'其他',//职务状况 
        dwgddh:'',  //----------------单位固定电话
        dutysta:'',//职务状况 
        manageRadio :'工薪供职',// -----------职业经营类别
        corpstdtype:'',//单位国标行业分类 
        stdjobtype:'其他',//国标职业分类 
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
        addr:'居住地址',//常用通信地址
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
    }
}