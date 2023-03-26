$(document).ready(() => {
    const SESSIONSTORAGE_DATOSVUELO_KEY = "PA_DATOSVUELO";
    const SESSIONSTORAGE_DATOSPASAJEROS_KEY = "PA_DATOSPASAJEROS";
    const posiblesDatos = sessionStorage.getItem(SESSIONSTORAGE_DATOSVUELO_KEY);
    if (posiblesDatos === null) {
        window.location.replace("/reserva.html");
    }
    const datosVuelo = JSON.parse(posiblesDatos);

    const crearPasajero = (i, show) => {
        return '<div class="accordion-item">' +
            `<h2 class="accordion-header">` +
            `<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#colapsar${i}">` +
            `Pasajero ${i}` +
            '</button>' +
            '</h2>' +

            `<div id="colapsar${i}" class="accordion-collapse collapse${show ? " show" : ""}" data-bs-parent="#passengers">` +
            '<div class="accordion-body">' +

            '<div class="row">' +

            '<div class="form-group col-md-6">' +
            '<label for="nombre-' + i + '">Nombre:</label>' +
            '<input type="text" class="form-control" id="nombre-' + i + '" name="nombre-' + i + '">' +
            '</div>' +

            '<div class="form-group col-md-6">' +
            '<label for="apellidos-' + i + '">Apellidos:</label>' +
            '<input type="text" class="form-control" id="apellidos-' + i + '" name="apellidos-' + i + '">' +
            '</div>' +

            // Cierre row
            '</div>' +

            '<div class="form-group">' +
            '<label for="id-' + i + '">DNI / Pasaporte:</label>' +
            '<input type="text" class="form-control" id="id-' + i + '" name="id-' + i + '">' +
            '</div>' +

            // Cierre accordion-body
            '</div>' +

            // Cierre accordion-collapse
            '</div>' +

            // Cierre accordion-item
            '</div>';
    };

    $('#input-num-pasajeros').on('change', e => {
        const count = parseInt(e.target.value);
        const pasajeros = $('#pasajeros');
        const currentCount = pasajeros.children().length;

        if (count > currentCount) {
            for (let i = currentCount + 1; i <= count; i++) {
                pasajeros.append(crearPasajero(i));
            }
        } else if (count < currentCount) {
            for (let i = currentCount; i > count; i--) {
                pasajeros.children().last().remove();
            }
        }
    });

    const validarId = (value) => {
        const moduloCaracter = 'TRWAGMYFPDXBNJZSQVHLCKET';
        const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
        const nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
        const str = value.toString().toUpperCase();

        if (!nifRexp.test(str) && !nieRexp.test(str)) {
            return true;
        }

        const nie = str
            .replace(/^X/, '0')
            .replace(/^Y/, '1')
            .replace(/^Z/, '2');

        const letter = str.substr(-1);
        const charIndex = parseInt(nie.substr(0, 8)) % 23;

        return moduloCaracter.charAt(charIndex) === letter;
    }


    let pasajeros = [];
    $("#btn_continuar").on('click', () => {
        pasajeros = [];
        const numPasajeros = parseInt($('#input-num-pasajeros').val());

        for (let i = 1; i <= numPasajeros; i++) {
            const nombre = $(`#nombre-${i}`);
            const apellidos = $(`#apellidos-${i}`);
            const id = $(`#id-${i}`);

            let invalid = false;
            if (nombre.val() === "") {
                nombre.addClass("is-invalid");
                nombre.on('change', () => {
                    nombre.removeClass("is-invalid");
                    nombre.off("change");
                });
                invalid = true;
            } else if (apellidos.val() === "") {
                apellidos.addClass("is-invalid");
                apellidos.on('change', () => {
                    apellidos.removeClass("is-invalid");
                    apellidos.off("change");
                });
                invalid = true;
            } else if (id.val() === "" || !validarId(id.val())) {
                id.addClass("is-invalid");
                id.on('change', () => {
                    id.removeClass("is-invalid");
                    id.off("change");
                });
                invalid = true;
            }

            if (invalid) {
                $(".collapse.show").removeClass("show");
                $(`#colapsar${i}`).addClass("show");
                return;
            }

            pasajeros.push({nombre: nombre.val(), apellidos: apellidos.val(), id: id.val().toUpperCase()});
        }

        sessionStorage.setItem(SESSIONSTORAGE_DATOSPASAJEROS_KEY, JSON.stringify(pasajeros));
        window.location.href = "/paquete.html";
    });

    const possibleDatos = sessionStorage.getItem(SESSIONSTORAGE_DATOSPASAJEROS_KEY);
    if (possibleDatos !== null) {
        const datos = JSON.parse(possibleDatos);
        for (let i = 1; i <= datos.length; i++) {
            $('#pasajeros').html(crearPasajero(i, i === 1));

            const nombre = $(`#nombre-${i}`);
            const apellidos = $(`#apellidos-${i}`);
            const id = $(`#id-${i}`);
            nombre.val(datos[i - 1].nombre);
            apellidos.val(datos[i - 1].apellidos);
            id.val(datos[i - 1].id);
        }
    } else {
        $('#pasajeros').html(crearPasajero(1, true));
    }

    $("#texto_titulo").text(`Reserva tu vuelo a ${datosVuelo.destino} con PilgrimAir`);
});
