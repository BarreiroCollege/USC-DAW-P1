$(document).ready(() => {
    window.registrarSelector()
        .then(() => console.log("Selector Activado"));

    $("#btn_buscar").on('click', () => {
        window.obtenerValor()
            .then(v => {
                const SESSIONSTORAGE_DATOSVUELO_KEY = "PA_DATOSVUELO";
                sessionStorage.setItem(SESSIONSTORAGE_DATOSVUELO_KEY, JSON.stringify(v));
                window.location.href = "reserva.html";
            });
    });
});
