/**
 * Created by Liumengxuan on 2018/3/2.
 */

//这个叫做action，用于更新reduer中的state
export const showIdCard = (data) => ({
    type: 'READ_ID_CARD',
    readIdCard: data
})
export const changeName = (data) => ({
    type: 'Name',
    instName: data
})
export const showText = (data) => ({
    type: 'LoadingText',
    value: data
})
export const showLoading = (data) => ({
    type: 'Loading',
    value: data
})