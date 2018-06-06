import {loadingText,loading} from "./login";
import {Type} from "../global/contact";
import Net from "../netRequest/mmspRequest"
import {Url} from "../global/url";

export function uploadFile(params ,success , fail) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("正在上传图片..."));
        Net.postFileRequest(Url.uploadFile , params , Type.jsonType , success, fail)
    }
}

export function downloadFile(params , success , fail) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("下载图片中..."));
        Net.getFileRequest(Url.downloadFile , params , success,fail)
    }
}

export function updateFile(params , success , fail) {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("更新图片中..."));
        Net.postFileRequest(Url.updateFile , params , Type.jsonType ,  success,fail)
    }
}

export function deleteFile(workId , groupId , success , fail) {
    return function (dispatch) {
        dispatch(loading(true));
        Net.deleteFileRequest(Url.deleteFile+"?workId="+workId +"&groupId="+groupId , "" , Type.formType , success ,fail);
    }
}

export function uploadPdf() {
    return function (dispatch) {
        dispatch(loading(true));
        dispatch(loadingText("上传档案信息..."));
        Net.getRequest("" , "" ,
            function (data) {

            },function () {

            },"upload")
    }
}