export default function watermark(settings) {  
    //默认设置  
    var defaultSettings={  
        watermark_img:"text",//根据本业务需求  有两行，第一行是图片  
        watermark_txt0:"text",  
        watermark_x:80,//水印起始位置x轴坐标  
        watermark_y:130,//水印起始位置Y轴坐标  
        watermark_rows:3,//水印行数  
        watermark_cols:4,//水印列数  
        watermark_x_space:30,//水印x轴间隔  
        watermark_y_space:150,//水印y轴间隔  
        watermark_color:'rgba(0,0,0,0.1)',//水印字体颜色  
        watermark_alpha:1,//水印透明度  
        watermark_fontsize:'20px',//水印字体大小  
        watermark_font:'微软雅黑',//水印字体  
        watermark_width:210,//水印宽度  
        watermark_height:120,//水印高度  
        watermark_angle:45,//水印倾斜度数  
        watermark_root:null,//
        watermark_z_index:9999,//水印深度
    };  
    //采用配置项替换默认值，作用类似jquery.extend  
    if(arguments.length===1&&typeof arguments[0] ==="object" )  
    {  
        var src=arguments[0]||{};  
        let key;
        for(key in src)  
        {  
            if(src[key]&&defaultSettings[key]&&src[key]===defaultSettings[key])  
                continue;  
            else if(src[key])  
                defaultSettings[key]=src[key];  
        }  
    }  
  
    var oTemp = document.createDocumentFragment();  
  
    //获取页面最大宽度  
    // var page_width = Math.max(document.body.scrollWidth,document.body.clientWidth);  
    var page_width = window.innerWidth;  
    // var cutWidth = page_width*0.0150;  
    // var page_width=page_width-cutWidth;  
    //获取页面最大高度  
    //var page_height = Math.max(document.body.scrollHeight,document.body.clientHeight)+450;  
    var page_height = window.innerHeight;  
    // var page_height = document.body.scrollHeight+document.body.scrollTop;  
    //如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔  
    // if (defaultSettings.watermark_cols == 0 || (parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width *defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) > page_width)) {  
    //     defaultSettings.watermark_cols = parseInt((page_width-defaultSettings.watermark_x+defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space));  
    //     defaultSettings.watermark_x_space = parseInt((page_width - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1));  
    // }  
    defaultSettings.watermark_x_space = parseInt((page_width - defaultSettings.watermark_x-defaultSettings.watermark_width * defaultSettings.watermark_cols+0.707/2*defaultSettings.watermark_width) / (defaultSettings.watermark_cols-1));  
    //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔  
   // if (defaultSettings.watermark_rows == 0 || (parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) > page_height)) {  
       // defaultSettings.watermark_rows = parseInt((defaultSettings.watermark_y_space + page_height - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space));  
        // defaultSettings.watermark_y_space = parseInt(((page_height - defaultSettings.watermark_y) - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1));  
    // }  
    defaultSettings.watermark_y_space = parseInt(((page_height - defaultSettings.watermark_y) - defaultSettings.watermark_height * defaultSettings.watermark_rows-0.707/2*defaultSettings.watermark_width) / (defaultSettings.watermark_rows-1));  
    var x;  
    var y;  
    for (var i = 0; i < defaultSettings.watermark_rows; i++) {  
        y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space +defaultSettings.watermark_height) * i;  
        for (var j = 0; j < defaultSettings.watermark_cols; j++) {  
            x = defaultSettings.watermark_x + (0.7*defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;  
  
            var mask_div = document.createElement('div');  
            mask_div.id = 'mask_div' + i + j;  
            mask_div.className = 'mask_div';  
            ///三个节点  
            var span0 = document.createElement('div');  
            var span0i = document.createElement('img');
            span0i.src=`${require("../../../images/logo_watermark.png")}`;
            span0i.style.width='100%';
            span0.appendChild(span0i);
            var span1 = document.createElement('div');  
            span1.appendChild(document.createTextNode(defaultSettings.watermark_txt0));   
            mask_div.appendChild(span0);  
            mask_div.appendChild(span1);
            //设置水印div倾斜显示  
            mask_div.style.webkitTransform = "rotate(" + defaultSettings.watermark_angle + "deg)";  
            mask_div.style.MozTransform = "rotate(" + defaultSettings.watermark_angle + "deg)";  
            mask_div.style.msTransform = "rotate(" + defaultSettings.watermark_angle + "deg)";  
            mask_div.style.OTransform = "rotate(" + defaultSettings.watermark_angle + "deg)";  
            mask_div.style.transform = "rotate(" + defaultSettings.watermark_angle + "deg)";  
            mask_div.style.visibility = "";  
            mask_div.style.position = "absolute";  
            mask_div.style.left = x + 'px';  
            mask_div.style.top = y + 'px';  
            mask_div.style.overflow = "hidden";  
            mask_div.style.zIndex = defaultSettings.watermark_z_index;  
            mask_div.style.pointerEvents='none';//pointer-events:none  让水印不遮挡页面的点击事件  
            //mask_div.style.border="solid #eee 1px";  
            mask_div.style.opacity = defaultSettings.watermark_alpha;  
            mask_div.style.fontSize = defaultSettings.watermark_fontsize;  
            mask_div.style.fontFamily = defaultSettings.watermark_font;  
            mask_div.style.color = defaultSettings.watermark_color;  
            mask_div.style.textAlign = "center";  
            mask_div.style.width = defaultSettings.watermark_width + 'px';  
            mask_div.style.height = defaultSettings.watermark_height + 'px';  
            mask_div.style.display = "block";  
            oTemp.appendChild(mask_div);  
        };  
    };  
    defaultSettings.watermark_root?defaultSettings.watermark_root.appendChild(oTemp):document.body.appendChild(oTemp);  
}  
  
//对Date的扩展，将 Date 转化为指定格式的String  
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，  
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)  
//例子：  
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423  
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18  
//author: meizz  
Date.prototype.Format = function (fmt) {   
var o = {  
"M+": this.getMonth() + 1, //月份  
"d+": this.getDate(), //日  
"h+": this.getHours(), //小时  
"m+": this.getMinutes(), //分  
"s+": this.getSeconds(), //秒  
"q+": Math.floor((this.getMonth() + 3) / 3), //季度  
"S": this.getMilliseconds() //毫秒  
};  
if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
for (var k in o)  
if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
return fmt;  
}  
function getTime(){  
    return new Date().Format("yyyy年MM月dd日 hh:mm:ss");  
}  
