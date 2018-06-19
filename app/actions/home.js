/**
 * Created by Liumengxuan on 2018/3/2.
 */

//这个叫做action，用于更新reduer中的state
export const showIdCard = (data) => ({
    type: 'READ_ID_CARD',
    readIdCard: data
})
export const setCardName = (data)=>({
    type:"certName",
    value:data
})
export const setCardNum = (data)=>({
    type:"certNo",
    value:data
})
export const changeName = (data) => ({
    type: 'Name',
    instName: data
})
export const setInstCode = (data)=>({
    type:"Code",
    instCode:data
})
export const pageSelected=(data)=>({
    type:"selected",
    value:data
})
export const showText = (data) => ({
    type: 'LoadingText',
    value: data
})
export const showLoading = (data) => ({
    type: 'Loading',
    value: data
})
export const setOptKind = (data)=>({
    type:"optKind",
    value:data
})
