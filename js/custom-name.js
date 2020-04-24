function reCss() {
    var nameHeight = $('.detail-name').height();
    for (var idx = 0; idx <= 6; idx++) {
        var masterElement = $('#name-master-height-' + idx.toString());
        var slaveElement = $('#name-slave-height-' + idx.toString());
        var slaveHeight = slaveElement.height();
        var height = masterElement.height();
        if (height < slaveHeight) {
            height = slaveHeight;
            masterElement = $('#name-slave-height-' + idx.toString());
            slaveElement = $('#name-master-height-' + idx.toString());
        }
        if (height < nameHeight) {
            height = nameHeight;
            masterElement.css("height", height);
        }
        masterElement.children('p').css("margin-top", (height - masterElement.children('p').height()) / 2 + 5);
        slaveElement.css("height", height);
        slaveElement.children('p').css("margin-top", (height - slaveElement.children('p').height()) / 2 + 5);
    }

}

$(window).resize(function () {
    reCss();
});

function share() {
    $('#share-1').share({sites: ['qzone', 'qq', 'weibo', 'wechat']});
    $('#share-0').hidden();
    $('#share-1').show();
}

function unshare() {
    $('#share-0').hidden();
    $('#share-1').show();
}

// Contact Form Scripts

$(function () {
    reCss();

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var givenName = $("input#given_name").val();
            var familyName = $("input#family_name").val();
            var birth = $("input#birth").val();
            var gender = $(":radio[name=gender]:checked").val();

            $.ajax({
                url: "http://127.0.0.1:8092/v1/name/chinese",
                type: "GET",
                data: {
                    givenName: givenName,
                    familyName: familyName,
                    gender: gender,
                    birth: birth
                },
                dataType: 'json',
                cache: false,
                success: function (data) {
                    // console.log(data);
                    if (data.returnCode === 0) {
                        $('#name-family-zh').html(data.body.surname);
                        $('#name-family-py').html(data.body.surnamePy);
                        $('#name-family-mean').html(familyName + " and " + data.body.surnamePy + " are both start with "
                            + familyName.substr(0, 1) + ".");
                        $('#name-middle-zh').html(data.body.middleName);
                        $('#name-middle-py').html(data.body.middleNamePy);
                        $('#name-middle-mean').html(data.body.middleNamePy + " means " + data.body.middleMeans + ".");
                        $('#name-last-zh').html(data.body.lastName);
                        $('#name-last-py').html(data.body.lastNamePy);
                        $('#name-last-mean').html(data.body.lastNamePy + " means " + data.body.lastMeans + ".");
                        $('#name-zodiac-animal').attr('src', 'http://cdn.wustlz.com/images/zodiac/' + data.body.zodiacName + '.png')
                        $('#name-zodiac-mean').html('<span>Your zodiac animal is ' + data.body.zodiacName + '</span><br />'
                            + data.body.zodiacMean);
                        reCss();
                    } else {
                        error_html(data.returnMsg);
                    }
                },
                error: function () {
                    error_message = "Sorry, it seems that my server is not responding. Please try again later!";
                    error_html(error_message);
                },
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#given_name').focus(function () {
    $('#success').html('');
});

function error_html(data) {
    // Fail message
    $('#success').html("<div class='alert alert-danger'>");
    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
    $('#success > .alert-danger').append("<strong>").append(data).append("</strong>");
    $('#success > .alert-danger').append('</div>');
    //clear all fields
    $('#contactForm').trigger("reset");
}
