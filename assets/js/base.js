let prevTopBreakpoint = 0;

$(window).scroll(function () {
    const width = $(window).width();

    const topBreakpoint = width < 576
        ? 198
        : width < 768
            ? 174
            : width < 992
                ? 158
                : 150;

    const offsetToTop = $(window).scrollTop();
    if (offsetToTop >= topBreakpoint && offsetToTop > prevTopBreakpoint) {
        $(".custom-header").addClass("custom-header-hidden");
        $(".custom-navbar").addClass("custom-header-hidden");
    } else {
        $(".custom-header").removeClass("custom-header-hidden");
        $(".custom-navbar").removeClass("custom-header-hidden");
    }

    prevTopBreakpoint = offsetToTop;
});
