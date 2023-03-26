$(document).ready(() => {
    const SESSIONSTORAGE_DATOSVUELO_KEY = "PA_DATOSVUELO";
    const SESSIONSTORAGE_DATOSPASAJEROS_KEY = "PA_DATOSPASAJEROS";
    const SESSIONSTORAGE_DATOSPAQUETE_KEY = "PA_DATOSPAQUETE";
    const posiblesDatos = sessionStorage.getItem(SESSIONSTORAGE_DATOSVUELO_KEY);
    if (sessionStorage.getItem(SESSIONSTORAGE_DATOSPASAJEROS_KEY) === null) {
        window.location.replace("/datos.html");
    }
    const datosVuelo = JSON.parse(posiblesDatos);

    $("#btn_basica").on('click', () => {
        sessionStorage.setItem(SESSIONSTORAGE_DATOSPAQUETE_KEY, "BASICA");
        window.location.href = "/asientos.html";
    });

    $("#btn_peregrina").on('click', () => {
        sessionStorage.setItem(SESSIONSTORAGE_DATOSPAQUETE_KEY, "PEREGRINA");
        window.location.href = "/asientos.html";
    });

    $("#btn_profesional").on('click', () => {
        sessionStorage.setItem(SESSIONSTORAGE_DATOSPAQUETE_KEY, "PROFESIONAL");
        window.location.href = "/asientos.html";
    });

    $("#texto_titulo").text(`Reserva tu vuelo a ${datosVuelo.destino} con PilgrimAir`);
});
