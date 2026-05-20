const btnMensajes = document.getElementById("btnMensajes")
const btnCalendario = document.getElementById("btnCalendario")
const btnResumen = document.getElementById("btnResumen")
const btnLogin = document.getElementById("btnLogin")

const contenedorMensajes = document.getElementById("contenedorMensajes")
const contenedorCalendario = document.getElementById("contenedorCalendario")
const contenedorResumen = document.getElementById("contenedorResumen")
const mensajeLogin = document.getElementById("mensajeLogin")

const usuario = document.getElementById("usuario")
const clave = document.getElementById("clave")

btnMensajes.addEventListener("click", () => {
  cargarMensajes()
})

btnCalendario.addEventListener("click", () => {
  cargarCalendario()
})

btnResumen.addEventListener("click", () => {
  cargarResumen()
})

btnLogin.addEventListener("click", () => {
  hacerLogin()
})

usuario.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    hacerLogin()
  }
})

clave.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    hacerLogin()
  }
})

function mostrarMensajeLogin(texto, tipo) {
  mensajeLogin.textContent = texto
  mensajeLogin.className = "login-mensaje"

  if (tipo) {
    mensajeLogin.classList.add(`login-mensaje--${tipo}`)
  } else {
    mensajeLogin.classList.add("login-mensaje--inicial")
  }
}

async function hacerLogin() {
  try {
    const datosLogin = {
      usuario: usuario.value.trim(),
      clave: clave.value
    }

    mostrarMensajeLogin("Verificando credenciales de demostración...", "aviso")

    const respuesta = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datosLogin)
    })

    const datos = await respuesta.json()

    if (respuesta.ok) {
      localStorage.setItem("tokenDemo", datos.token)
      localStorage.setItem("rolDemo", datos.rol)
      mostrarMensajeLogin(
        `${datos.mensaje} Rol asignado: ${datos.rol}.`,
        "exito"
      )
      return
    }

    mostrarMensajeLogin(datos.mensaje, "error")
  } catch (error) {
    mostrarMensajeLogin(
      "No fue posible realizar el login pedagógico. Revisa el servidor.",
      "error"
    )
  }
}

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
        <p class="texto-secundario"><strong>Revisión editorial:</strong> ${mensaje.revisionEditorial}</p>
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

async function cargarResumen() {
  try {
    const respuesta = await fetch("/api/resumen")
    const resumen = await respuesta.json()

    contenedorResumen.innerHTML = ""

    const tarjeta = document.createElement("article")
    tarjeta.classList.add("tarjeta-mensaje")

    tarjeta.innerHTML = `
      <h3>Resumen del proyecto</h3>
      <p>Total de mensajes: ${resumen.totalMensajes}</p>
      <p>Total de piezas del calendario: ${resumen.totalPiezasCalendario}</p>
      <p>Categorías encontradas: ${resumen.categoriasMensajes.join(", ")}</p>
      <p>${resumen.mensaje}</p>
    `

    contenedorResumen.appendChild(tarjeta)
  } catch (error) {
    contenedorResumen.textContent = "No fue posible cargar el resumen. Revisa que el servidor esté funcionando."
  }
}
