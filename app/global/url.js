export let Url={
    // 登录接口 (有密码)
    login:"/rest/admin/system/user/signin",
    // 登录接口 (无密码)
    facein:"/rest/admin/system/user/facein",
    // 获取机构列表接口
    instList:"/rest/admin/system/user/instlist",
    // 获取机构详情接口
    instInfo:"/rest/admin/system/user/index",
    // 模板列表接口
    modelList:"/rest/hl/process/templist",
    // 作业相关接口
    process:"/rest/hl/process",
    // 关系人相关接口
    client:"/rest/hl/process/client",
    // 联网核查接口
    netCheck:"/rest/pub/access/onlinecheck",
    // 准入接口
    netResult:"/rest/pub/access/result",
    // 拉取调查报告接口\
    invtreport:"/rest/hl/process/invtreport",
    // 查询提交对象列表接口
    searchList:"/rest/admin/system/sublink/searchlist",
    // 提交作业接口
    commitProcess:"/rest/hl/process2C3",
    // 查询作业下所有client列表
    clientList:"/rest/hl/process/clientlist",

    //贷款信息接口
    loan: "/rest/hl/process/loan",
    //用途信息接口
    house:"/rest/hl/process/house",
    //利率信息接口
    rate:"/rest/hl/process/acct",
    //押品列表信息接口
    assetList:"/rest/hl/process/assetlist",
    //押品信息接口
    asset:"/rest/hl/process/asset",
    //担保列表信息接口
    guarList:"/rest/hl/process/guarlist",
    //担保信息接口
    guar:"/rest/hl/process/guar",
    //下载申请表接口
    aplyForm:"/rest/hl/process/aplyform",
    // 上传图片接口
    uploadFile:"/file/upload",
    // 下载图片接口
    downloadFile:"/file/download",
    // 更新图片接口
    updateFile:"/file/update",
    // 删除图片接口
    deleteFile:"/file/delete",
    // 退出登录
    loginOut:"/rest/admin/system/user/signout",
    // 上传征信报告
    uploadPage:"/rest/pub/archive/uploadAuthReport",
    // 获取场景列表
    sceneList:"/rest/hl/process/scenelist"
}