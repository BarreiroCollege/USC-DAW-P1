$(document).ready(() => {
    const LOCALSTORAGE_SESSION_KEY = "PA_TOKEN";
    if (localStorage.getItem(LOCALSTORAGE_SESSION_KEY) !== null) {
        window.location.replace("mis_reservas.html");
    }

    const modalElement = document.getElementById('modal-registro');
    const modalRegistro = new bootstrap.Modal(modalElement);
    if (location.search.substr(1) === "registro") {
        modalRegistro.show();
    }

    const btnRegistro = document.getElementsByClassName('btn-action-submit')[0];
    btnRegistro.addEventListener('click', () => {
        modalRegistro.show();
    });

    const formEntrar = document.getElementsByTagName('form')[0];
    formEntrar.addEventListener('submit', e => {
        e.preventDefault();

        localStorage.setItem(LOCALSTORAGE_SESSION_KEY, "1");
        window.location.href = "mis_reservas.html";
    });
});
