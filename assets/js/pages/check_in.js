$(document).ready(() => {
    const LOCALSTORAGE_SESSION_KEY = "PA_TOKEN";
    if (localStorage.getItem(LOCALSTORAGE_SESSION_KEY) !== null) {
        $("#div-entrar").addClass("d-none");
    } else {
        $("#div-tus-vuelos").addClass("d-none");
    }
});
