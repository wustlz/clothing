$(document).ready(function () {
    let str = window.location.search;
    console.log(str);
    let novel_id = -1;
    let novel_type = '';
    let idIdx = str.indexOf('id');
    let typeIdx = str.indexOf('type');
    novel_id = parseInt(str.substr(idIdx+3));
    novel_type = str.substr(typeIdx+5, idIdx - typeIdx - 6);
    // console.log(idIdx, novel_id, novel_type);
    if (novel_id === -1) {
        window.location.replace("index.html");
    }

    // post请求到后台
    $.ajax({
        url: "https://name.iamchineseculture.com/v1/blog/detail",
        type: "POST",
        data: {
            type: novel_type,
            id: novel_id
        },
        dataType: 'json',
        cache: false,
        success: function (data) {
            // console.log(data);
            if (data.returnCode === 0) {
                let novel = data.body;
                $('.novel-detail-img').attr('src', novel.picUrl);
                $('.novel-title').html(novel.title);
                $('.novel-detail-date').html(novel.publishDate);
                $('.novel-detail-hot>span').eq(1).html(novel.hot);
                $('.novel-author').html(novel.author);
                $('.novel-content').html(novel.content);
                $('.novel-tag>span').html(novel.tags);
                $('.novel-pre').html(novel.preTitle);
                $('.novel-pre').attr('href', 'blog_detail.html?id=' + novel.preId);
                $('.novel-next').html(novel.nextTitle);
                $('.novel-next').attr('href', 'blog_detail.html?id=' + novel.nextId);
            } else {
                alert(data.returnMsg);
            }
        },
        error: function () {
            alert("Sorry, it seems that my server is not responding. Please try again later!");
        },
    });
});