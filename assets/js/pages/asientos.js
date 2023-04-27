$(document).ready(() => {
    const SESSIONSTORAGE_DATOSVUELO_KEY = "PA_DATOSVUELO";
    const SESSIONSTORAGE_DATOSPASAJEROS_KEY = "PA_DATOSPASAJEROS";
    const SESSIONSTORAGE_DATOSPAQUETE_KEY = "PA_DATOSPAQUETE";
    const SESSIONSTORAGE_DATOSASIENTOS_KEY = "PA_DATOSASIENTOS";
    const posiblesDatos = sessionStorage.getItem(SESSIONSTORAGE_DATOSVUELO_KEY);
    const posiblesPasajeros = sessionStorage.getItem(SESSIONSTORAGE_DATOSPASAJEROS_KEY);
    if (sessionStorage.getItem(SESSIONSTORAGE_DATOSPAQUETE_KEY) === null) {
        window.location.replace("datos.html");
    }
    const datosVuelo = JSON.parse(posiblesDatos);
    const datosPasajeros = JSON.parse(posiblesPasajeros);

    const asientos = [];
    $(".asiento input[type=checkbox]").on('change', e => {
        if (e.target.checked) {
            const pasajeroIndex = asientos.indexOf(undefined);
            if (pasajeroIndex === -1) {
                e.target.checked = false;
            } else {
                asientos[pasajeroIndex] = e.target.id;
                $(`#pasajero-${pasajeroIndex}`).removeClass("text-danger").text(e.target.id);
            }
        } else {
            const pasajeroIndex = asientos.indexOf(e.target.id);
            asientos[pasajeroIndex] = undefined;
            $(`#pasajero-${pasajeroIndex}`).text("?");
        }
    });

    $("#table_body").html(datosPasajeros.map((pasajero, i) => {
        const tr = document.createElement("tr");

        const nombre = document.createElement("th");
        nombre.setAttribute("scope", "row");
        nombre.innerText = pasajero.nombre + " " + pasajero.apellidos;

        const asiento = document.createElement("td");
        asiento.id = `pasajero-${i}`;
        asiento.innerText = "?";

        tr.append(nombre, asiento);
        asientos.push(undefined);
        return tr;
    }));

    $("#btn_continuar").on('click', () => {
        const pasajeroIndex = asientos.indexOf(undefined);
        if (pasajeroIndex === -1) {
            sessionStorage.setItem(SESSIONSTORAGE_DATOSASIENTOS_KEY, JSON.stringify(asientos));
            window.location.href = "extras.html";
        } else {
            $(`#pasajero-${pasajeroIndex}`).addClass("text-danger");
        }
    });

    if (sessionStorage.getItem(SESSIONSTORAGE_DATOSASIENTOS_KEY) !== null) {
        const datos = JSON.parse(sessionStorage.getItem(SESSIONSTORAGE_DATOSASIENTOS_KEY));
        datos.forEach((asiento, i) => {
            $(`#${asiento}`).prop('checked', true);
            $(`#pasajero-${i}`).text(asiento);
            asientos[i] = asiento;
        });
    }

    $("#texto_titulo").text(`Reserva tu vuelo a ${datosVuelo.destino} con PilgrimAir`);
});
