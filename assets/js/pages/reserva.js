$(document).ready(function () {
    window.registrarSelector()
        .then(() => console.log("Selector Activado"));

    $("#btn_continuar").on('click', () => {
        window.obtenerValor()
            .then(v => {
                const SESSIONSTORAGE_DATOSVUELO_KEY = "PA_DATOSVUELO";
                sessionStorage.setItem(SESSIONSTORAGE_DATOSVUELO_KEY, JSON.stringify(v));
                window.location.href = "/datos.html";
            });
    });
});
