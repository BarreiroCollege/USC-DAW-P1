$(document).ready(function () {
    window.registrarSelector()
        .then(() => console.log("Selector Activado"));

    $("#btn_continuar").on('click', () => {
        window.obtenerValor()
            .then(v => {
                console.log("S", v);
            });
    });
});
