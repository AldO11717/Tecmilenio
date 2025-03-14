document.getElementById('formularioTareas').addEventListener('submit', function(event) {
    event.preventDefault();

    const codigoTarea = document.getElementById('codigoTarea').value;
    const tituloTarea = document.getElementById('tituloTarea').value;
    const descripcionTarea = document.getElementById('descripcionTarea').value;
    const fechaTarea = document.getElementById('fechaTarea').value;
    const nombreCliente = document.getElementById('nombreCliente').value;
    const idProyecto = document.getElementById('idProyecto').value;
    const comentarios = document.getElementById('comentarios').value;

    const taskTable = document.getElementById('tablaTareas').getElementsByTagName('tbody')[0];
    const newRow = taskTable.insertRow();

    newRow.innerHTML = `
        <td>${codigoTarea}</td>
        <td>${tituloTarea}</td>
        <td>${descripcionTarea}</td>
        <td>${fechaTarea}</td>
        <td>${nombreCliente}</td>
        <td>${idProyecto}</td>
        <td data-comments="${comentarios}">${comentarios}</td>
        <td>Pendiente</td>
    `;

    newRow.addEventListener('dblclick', () => {
        document.getElementById('idTarea').textContent = codigoTarea;
        document.getElementById('tareaTitulo').textContent = tituloTarea;
        document.getElementById('estatusTarea').value = newRow.cells[7].textContent;
        document.getElementById('comentariosTarea').value = newRow.cells[6].getAttribute('data-comments');
    });

    document.getElementById('formularioTareas').reset();
});

document.getElementById('actualizarTarea').addEventListener('click', () => {
    const idTarea = document.getElementById('idTarea').textContent;
    const estatusTarea = document.getElementById('estatusTarea').value;
    const nuevoComentario = document.getElementById('comentariosTarea').value.trim();
    const fecha = new Date().toLocaleString();

    if (idTarea) {
        const tablaTarea = document.getElementById('tablaTareas').getElementsByTagName('tbody')[0];
        for (const row of tablaTarea.rows) {
            if (row.cells[0].textContent === idTarea) {
                row.cells[7].textContent = estatusTarea;

                const comentariosAnt = row.cells[6].getAttribute('data-comments');
                const comentariosAct = `${comentariosAnt}\n${fecha}: ${nuevoComentario}`;
                row.cells[6].setAttribute('data-comments', comentariosAct);
                row.cells[6].textContent = comentariosAct;
                break;
            }
        }
        alert('Tarea actualizada correctamente');
    } else {
        alert('Selecciona una tarea para actualizar.');
    }
});

document.getElementById('aplicarFiltro').addEventListener('click', () => {
    const filtroEstatus = document.getElementById('filtroEstatus').value;
    const tablaTarea = document.getElementById('tablaTareas').getElementsByTagName('tbody')[0];

    for (const row of tablaTarea.rows) {
        const estatusTarea = row.cells[7].textContent;
        if (filtroEstatus === 'Todos' || estatusTarea === filtroEstatus) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
});
