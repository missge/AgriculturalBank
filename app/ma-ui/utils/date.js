// 判断是否为日期
export var isDate = function isDate(date) {
  return new Date(date).toString() !== 'Invalid Date' && !isNaN(new Date(date));
};

// 判断是否为正确的时间格式
// 15:21:21 = true
// 15:21 = true
export var isDateTime = function isDateTime(timeStr) {
  return (/^([01][0-9]|[2][0-3]):([0-5][0-9])(?::([0-5][0-9])(\.\d{1,3})?)?$/.test(timeStr)
  );
};

// Defining patterns
var replaceChars = {
  // Day
  d: function d() {
    var d = this.getDate();return (d < 10 ? '0' : '') + d;
  },
  D: function D() {
    return Date.shortDays[this.getDay()];
  },
  j: function j() {
    return this.getDate();
  },
  l: function l() {
    return Date.longDays[this.getDay()];
  },
  N: function N() {
    var N = this.getDay();return N === 0 ? 7 : N;
  },
  S: function S() {
    var S = this.getDate();
    if (S % 10 === 1 && S !== 11) {
      return 'st';
    }
    if (S % 10 === 2 && S !== 12) {
      return 'nd';
    }
    if (S % 10 === 3 && S !== 13) {
      return 'rd';
    }
    return 'th';
    // return (S % 10 === 1 && S !== 11 ? 'st' : (S % 10 === 2 && S !== 12 ? 'nd' : (S % 10 === 3 && S !== 13 ? 'rd' : 'th')));
  },
  w: function w() {
    return this.getDay();
  },
  z: function z() {
    var d = new Date(this.getFullYear(), 0, 1);return Math.ceil((this - d) / 86400000);
  },

  // Week
  W: function W() {
    var target = new Date(this.valueOf());
    var dayNr = (this.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    var firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + (4 - target.getDay() + 7) % 7);
    }
    var retVal = 1 + Math.ceil((firstThursday - target) / 604800000);

    return retVal < 10 ? '0' + retVal : retVal;
  },

  // Month
  F: function F() {
    return Date.longMonths[this.getMonth()];
  },
  m: function m() {
    var m = this.getMonth();return (m < 9 ? '0' : '') + (m + 1);
  },
  M: function M() {
    return Date.shortMonths[this.getMonth()];
  },
  n: function n() {
    return this.getMonth() + 1;
  },
  t: function t() {
    var year = this.getFullYear();
    var nextMonth = this.getMonth() + 1;
    if (nextMonth === 12) {
      // year = year++;
      year += 1;
      nextMonth = 0;
    }
    return new Date(year, nextMonth, 0).getDate();
  },

  // Year
  L: function L() {
    var L = this.getFullYear();return L % 400 === 0 || L % 100 !== 0 && L % 4 === 0;
  },
  o: function o() {
    var d = new Date(this.valueOf());
    d.setDate(d.getDate() - (this.getDay() + 6) % 7 + 3);
    return d.getFullYear();
  },
  Y: function Y() {
    return this.getFullYear();
  },
  y: function y() {
    return ('' + this.getFullYear()).substr(2);
  },

  // Time
  a: function a() {
    return this.getHours() < 12 ? 'am' : 'pm';
  },
  A: function A() {
    return this.getHours() < 12 ? 'AM' : 'PM';
  },
  B: function B() {
    return Math.floor(((this.getUTCHours() + 1) % 24 + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24);
  },
  g: function g() {
    return this.getHours() % 12 || 12;
  },
  G: function G() {
    return this.getHours();
  },
  h: function h() {
    var h = this.getHours();return ((h % 12 || 12) < 10 ? '0' : '') + (h % 12 || 12);
  },
  H: function H() {
    var H = this.getHours();return (H < 10 ? '0' : '') + H;
  },
  i: function i() {
    var i = this.getMinutes();return (i < 10 ? '0' : '') + i;
  },
  s: function s() {
    var s = this.getSeconds();return (s < 10 ? '0' : '') + s;
  },
  v: function v() {
    var v = this.getMilliseconds();
    if (v < 10) {
      return '00';
    }
    return (v < 100 ? '0' : '') + v;
  },

  // Timezone
  e: function e() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  },
  I: function I() {
    var DST = null;
    for (var i = 0; i < 12; i += 1) {
      var d = new Date(this.getFullYear(), i, 1);
      var offset = d.getTimezoneOffset();

      if (DST === null) DST = offset;else if (offset < DST) {
        DST = offset;break;
      } else if (offset > DST) break;
    }
    return this.getTimezoneOffset() === DST || 0;
  },
  O: function O() {
    var O = this.getTimezoneOffset();return (-O < 0 ? '-' : '+') + (Math.abs(O / 60) < 10 ? '0' : '') + Math.floor(Math.abs(O / 60)) + (Math.abs(O % 60) === 0 ? '00' : (Math.abs(O % 60) < 10 ? '0' : '') + Math.abs(O % 60));
  },
  P: function P() {
    var P = this.getTimezoneOffset();
    return '' + (-P < 0 ? '-' : '+') + (Math.abs(P / 60) < 10 ? '0' : '') + Math.floor(Math.abs(P / 60)) + ':' + (Math.abs(P % 60) < 10 ? '0' : '') + Math.abs(P % 60);
    // return (-P < 0 ? '-' : '+') + (Math.abs(P / 60) < 10 ? '0' : '') + Math.floor(Math.abs(P / 60)) + ':' + (Math.abs(P % 60) === 0 ? '00' : ((Math.abs(P % 60) < 10 ? '0' : '')) + (Math.abs(P % 60)));
  },
  T: function T() {
    var tz = this.toLocaleTimeString(navigator.language, { timeZoneName: 'short' }).split(' ');return tz[tz.length - 1];
  },
  Z: function Z() {
    return -this.getTimezoneOffset() * 60;
  },

  // Full Date/Time
  c: function c() {
    return this.format('Y-m-d\\TH:i:sP');
  },
  r: function r() {
    return this.toString();
  },
  U: function U() {
    return this.getTime() / 1000;
  }
};
/**
 *
 * formatDate('d-m-Y',new Date('26/11/2017')); // Outputs "26-11-2017"
 * formatDate('d-m-Y H:i:s'); // Outputs "26-11-2017 15:24:30"
 * formatDate('M jS, Y'); // Outputs "Nov 26th, 2017"
 * formatDate('\\T\\o\\d\\a\\y \\i\\s d-m-Y'); // Outputs "Today is 26-11-2017"
 * https://github.com/jacwright/date.format/blob/master/date.format.js
 * @param {*} date
 * @param {*} formatStr
 */
export function formatDate(formatStr, date) {
  date = isDate(date) ? new Date(date) : new Date();
  return formatStr.replace(/(\\?)(.)/g, function (_, esc, chr) {
    return esc === '' && replaceChars[chr] ? replaceChars[chr].call(date) : chr;
  });
}

// 是否为闰年
export var isLeapYear = function isLeapYear(year) {
  if (year % 4 === 0 && year % 100 !== 0) return true;else if (year % 400 === 0) return true;
  return false;
};