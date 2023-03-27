$(document).ready(() => {
    const SESSIONSTORAGE_DATOSVUELO_KEY = "PA_DATOSVUELO";
    const SESSIONSTORAGE_DATOSPASAJEROS_KEY = "PA_DATOSPASAJEROS";
    const SESSIONSTORAGE_DATOSPAQUETE_KEY = "PA_DATOSPAQUETE";
    const SESSIONSTORAGE_DATOSEXTRAS_KEY = "PA_DATOSEXTRAS";
    const posiblesDatos = sessionStorage.getItem(SESSIONSTORAGE_DATOSVUELO_KEY);
    if (sessionStorage.getItem(SESSIONSTORAGE_DATOSEXTRAS_KEY) === null) {
        window.location.replace("/datos.html");
    }
    const datosVuelo = JSON.parse(posiblesDatos);

    const stripe = Stripe('pk_test_51MSJIbLGsrBfxULlrd8pC0OvLpDqSgYNdZJHZVZ9DNLTCbYYcoAm2AcCJueeEsnqglX8hFOiL4NBCggkTO3VcwR300YaTxRVvN', {
        locale: 'es',
    });

    const calcularTotal = () => {
        const pasajeros = JSON.parse(sessionStorage.getItem(SESSIONSTORAGE_DATOSPASAJEROS_KEY)).length;

        const paquetes = {
            "BASICA": 50,
            "PEREGRINA": 100,
            "PROFESIONAL": 200,
        };
        const paquete = paquetes[sessionStorage.getItem(SESSIONSTORAGE_DATOSPAQUETE_KEY)];

        const extras = JSON.parse(sessionStorage.getItem(SESSIONSTORAGE_DATOSEXTRAS_KEY));
        const maletas = 30 * extras.maletas;
        const vip = pasajeros * (extras.vip ? 50 : 0);
        const fastTrack = pasajeros * (extras.fastTrack ? 10 : 0);

        return pasajeros * paquete + maletas + vip + fastTrack;
    };

    const elements = stripe.elements({
        appearance: {
            theme: 'stripe',
        },
        mode: 'payment',
        currency: 'eur',
        amount: calcularTotal() * 100,
    });

    const paymentElement = elements.create("payment", {
        layout: "tabs",
    });
    paymentElement.mount("#pago-stripe");

    $("#btn_continuar")
        .text(`Pagar ${calcularTotal()} €`)
        .on('click', async () => {
            try {
                await stripe.confirmPayment({
                    elements,
                    clientSecret: '...',
                    confirmParams: {
                        return_url: "http://localhost:4242/pago.html",
                    },
                });
            } catch (_) {
                window.alert("Si hubiese un servidor, se enviaría la petición y se redirigiría a la pasarela de pago del banco (de ser necesaria). Finalmente, se mostraría el billete correspondiente.");
            }
        });

    $("#texto_titulo").text(`Finaliza tu vuelo a ${datosVuelo.destino} con PilgrimAir`);
});
