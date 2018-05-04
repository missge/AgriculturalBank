export function unshiftArrs (arr,selectTypes,callback,showLength) {
    console.log(arr)
    let oldI=''
    arr.map((item,i)=>{
        if(item==selectTypes){
            oldI=i
        }
        console.log(showLength)
        if(oldI>showLength){

            removeByValue(arr,selectTypes)
            arr.unshift(selectTypes)
            callback(selectTypes);
            console.log(arr)
        }
    })

};

function removeByValue(arr, val) {
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}

// var a = [1,4,6,43,5,9,0,23,45];
//替换当前位置
function  seatChange(arr,k,j) {
    var c = arr[k];
    arr[k] = arr[j];
    arr[j] = c;
    console.log(arr);
}
// console.log(a.length);
// change(a,3,a.length-1);


