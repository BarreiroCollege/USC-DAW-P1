$(document).ready(() => {
    const SESSIONSTORAGE_DATOSVUELO_KEY = "PA_DATOSVUELO";
    const SESSIONSTORAGE_DATOSASIENTOS_KEY = "PA_DATOSASIENTOS";
    const SESSIONSTORAGE_DATOSEXTRAS_KEY = "PA_DATOSEXTRAS";
    const posiblesDatos = sessionStorage.getItem(SESSIONSTORAGE_DATOSVUELO_KEY);
    if (sessionStorage.getItem(SESSIONSTORAGE_DATOSASIENTOS_KEY) === null) {
        window.location.replace("/datos.html");
    }
    const datosVuelo = JSON.parse(posiblesDatos);

    $("#btn-equipaje-menos").on('click', () => {
        const equipaje = $("#input-equipaje");
        const maletas = parseInt(equipaje.val());
        equipaje.val("" + Math.max(0, maletas - 1));
    });

    $("#btn-equipaje-mas").on('click', () => {
        const equipaje = $("#input-equipaje");
        const maletas = parseInt(equipaje.val());
        equipaje.val("" + Math.min(10, maletas + 1));
    });

    $("#btn_continuar").on('click', () => {
        const maletas = parseInt($("#input-equipaje").val());
        const vip = $("#input-vip").prop('checked');
        const fastTrack = $("#input-fast-track").prop('checked');

        sessionStorage.setItem(SESSIONSTORAGE_DATOSEXTRAS_KEY, JSON.stringify({
            maletas,
            vip,
            fastTrack,
        }));
        window.location.href = "/pago.html";
    });

    if (sessionStorage.getItem(SESSIONSTORAGE_DATOSEXTRAS_KEY) !== null) {
        const datos = JSON.parse(sessionStorage.getItem(SESSIONSTORAGE_DATOSEXTRAS_KEY));
        $("#input-equipaje").val("" + datos.maletas);
        $("#input-vip").prop('checked', datos.vip);
        $("#input-fast-track").prop('checked', datos.fastTrack);
    }

    $("#texto_titulo").text(`Completa tu vuelo a ${datosVuelo.destino} con PilgrimAir`);
});
