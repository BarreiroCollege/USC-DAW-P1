$(document).ready(() => {
    const LOCALSTORAGE_SESSION_KEY = "PA_TOKEN";
    if (localStorage.getItem(LOCALSTORAGE_SESSION_KEY) === null) {
        window.location.replace("/acceso.html");
    }
});
