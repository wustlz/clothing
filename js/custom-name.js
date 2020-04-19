function reCss() {
    var nameHeight = $('.detail-name').height();
    for (var idx = 1; idx <= 6; idx++) {
        var masterElement = $('#name-master-height-' + idx.toString());
        var slaveElement = $('#name-slave-height-' + idx.toString());
        var height = masterElement.height();
        if (height < nameHeight) {
            height = nameHeight;
            masterElement.css("height", height);
        }
        masterElement.children('p').css("margin-top", (height - masterElement.children('p').height()) / 2 + 5);
        slaveElement.css("height", height);
        slaveElement.children('p').css("margin-top", (height - slaveElement.children('p').height()) / 2 + 5);
    }
}

$(function () {
    reCss()
});

$(window).resize(function () {
    reCss();
});