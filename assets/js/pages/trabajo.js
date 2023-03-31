$(document).ready(() => {
    let positions = [];
    const localizaciones = {
        "scq": "Santiago de Compostela",
        "lcg": "A Coruña",
        "bos": "Boston",
    }
    const categorias = [];

    const crearPosicion = (position) => {
        const titulo = position.getElementsByTagName("title")[0].textContent;
        const localizacion = position.getElementsByTagName("location")[0].textContent;
        const descripcion = position.getElementsByTagName("description")[0].textContent;

        return `<div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${titulo}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${localizaciones[localizacion]}</h6>
                <p class="card-text">${descripcion}</p>
                <div class="d-flex justify-content-end">
                    <a href="#" class="btn btn-primary">Aplicar Ahora</a>
                </div>
            </div>
        </div>`;
    };

    const actualizarPosiciones = () => {
        const rol = parseInt($("#rol").val());
        const ubicacion = $("#ubicacion").val();

        const div = $("#div-posiciones");
        div.empty();

        positions.forEach(position => {
            const categoria = position.getElementsByTagName("category")[0].textContent;
            const localizacion = position.getElementsByTagName("location")[0].textContent;

            if ((rol === -1 || categorias[rol] === categoria) && (ubicacion === "*" || ubicacion === localizacion)) {
                div.append(crearPosicion(position));
            }
        });
    };

    $("#rol").on('change', () => actualizarPosiciones());
    $("#ubicacion").on('change', () => actualizarPosiciones());

    const x = new XMLHttpRequest();
    x.open("GET", "/data/openings.xml", true);
    x.onreadystatechange = () => {
        if (x.readyState === 4 && x.status === 200) {
            [...x.responseXML.getElementsByTagName("position")].forEach(p => positions.push(p));
            [...x.responseXML.getElementsByTagName("category")].forEach(tag => {
                if (!categorias.includes(tag.textContent)) {
                    categorias.push(tag.textContent);
                }
            });

            categorias.forEach((categoria, i) => {
                $("#rol").append(`<option value="${i}">${categoria}</option>`);
            });

            for (const locationCode in localizaciones) {
                $("#ubicacion").append(`<option value="${locationCode}">${localizaciones[locationCode]}</option>`);
            }

            actualizarPosiciones();
        }
    };
    x.send(null);

});
