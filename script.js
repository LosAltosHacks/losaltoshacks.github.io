$(document).ready(function(){$("#show-arrow").click(function () {
    $("html, body").animate({scrollTop: $("#ap-stats").offset().top}, 800);
});


var spinner = new Spinner($(".spinner"));
var $email = $(".email");
var $submit = $(".submit");

$email.on("change paste keyup", function() {
    $email.removeClass("faded");
});

$email.keypress(function (e) {
    if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
        $submit.click();
    }
});

$submit.click(function (e) {
    var email = $email.val();

    spinner.start(function (finish) {
        $.ajax({
            type: "POST",
            url: "http://api.losaltoshacks.com/subscribe",
            data: JSON.stringify({ email: email }),
            contentType: "application/json",
            success: function() {
                finish(true);
                $email.addClass("faded");
                $email.attr("disabled", true);
                $submit.attr("disabled", true);
            },
            error: function() {
                finish(false);
            }
        })
    })
});
function Spinner($_spinner) {
    var self = this;

    self.$spinner = $_spinner;
    self.$checkmark = self.$spinner.find(".checkmark");
    self.$circle = self.$spinner.find(".circle");
    self.$cross = self.$spinner.find(".cross");

    self.start = function(finishNotifier) {
        self.unhide();
        self.uncheck();
        self.uncross();
        self.startSpinning();
        finishNotifier(function (didSucceed) {
            self.stopSpinning();
            if (didSucceed) {
                self.check();
            } else {
                self.cross();
            }
        });
    }

    function deactivate($elem) {
        $elem.removeClass("active");
        $elem.addClass("inactive");
    }

    function activate($elem) {
        $elem.removeClass("inactive");
        $elem.addClass("active");
    }

    self.startSpinning = function () {
        activate(self.$circle);
    }
    self.stopSpinning = function () {
        deactivate(self.$circle);
    }

    self.check = function () {
        activate(self.$checkmark);
    }
    self.uncheck = function () {
        deactivate(self.$checkmark);
    }

    self.cross = function () {
        activate(self.$cross);
    }
    self.uncross = function () {
        deactivate(self.$cross);
    }

    self.hide = function () {
        self.$spinner.addClass("hidden");
    }
    self.unhide = function () {
        self.$spinner.removeClass("hidden");
    }
}
});