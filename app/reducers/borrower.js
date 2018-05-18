let borrowerState={
    postSuccess:false,
    loanerInfo:{
        housesta:"",
        corpchar:"",
        busiscale:"",
        emptype:"",
        clicode:"",
        othflag:"",
        opdate:"",
        busiloanbal:"",
        opinstcode:"",
        corpflag:"",
        addrdist:"",
        othdebtbal:"",
        othincpm:"",
        carvalue:"",
        contact:"",
        qq:"",
        f21:"",
        f22:"",
        position:"",
        asssum:"",
        isrel:"",
        corpname:"",
        offsite:"",
        jobno:"",
        abcstuffflag:"",
        jobexp:"",
        clientId:"",
        corpdist:"",
        housevalue:"",
        reltype:"",
        title:"",
        parincpm:"",
        req_id:"",
        certtype:"",
        perclienttype:"",
        myselfincpm:"",
        engname:"",
        settledist:"",
        agrflag:"",
        jobyear:"",
        birthday:"",
        faxiprefix:"",
        othass:"",
        remark:"",
        stkvalue:"",
        msn:"",
        dutysta:"",
        f1:"",
        oprid:"",
        f2:"",
        postcode:"",
        f3:"",
        edulevel:"本科",
        f4:"",
        f5:"",
        f6:"",
        agflag:"",
        country:"",
        busista:"",
        othloanbal:"",
        pardebtexpd:"",
        email:"",
        myguaramt:"",
        depbal:"",
        f61:"",
        f62:"",
        sumexpend:"",
        cliname:"",
        manchar:"",
        hujidist:"",
        corpadd:"",
        addagrflag:"",
        careertype:"",
        settleaddr:"",
        teliprefix:"",
        gender:"",
        mobno:"",
        carloanbal:"",
        guaramt:"",
        degree:"",
        protexpd:"",
        f103:"",
        f105:"",
        orgcode:"",
        f106:"",
        f107:"",
        jobbegdate:"",
        debtsum:"",
        exppm:"",
        marrysta:"已婚",
        fendcent:"",
        certno:"",
        sumincpm:"",
        addr:"",
        corpstdtype:"",
        stdjobtype:"",
        cdobj:"",
        delflag:"",
        debtexpd:"",
        houseloanbal:"",
        hujiaddr:""
    },
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
        case "loaner":
            state.loanerInfo[action.key] = action.value;
            return{
                ...state
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


// 主页面字段
// cliname:"",//客户姓名
//
// settleaddr:"",//长期居住地地址
// corpname:"",//单位全称
// corpadd:"",//单位注册地址  // 单位地址
// myselfincpm:"",//本人年税后收入
// mobno:"",//手机号码
// certno:"",//证件号码
// marrysta:"已婚",//婚姻状况
//
//
//              //配偶税后年收入 暂无
// // 基本信息字段
// country:"",//国家/地区
// gender:"男",//性别
// birthday:"" , //出生日期
// housesta:"父母同住",//居住状况
//          // 本地居住年限  暂无
// addagrflag:"", // 长期居住地城乡属性
// // perclienttype:"",//人行涉农个人客户类别
// certtype:"",//证件类型
//              //是否长期有效 暂无
//             //证件有效终止日  暂无
//             //是否本地常住户口
//             //是否本地户籍
// abcstuffflag:"否",  //是否农行员工
//              //是否私人银行客户
//             //离婚证明登记日期
//
// //职业信息字段
// careertype:"公务员",//个人信贷对象
// title:"",//职称
//             //单位固定电话
// corpstdtype:"",//单位国标行业分类
// stdjobtype:"国家机关",//国标职业分类
// dutysta:"",//职务状况
//             // 职业经营类别
//
// //财务信息字段
// asssum:"" , //资产合计
// guaramt:"",//家庭对外担保额
// pardebtexpd:"",//配偶年债务性支出
// exppm:"",//家庭年其他收入
// debtsum:"",//负债合计
// debtexpd:"",//本人年债务性支出
// protexpd:"",//本人年生活保障支出
//
// //联系信息字段
// email:"",//电子邮箱
// teliprefix:"",//固定电话
//             //通信地址
//
// procsId:"",
// clientId:"",//客户唯一id
// _method:"",
// addr:"",   // 常用通信地址
// addrdist:"" ,// 常用通信地址区划
// agflag:"" ,// 预留字段  三农客户标志
// area:"" , //信息区块
//
//
// busiloanbal:"",//经营性贷款余额
// busiscale:"",//单位企业规模
// busista:"",//单位经营状况
//
// carloanbal:"",//车贷余额
// carvalue:"",//汽车价值
// cdobj:"",//信贷对象
//
//
//
// clicode:"",//客户ID
// clientId:"",//客户唯一id
//
// contact:"",//联系人
//
// corpdist:"",//单位注册地行政区划
// corpflag:"",//乡镇企业标志
//
//
//
//
//
// degree:"",//最高学位
// delflag:"",//删除标志
// depbal:"",//存款余额
//
//
//
// emptype:"",//乡镇企业供职关系
// engname:"",//英文姓名
//
// faxiprefix:"",//传真号码
//
//
//
// houseloanbal:"",//房贷余额
//
// housevalue:"",//房产价值
// hujiaddr:"",//户籍(学生家庭)详细地址
// hujidist:"",//户籍(学生家庭)地址区划
// jobbegdate:"",//本单位工作起始日期
// jobexp:"",//近3年工作经历
// jobno:"",//序号
// jobyear:"",//连修工作年限
// manchar:"",//管理特征
//
//
// msn:"",//MSN号码
// myguaramt:"",//本人非我行对外担保额
// offsite:"",//官方网址
// opdate:"",//操作日期
// opinstcode:"",//机构编码
// oprid:"",//操作员编码
// orgcode:"",//单位组织机构代码
// othass:"",//其他资产价值
// othdebtbal:"",//其他贷款余额
//
//
// position:"",//职业分类2
// postcode:"",//长期居住地邮政编码
// procsId:"",//作业Id
//
// qq:"",//qq号码
// relrole:"",//角色
// reltype:"",//关系人类型
// remark:"",//个性描述
// reqno:"",//
// settledist:"",//长期居住地区划
//
// stkvalue:"",//证券价值
// sumexpend:"",//家庭年支出合计
// sumincpm:"",//家庭年收入合计


