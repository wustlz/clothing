$(document).ready(function () {
    let str = window.location.search;
    let idx = str.indexOf('id');
    if (idx === -1) {
        window.location.replace("index.html");
    }
    // post请求到后台
});