import {baseUrl} from '../global/net'
var base;
class mmspRequest{
    constructor() {

    }

    jsonToGetRequest(data){
        var getRequest='?';
        if(data) {
            for (var key in data) {
                getRequest+=(key+'='+data[key]);
                getRequest+='&';
            }
            getRequest=getRequest.substring(0,getRequest.length-1);
            return getRequest;
        }else return '';

    }
    getRequest(url,data,success,error){
        // eslint-disable-next-line
        mmspc.nativeRequest.init();
        let mUrl=url+this.jsonToGetRequest(data);
        try{
            base = baseUrl.url;
            // eslint-disable-next-line
            mmspc.nativeRequest.get(base+mUrl,success,error);
        }catch(e){
            alert(e);
            error();
        }
    }
    postRequest(url,data,type,success,error){
        // eslint-disable-next-line
        mmspc.nativeRequest.init();
        try{
            base = baseUrl.url;
            // eslint-disable-next-line
            mmspc.nativeRequest.post(base+url,data,type,success,error);
        }catch(e){
            alert(e);
            error();
        }
    }

}
export default new mmspRequest();