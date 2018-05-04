// JS浮点数运算Bug的解决办法
// ACC（Accumulator）是累加器A缩写。

var pow = function pow(x) {
  return Math.pow(10, x);
};

export function accAdd(arg1, arg2) {
  var r1 = void 0;var r2 = void 0;
  //  let m;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  var m = pow(Math.max(r1, r2));
  // const m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}

export function accSub(arg1, arg2) {
  var r1 = void 0;
  var r2 = void 0;
  // let m;
  // const n;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  var m = pow(Math.max(r1, r2));
  // const m = Math.pow(10, Math.max(r1, r2));
  // 动态控制精度长度
  var n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}