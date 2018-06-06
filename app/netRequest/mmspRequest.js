import {baseUrl, baseUrlNative} from '../global/net'
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
    getRequest(url,data,success,error,type){
        // eslint-disable-next-line
        mmspc.nativeRequest.init();
        try{
            if ("download"==type){
                type = "download";
                // eslint-disable-next-line
                mmspc.nativeRequest.get(url,success,error,data ,type);
            } else if ("upload"==type){
                type = "upload";
                // eslint-disable-next-line
                mmspc.nativeRequest.get(url,success,error,data ,type);
            } else {
                type = "get";
                let mUrl=url+this.jsonToGetRequest(data);
                base = baseUrl.url;
                // eslint-disable-next-line
                mmspc.nativeRequest.get(base+mUrl,success,error,data ,type);
            }

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

    putRequest(url,data,type,success,error){
        // eslint-disable-next-line
        mmspc.nativeRequest.init();
        try{
            base = baseUrl.url;
            // eslint-disable-next-line
            mmspc.nativeRequest.put(base+url,data,type,success,error);
        }catch(e){
            alert(e);
            error();
        }
    }

    postFileRequest(url,data,type,success,error){
        // eslint-disable-next-line
        mmspc.nativeRequest.init();
        try{
            base = baseUrlNative.url;
            // eslint-disable-next-line
            mmspc.nativeRequest.post(base+url,data,type,success,error);
        }catch(e){
            alert(e);
            error();
        }
    }
    getFileRequest(url,data,success,error,type){
        // eslint-disable-next-line
        mmspc.nativeRequest.init();
        try{
            if ("download"==type){
                type = "download";
                // eslint-disable-next-line
                mmspc.nativeRequest.get(url,success,error,data ,type);
            } else {
                type = "get";
                let mUrl=url+this.jsonToGetRequest(data);
                base = baseUrlNative.url;
                // eslint-disable-next-line
                mmspc.nativeRequest.get(base+mUrl,success,error,data ,type);
            }

        }catch(e){
            alert(e);
            error();
        }
    }

    deleteFileRequest(url,data,type,success,error){
        // eslint-disable-next-line
        mmspc.nativeRequest.init();
        try{
            base = baseUrlNative.url;
            // eslint-disable-next-line
            mmspc.nativeRequest.del(base+url,data,type,success,error);
        }catch(e){
            alert(e);
            error();
        }
    }
    deleteRequest(url,data,type,success,error){
        // eslint-disable-next-line
        mmspc.nativeRequest.init();
        try{
            base = baseUrl.url;
            // eslint-disable-next-line
            mmspc.nativeRequest.del(base+url,data,type,success,error);
        }catch(e){
            alert(e);
            error();
        }
    }

}
export default new mmspRequest();