var appId = "";
var baseUrl="";
let baseUrlNative={
    url:"http://219.142.79.229:8989/mmsp-ps"
};
export{
    baseUrl
}
export{
    appId
}
export function setAppId(data){
    appId = data;
    baseUrl={
        url:'http://219.142.79.229:8989/mmsp-ps/forward/' + appId,
        // url:'http://10.233.12.54:8080/mmsp-ps/forward/',
    };
}
export {
    baseUrlNative
}
