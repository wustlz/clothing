$(document).ready(function () {
    // 请求novel数据
    $.ajax({
        url: "https://name.iamchineseculture.com:8092/v1/blog/list",
        type: "POST",
        data: {
            type: 'novel'
        },
        dataType: 'json',
        cache: false,
        success: function (data) {
            // console.log(data);
            if (data.returnCode === 0) {
                let novel = data.body;
                $('.main-title').html(novel.mainNovel.title);
                $('.main-brief').html(novel.mainNovel.brief);
                $('.main-href-id').attr('href', 'blog_detail.html?type=novel&id=' + novel.mainNovel.id);
                $('.novel-latest-img').attr('src', novel.mainNovel.picUrl);
                // detail list
                let htmlStr = '';
                $.each(novel.novels, function (index, value) {
                    let tmp = '<div class="col-md-6"><div class="novel-box"><div class="row">';
                    tmp += '<img src="' + value.picUrl + '" alt="Chinese Novel"></div>';
                    tmp += '<div class="row"><h2>' + value.title + '</h2>';
                    tmp += '<p>' + value.brief + '</p>';
                    tmp += '<a class="btn btn-info btn-novel" href="blog_detail.html?id=' + value.id + '">More</a>';
                    tmp += '</div></div></div>';
                    htmlStr += tmp;
                });
                $('.novel-list').html(htmlStr);
            } else {
                alert(data.returnMsg);
            }
        },
        error: function () {
            alert("Sorry, it seems that my server is not responding. Please try again later!");
        },
    });
});