$(document).ready(function () {
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

    inputFechaVuelta1.on('change', e => {
        inputFechaVuelta2.attr('min', e.target.value);
    });
    inputFechaVuelta2.on('change', e => {
        inputFechaVuelta1.attr('max', e.target.value);
    });

    const airportsDatalist = $("#aeropuertos");
    fetch("/static/airports.json")
        .then(d => d.json())
        .then(d => {
            airportsDatalist.append(d.airports.map(airport => {
                const option = document.createElement("option");
                option.value = airport;
                return option;
            }));
        });

    $("#btn_buscar").on('click', () => {
        const radioTipoVueloChecked = $('input:checked[type=radio][name=tipo-billete]');
        if (inputOrigen.val() === "") {
            inputOrigen.addClass("is-invalid");
            inputDestino.removeClass("is-invalid");
            inputFechaIda.removeClass("is-invalid");
            inputFechaVuelta1.removeClass("is-invalid");
            inputFechaVuelta2.removeClass("is-invalid");
        } else if (inputDestino.val() === "") {
            inputOrigen.removeClass("is-invalid");
            inputDestino.addClass("is-invalid");
            inputFechaIda.removeClass("is-invalid");
            inputFechaVuelta1.removeClass("is-invalid");
            inputFechaVuelta2.removeClass("is-invalid");
        } else if (radioTipoVueloChecked.val() === RADIO_TIPOVUELO_IDA && inputFechaIda.val() === "") {
            inputOrigen.removeClass("is-invalid");
            inputDestino.removeClass("is-invalid");
            inputFechaIda.addClass("is-invalid");
            inputFechaVuelta1.removeClass("is-invalid");
            inputFechaVuelta2.removeClass("is-invalid");
        } else if (radioTipoVueloChecked.val() === RADIO_TIPOVUELO_VUELTA && inputFechaVuelta1.val() === "") {
            inputOrigen.removeClass("is-invalid");
            inputDestino.removeClass("is-invalid");
            inputFechaIda.removeClass("is-invalid");
            inputFechaVuelta1.addClass("is-invalid");
            inputFechaVuelta2.removeClass("is-invalid");
        } else if (radioTipoVueloChecked.val() === RADIO_TIPOVUELO_VUELTA && inputFechaVuelta2.val() === "") {
            inputOrigen.removeClass("is-invalid");
            inputDestino.removeClass("is-invalid");
            inputFechaIda.removeClass("is-invalid");
            inputFechaVuelta1.removeClass("is-invalid");
            inputFechaVuelta2.addClass("is-invalid");
        } else {
            const SESSIONSTORAGE_DATOSVUELO_KEY = "PA_DATOSVUELO";
            sessionStorage.setItem(SESSIONSTORAGE_DATOSVUELO_KEY, JSON.stringify({
                origen: inputOrigen.val(),
                destino: inputDestino.val(),
                fechas: radioTipoVueloChecked.val() === RADIO_TIPOVUELO_IDA
                    ? [inputFechaIda.val()]
                    : [inputFechaVuelta1.val(), inputFechaVuelta2.val()],
            }));

            window.location.href = "/reserva.html";
        }
    });
});
