import {clearLoan} from "../actions/loan";

let loanState = {
  /*  loadingLoan: false,
    loadingLoanText: "",*/
    postLoan: false,
    loanData: "",
    rateData: "",
    houseData: "",
    assetData: "",
    guarData: "",
    formUrl:"",
    clearLoan:"",
    //   loanLoanData:'',
    //贷款信息
    loanInfo: {
        loansum: '',//贷款金额
        firstpaysum: '',//首付金额
        loanterm: '',//贷款期限
        price: '',//房屋交易总价
        isfund: '是',//是否公积金组合
        cobreno: '',//合作品种编号
        coprjname: '',//合作项目名称
        firstpayrate: '',//首付款比例
        fundno: '',//公积金网点号
        fundcontno: '',//公积金贷款相关合同编号
        loanusekind: '购买住房',//贷款用途
        charkind: '自营常规贷款',//贷款性质
        spepdct: '',//特色产品
        iscredit: '是',//是否信用方式
        account1: '', //     还款结算账号一
        payeedepacc: '',//     收款人账号
        payeename: '',//     收款人户名
        req_id: ''
    },
    //担保信息
    guarInfo: {
        guarcode: '',//保证人代码
        //   guaranteeID:'',//担保人ID
        guarname: '',//担保人名称
        guarway: '',//拟定担保方式
        isphase: '',//是否阶段性担保
        req_id: '', //作业Id
        guar_type: '01',
        //    guarcalway:'',//担保能力测算方法
        //    guarsum:'',//可用担保额度（原型）与担保额度
    },
    //贷款房屋信息
    houseInfo: {
        dlpname: '',//开发商名称
        bldname: '',//楼盘名称
        sellno: '',//销
        bhusaim: '',//购房目的
        housesum: '',//本套房屋属于第几套
        hustype: '',//房屋类型
        husform: '',//房屋形式
        buildyear: '',//房屋建造年份
        husloclinfo: '',//房贷结清情况
        ishired: '',//房屋是否已经出租
        req_id: ''
    },
    //利率信息
    rateInfo: {
        execrate: '',//执行利率
        isgetbreaksum: '',//是否收取提前还款违约金
        repaykind: '',//还款类型
        adjrateflag: '',//利率浮动周期
        floatrange: '',//利率浮动幅度
        houseexp: '',//每月房屋其他费用支出（单位：元）
        execratekind: '',//执行利率类别
        req_id: ''
    },
    //利率信息与原型 不一致的2个字段
    // monHousPay:'',//每月房屋费用支出
    // f_ratePol:'',//执行利率政策

    //押品信息
    asstInfo: {
        buildarea: '',//房屋建筑面积
        houseaddr: '',//详细地址
        assttype: '',//押品分类
        asstname: '',//押品名称
        houseusage: '',//房屋实际用途
        landgetmetho: '',//土地取得方式
        ownercode: '',//产权人客户代码
        archstruc: '',//建筑结构
        landusage: '',//土地用途
        evaldate: '',//评估基准日
        confval: '',//确认价值
        evalmethod: '',//评估结果来源
        evalmeth1: '',//评估方法1
        evalname2: '',//评估师姓名2
        evalval: '',//评估价值
        validdate: '',//评估有效期到期日
        evalinst: '',//外部评估机构代码
        evalname1: '',//评估师姓名1
        ownerprop: '',//产权份额
        ownershiptype: '',//产权类型
        archusage: '',//建筑物规划用途
        req_id: '',//作业Id
    },
}

export function loan(state = loanState, action = {}) {
    switch (action.type) {
        case "postLoan":
            return {
                ...state,
                postLoan: action.value
            }
        case "loanData":
            return {
                ...state,
                loansum: action.value.loansum,
                firstpaysum: action.value.firstpaysum,
                loanterm: action.value.loanterm,
                price: action.value.price,
                isfund: action.value.isfund,
                cobreno: action.value.cobreno,
                coprjname: action.value.coprjname,
                firstpayrate: action.value.firstpayrate,
                fundno: action.value.fundno,
                fundcontno: action.value.fundcontno,
                loanusekind: action.value.loanusekind,
                charkind: action.value.charkind,
                spepdct: action.value.spepdct,
                iscredit: action.value.iscredit,
                account1: action.value.account1,
                payeedepacc: action.value.payeedepacc,
                payeename: action.value.payeename,
                req_id: action.value.req_id
            }
        case "rateData":
            return {
                ...state,
                execrate: action.value.execrate,
                isgetbreaksum: action.value.isgetbreaksum,
                repaykind: action.value.repaykind,
                adjrateflag: action.value.adjrateflag,
                floatrange: action.value.floatrange,
                houseexp: action.value.houseexp,
                execratekind: action.value.execratekind,
                req_id: action.value.req_id
            }
        case "houseData":
            return {
                ...state,
                dlpname: action.value.dlpname,
                bldname: action.value.bldname,
                sellno: action.value.sellno,
                bhusaim: action.value.bhusaim,
                housesum: action.value.housesum,
                hustype: action.value.hustype,
                husform: action.value.husform,
                buildyear: action.value.buildyear,
                husloclinfo: action.value.husloclinfo,
                ishired: action.value.ishired,
                req_id: action.value.req_id,
            }
        case "assetData":
            return {
                ...state,
                buildarea: action.value.buildarea,
                houseaddr: action.value.houseaddr,
                assttype: action.value.assttype,
                asstname: action.value.asstname,
                houseusage: action.value.houseusage,
                landgetmetho: action.value.landgetmetho,
                ownercode: action.value.ownercode,
                archstruc: action.value.archstruc,
                landusage: action.value.landusage,
                evaldate: action.value.evaldate,
                confval: action.value.confval,
                evalmethod: action.value.evalmethod,
                evalmeth1: action.value.evalmeth1,
                evalname2: action.value.evalname2,
                evalval: action.value.evalval,
                validdate: action.value.validdate,
                evalinst: action.value.evalinst,
                evalname1: action.value.evalname1,
                ownerprop: action.value.ownerprop,
                ownershiptype: action.value.ownershiptype,
                archusage: action.value.archusage,
                req_id: action.value.req_id,
            }
        case "guarData":
            return {
                ...state,
                guarcode: action.value.guarcode,
                guarname: action.value.guarname,
                guarway: action.value.guarway,
                isphase: action.value.isphase,
                req_id: action.value.req_id,
                guar_type: action.value.guar_type,
            }
        case "formUrl":
            return {
                ...state,
                formUrl: action.value
            }
        case "clearLoan":
            return {
                ...state,
                loanInfo: action.value,
                guarInfo: action.value,
                houseInfo: action.value,
                rateInfo: action.value,
                asstInfo: action.value,
            }
        default:
            return {...state}
    }
}