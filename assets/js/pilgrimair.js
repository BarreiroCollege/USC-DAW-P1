$(() => {
    let prevTopBreakpoint = 0;

    $(window).on('scroll', () => {
        const width = $(window).width();

        const topBreakpoint = width < 576
            ? 198
            : width < 768
                ? 174
                : width < 992
                    ? 158
                    : 150;

        const offsetToTop = $(window).scrollTop();
        const targetClasses = ["custom-header", "custom-navbar"];

        if (offsetToTop >= topBreakpoint && offsetToTop > prevTopBreakpoint) {
            targetClasses
                .forEach(targetClass =>
                    $(`.${targetClass}`).addClass("custom-header-hidden"));
        } else {
            targetClasses
                .forEach(targetClass =>
                    $(`.${targetClass}`).removeClass("custom-header-hidden"));
        }

        prevTopBreakpoint = offsetToTop;
    });

    $(document).ready(() => {
        const LOCALSTORAGE_SESSION_KEY = "PA_TOKEN";
        if (localStorage.getItem(LOCALSTORAGE_SESSION_KEY) !== null) {
            $("#nav_acceso").addClass("d-none");
        } else {
            $("#nav_reservas").addClass("d-none");
        }

        let emailPopover = undefined;
        $("#btn_newsletter").on('click', () => {
            const input = $("#txt_newsletter_email");
            const email = input.val();

            if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                if (!emailPopover) {
                    emailPopover = new bootstrap.Popover(input, {
                        boundary: document.body,
                        title: 'Introduce un email válido',
                        placement: 'top',
                    });
                }
                emailPopover.show();
                setTimeout(() => emailPopover.hide(), 3000);
                input.addClass('is-invalid');
            } else {
                window.alert("Suscrito!");
                input.removeClass('is-invalid');
            }
        });
    });
});
