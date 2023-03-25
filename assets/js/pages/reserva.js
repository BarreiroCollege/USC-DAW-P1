$(document).ready(function () {
    const airportsDatalist = $("#aeropuertos-origen");
    const airportsDestinoDatalist = $("#aeropuertos-destino");
    let airports = undefined;
    let routes = undefined;
    fetch("/data/airports.json")
        .then(d => d.text())
        .then(d => {
            const data = JSON.parse(d);
            airportsDatalist.append(data.airports.map(airport => {
                const option = document.createElement("option");
                option.value = airport;
                return option;
            }));
            airports = data.airports;
            routes = data.routes;
        })
        .finally(() => {
            for (const origin in routes) {
                routes[origin].forEach(destination => {
                    if (!(destination in routes)) {
                        routes[destination] = [];
                    }
                    routes[destination].push(origin);
                });
            }
        });

    const inputOrigen = $("#origin-input");
    const inputDestino = $("#destination-input");
    const radioTipoVuelo = $('input[type=radio][name=tipo-billete]');
    const divFechaIda = $("#div-fecha-ida");
    const divFechaVuelta = $("#div-fecha-vuelta");
    const inputFechaIda = $("#input-fecha-ida");
    const inputFechaVuelta1 = $("#input-fecha-vuelta-1");
    const inputFechaVuelta2 = $("#input-fecha-vuelta-2");

    const RADIO_TIPOVUELO_IDA = "ida";
    const RADIO_TIPOVUELO_VUELTA = "vuelta";

    radioTipoVuelo.on('change', e => {
        if (e.target.value === RADIO_TIPOVUELO_IDA) {
            divFechaIda.removeClass('d-none');
            divFechaVuelta.addClass('d-none');
        } else if (e.target.value === RADIO_TIPOVUELO_VUELTA) {
            divFechaIda.addClass('d-none');
            divFechaVuelta.removeClass('d-none');
        }
    });

    const SESSIONSTORAGE_DATOSVUELO_KEY = "PA_DATOSVUELO";
    const possibleFlight = sessionStorage.getItem(SESSIONSTORAGE_DATOSVUELO_KEY);
    if (possibleFlight !== null) {
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
        sessionStorage.removeItem(SESSIONSTORAGE_DATOSVUELO_KEY);
    }

    inputOrigen.on('change', e => {
        inputOrigen.removeClass("is-invalid");
        airportsDestinoDatalist.empty();
        if (e.target.value in routes) {
            airportsDestinoDatalist.append(routes[e.target.value].map(airport => {
                const option = document.createElement("option");
                option.value = airport;
                return option;
            }));
        }
    });
    inputDestino.on('change', () => {
        inputDestino.removeClass("is-invalid");
    });
    inputFechaIda.on('change', () => {
        inputFechaIda.removeClass("is-invalid");
    });
    inputFechaVuelta1.on('change', () => {
        inputFechaVuelta1.removeClass("is-invalid");
    });
    inputFechaVuelta2.on('change', () => {
        inputFechaVuelta2.removeClass("is-invalid");
    });

    $("#btn_continuar").on('click', () => {
        const radioTipoVueloChecked = $('input:checked[type=radio][name=tipo-billete]');
        if (inputOrigen.val() === ""
            || !airports.includes(inputOrigen.val())) {
            inputOrigen.addClass("is-invalid");
        } else if (inputDestino.val() === ""
            || !airports.includes(inputDestino.val())
            || !(routes[inputOrigen.val()].includes(inputDestino.val()))) {
            inputDestino.addClass("is-invalid");
        } else if (radioTipoVueloChecked.val() === RADIO_TIPOVUELO_IDA && inputFechaIda.val() === "") {
            inputFechaIda.addClass("is-invalid");
        } else if (radioTipoVueloChecked.val() === RADIO_TIPOVUELO_VUELTA && inputFechaVuelta1.val() === "") {
            inputFechaVuelta1.addClass("is-invalid");
        } else if (radioTipoVueloChecked.val() === RADIO_TIPOVUELO_VUELTA && inputFechaVuelta2.val() === "") {
            inputFechaVuelta2.addClass("is-invalid");
        }
    });
});
