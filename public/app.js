const btnMensajes = document.getElementById("btnMensajes")
const btnCalendario = document.getElementById("btnCalendario")

const contenedorMensajes = document.getElementById("contenedorMensajes")
const contenedorCalendario = document.getElementById("contenedorCalendario")

btnMensajes.addEventListener("click", () => {
  cargarMensajes()
})

btnCalendario.addEventListener("click", () => {
  cargarCalendario()
})

async function cargarMensajes() {
  try {
    const respuesta = await fetch("/api/mensajes")
    const mensajes = await respuesta.json()

    contenedorMensajes.innerHTML = ""

    mensajes.forEach((mensaje, indice) => {
      const tarjeta = document.createElement("article")
      tarjeta.classList.add("tarjeta-mensaje")
      tarjeta.style.animationDelay = `${indice * 0.1}s`

      tarjeta.innerHTML = `
        <h3>${mensaje.titulo}</h3>
        <p>${mensaje.mensaje}</p>

        <div class="tarjeta-etiquetas" aria-label="Metadatos del mensaje">
          <span class="etiqueta">Categoría: ${mensaje.categoria}</span>
          <span class="etiqueta">Audiencia: ${mensaje.audiencia}</span>
          <span class="etiqueta">Tono: ${mensaje.tono}</span>
        </div>

        <p><strong>Llamado a la acción:</strong> ${mensaje.llamadoAccion}</p>
        <p class="texto-secundario"><strong>Fuente:</strong> ${mensaje.fuente}</p>
      `

      contenedorMensajes.appendChild(tarjeta)
    })
  } catch (error) {
    contenedorMensajes.innerHTML =
      '<p class="tablero-placeholder">No fue posible cargar los mensajes. Revisa que el servidor esté funcionando.</p>'
  }
}

async function cargarCalendario() {
  try {
    const respuesta = await fetch("/api/calendario")
    const calendario = await respuesta.json()

    contenedorCalendario.innerHTML = ""

    calendario.forEach((pieza, indice) => {
      const tarjeta = document.createElement("article")
      tarjeta.classList.add("tarjeta-mensaje")
      tarjeta.style.animationDelay = `${indice * 0.1}s`

      tarjeta.innerHTML = `
        <h3>Semana ${pieza.semana} - ${pieza.dia}</h3>
        <p><strong>Tema:</strong> ${pieza.tema}</p>
        <p><strong>Pieza:</strong> ${pieza.pieza}</p>
        <p><strong>Canal:</strong> ${pieza.canal}</p>
        <p><strong>Público objetivo:</strong> ${pieza.publicoObjetivo}</p>
        <p><strong>Propósito:</strong> ${pieza.proposito}</p>
        <p><strong>Llamado a la acción:</strong> ${pieza.llamadoAccion}</p>
        <p class="texto-secundario"><strong>Fuente:</strong> ${pieza.fuente}</p>
      `

      contenedorCalendario.appendChild(tarjeta)
    })
  } catch (error) {
    contenedorCalendario.innerHTML =
      '<p class="tablero-placeholder">No fue posible cargar el calendario editorial. Revisa que el servidor esté funcionando.</p>'
  }
}
