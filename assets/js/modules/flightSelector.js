const RADIO_TIPOVUELO_IDA = "ida";
const RADIO_TIPOVUELO_VUELTA = "vuelta";


let airports = undefined;
let routes = undefined;


const obtenerAeropuertosYRutas = async () => {
    if (airports === undefined) {
        const d = await fetch("data/airports.json")
        const data = await d.json();

        airports = data.airports;
        routes = data.routes;

        for (const origin in routes) {
            routes[origin].forEach(destination => {
                if (!(destination in routes)) {
                    routes[destination] = [];
                }
                routes[destination].push(origin);
            });
        }
    }

    return {airports, routes};
};

const registrarSelector = async () => {
    const airportsDatalist = $("#aeropuertos-origen");
    const airportsDestinoDatalist = $("#aeropuertos-destino");
    const inputOrigen = $("#origin-input");
    const inputDestino = $("#destination-input");
    const radioTipoVuelo = $('input[type=radio][name=tipo-billete]');
    const divFechaIda = $("#div-fecha-ida");
    const divFechaVuelta = $("#div-fecha-vuelta");
    const inputFechaIda = $("#input-fecha-ida");
    const inputFechaVuelta1 = $("#input-fecha-vuelta-1");
    const inputFechaVuelta2 = $("#input-fecha-vuelta-2");

    radioTipoVuelo.on('change', e => {
        if (e.target.value === RADIO_TIPOVUELO_IDA) {
            divFechaIda.removeClass('d-none');
            divFechaVuelta.addClass('d-none');
        } else if (e.target.value === RADIO_TIPOVUELO_VUELTA) {
            divFechaIda.addClass('d-none');
            divFechaVuelta.removeClass('d-none');
        }
    });

    inputFechaVuelta1.on('change', e => {
        inputFechaVuelta2.attr('min', e.target.value);
    });
    inputFechaVuelta2.on('change', e => {
        inputFechaVuelta1.attr('max', e.target.value);
    });

    const {airports, routes} = await obtenerAeropuertosYRutas();

    airportsDatalist.append(airports.map(airport => {
        const option = document.createElement("option");
        option.value = airport;
        return option;
    }));

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
};

const obtenerValor = () => {
    const inputOrigen = $("#origin-input");
    const inputDestino = $("#destination-input");
    const inputFechaIda = $("#input-fecha-ida");
    const inputFechaVuelta1 = $("#input-fecha-vuelta-1");
    const inputFechaVuelta2 = $("#input-fecha-vuelta-2");

    return new Promise((resolve, reject) => {
        const radioTipoVueloChecked = $('input:checked[type=radio][name=tipo-billete]');

        if (inputOrigen.val() === ""
            || !airports.includes(inputOrigen.val())) {
            inputOrigen.addClass("is-invalid");
            reject();
        } else if (inputDestino.val() === ""
            || !airports.includes(inputDestino.val())
            || !(routes[inputOrigen.val()].includes(inputDestino.val()))) {
            inputDestino.addClass("is-invalid");
            reject();
        } else if (radioTipoVueloChecked.val() === RADIO_TIPOVUELO_IDA && inputFechaIda.val() === "") {
            inputFechaIda.addClass("is-invalid");
            reject();
        } else if (radioTipoVueloChecked.val() === RADIO_TIPOVUELO_VUELTA && inputFechaVuelta1.val() === "") {
            inputFechaVuelta1.addClass("is-invalid");
            reject();
        } else if (radioTipoVueloChecked.val() === RADIO_TIPOVUELO_VUELTA && inputFechaVuelta2.val() === "") {
            inputFechaVuelta2.addClass("is-invalid");
            reject();
        } else {
            resolve({
                origen: inputOrigen.val(),
                destino: inputDestino.val(),
                fechas: radioTipoVueloChecked.val() === RADIO_TIPOVUELO_IDA
                    ? [inputFechaIda.val()]
                    : [inputFechaVuelta1.val(), inputFechaVuelta2.val()],
            });
        }
    });
};

window.registrarSelector = registrarSelector;
window.obtenerValor = obtenerValor;
