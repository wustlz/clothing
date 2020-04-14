
var lan = "en";

$.ready(function () {
    // alert("页面加载时调用的方法");
    lan = $.i18n.normaliseLanguageCode({}); //获取浏览器的语言
    if (lan !== 'zh') {
        lan = 'en';
    }
    loadProperties(lan);
});

function changeLanguage() {
    lan_text = $('.data-i18n-lan').text();
    if (lan_text === '切换中文') {
        lan = 'zh';
    } else {
        lan = 'en';
    }
    loadProperties(lan);
}

function loadProperties(type) {
    $.i18n.properties({
        name: 'clothing', // 资源文件名称
        language: type, // 对应的语言
        path: '/i18n/resource/', // 资源文件所在目录路径
        mode: 'map', // 模式：变量或 Map
        cache: false,
        encoding: 'UTF-8',
        callback: function () { // 回调方法
            $.each($.i18n.map, function (key, value) {
                $('.'+key).html($.i18n.prop(key));
            });
        }
    });
}
