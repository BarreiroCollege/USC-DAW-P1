$(document).ready(() => {
    window.registrarSelector()
        .then(() => console.log("Selector Activado"));

    const SESSIONSTORAGE_DATOSVUELO_KEY = "PA_DATOSVUELO";
    const possibleFlight = sessionStorage.getItem(SESSIONSTORAGE_DATOSVUELO_KEY);
    if (possibleFlight !== null) {
        const inputOrigen = $("#origin-input");
        const inputDestino = $("#destination-input");
        const inputFechaIda = $("#input-fecha-ida");
        const inputFechaVuelta1 = $("#input-fecha-vuelta-1");
        const inputFechaVuelta2 = $("#input-fecha-vuelta-2");

        const data = JSON.parse(possibleFlight);
        inputOrigen.val(data.origen);
        inputDestino.val(data.destino);
        if (data.fechas.length === 1) {
            inputFechaIda.val(data.fechas[0]);
        } else {
            $("#radio-vuelta").click();
            inputFechaVuelta1.val(data.fechas[0]);
            inputFechaVuelta2.val(data.fechas[1]);
        }
    }

    $("#btn_continuar").on('click', () => {
        window.obtenerValor()
            .then(v => {
                sessionStorage.setItem(SESSIONSTORAGE_DATOSVUELO_KEY, JSON.stringify(v));
                window.location.href = "datos.html";
            });
    });
});
