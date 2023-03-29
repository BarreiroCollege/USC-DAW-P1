$(document).ready(() => {
    const LOCALSTORAGE_SESSION_KEY = "PA_TOKEN";
    if (localStorage.getItem(LOCALSTORAGE_SESSION_KEY) !== null) {
        window.location.replace("/mis_reservas.html");
    }

    const modalRegistro = new bootstrap.Modal(document.getElementById('modal-registro'));
    if (location.search.substr(1) === "registro") {
        modalRegistro.show();
    }

    $("#btn-registro").on('click', () => {
        modalRegistro.show();
    });

    $("#form-entrar").on('submit', e => {
        e.preventDefault();

        localStorage.setItem(LOCALSTORAGE_SESSION_KEY, "1");
        window.location.href = "/mis_reservas.html";
    });
});
